use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{self, Mint, MintTo, Token, TokenAccount, FreezeAccount, SetAuthority},
};
use spl_token::instruction::AuthorityType;
use crate::state::sbt_account::*;

#[derive(Accounts)]
#[instruction(uri: String)]
pub struct MintSbt<'info> {
    // 1. Эмитент SBT. Он платит за транзакцию и подписывает ее.
    #[account(mut)]
    pub issuer: Signer<'info>,

    /// CHECK: Адрес владельца, для которого создается SBT. Проверки не нужны.
    pub owner: AccountInfo<'info>,

    // 2. Наш кастомный аккаунт для хранения данных о SBT.
    // Мы его инициализируем как PDA (Program Derived Address), чтобы гарантировать,
    // что один эмитент может выпустить только один SBT для одного владельца.
    #[account(
        init,
        payer = issuer,
        space = SbtAccount::LEN,
        seeds = [b"sbt", issuer.key().as_ref(), owner.key().as_ref()],
        bump
    )]
    pub sbt_account: Account<'info, SbtAccount>,

    // 3. SPL Token Mint, который будет создан.
    // decimals = 0, так как это NFT.
    // authority = sbt_account: PDA будет контролировать минт.
    // freeze_authority = sbt_account: PDA будет контролировать заморозку.
    #[account(
        init,
        payer = issuer,
        mint::decimals = 0,
        mint::authority = sbt_account,
        mint::freeze_authority = sbt_account,
        seeds = [b"mint", sbt_account.key().as_ref()],
        bump
    )]
    pub mint: Account<'info, Mint>,

    // 4. Associated Token Account (ATA) для владельца.
    // Сюда будет отправлен 1 токен.
    #[account(
        init_if_needed,
        payer = issuer,
        associated_token::mint = mint,
        associated_token::authority = owner
    )]
    pub token_account: Account<'info, TokenAccount>,

    // 5. Системные программы, необходимые для создания аккаунтов.
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handler(ctx: Context<MintSbt>, uri: String) -> Result<()> {
    // Получаем bump для PDA нашего sbt_account
    let sbt_bump = *ctx.bumps.get("sbt_account").unwrap();
    let sbt_account_key = ctx.accounts.sbt_account.key();
    let issuer_key = ctx.accounts.issuer.key();
    let owner_key = ctx.accounts.owner.key();

    // Формируем "семена" (seeds) для подписи от имени PDA
    let sbt_signer_seeds: &[&[&[u8]]] = &[&[
        b"sbt",
        issuer_key.as_ref(),
        owner_key.as_ref(),
        &[sbt_bump],
    ]];

    // --- ШАГ 1: Заминтить 1 токен на кошелек владельца ---
    token::mint_to(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            MintTo {
                mint: ctx.accounts.mint.to_account_info(),
                to: ctx.accounts.token_account.to_account_info(),
                authority: ctx.accounts.sbt_account.to_account_info(),
            },
            sbt_signer_seeds,
        ),
        1, // Минтим ровно 1 токен
    )?;

    // --- ШАГ 2: Отозвать права на дальнейший минт ---
    // Это делает токен по-настоящему уникальным (NFT)
    token::set_authority(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            SetAuthority {
                current_authority: ctx.accounts.sbt_account.to_account_info(),
                account_or_mint: ctx.accounts.mint.to_account_info(),
            },
            sbt_signer_seeds,
        ),
        AuthorityType::MintTokens,
        None, // Передаем None, чтобы навсегда заблокировать минт
    )?;

    // --- ШАГ 3: Заморозить токен-аккаунт владельца ---
    // Это делает токен НЕПЕРЕДАВАЕМЫМ (Soul-Bound)
    token::freeze_account(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            FreezeAccount {
                account: ctx.accounts.token_account.to_account_info(),
                mint: ctx.accounts.mint.to_account_info(),
                authority: ctx.accounts.sbt_account.to_account_info(),
            },
            sbt_signer_seeds,
        ),
    )?;

    // --- ШАГ 4: Сохранить данные в наш sbt_account ---
    let sbt = &mut ctx.accounts.sbt_account;
    sbt.issuer = ctx.accounts.issuer.key();
    sbt.owner = ctx.accounts.owner.key();
    sbt.mint = ctx.accounts.mint.key();
    sbt.uri = uri;
    sbt.bump = sbt_bump;

    Ok(())
}