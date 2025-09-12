use anchor_lang::prelude::*;

#[account]
pub struct SbtAccount {
    // Тот, кто выпустил SBT (эмитент)
    pub issuer: Pubkey,
    // Тот, кому принадлежит SBT (владелец)
    pub owner: Pubkey,
    // Адрес SPL Token mint'а, который представляет этот SBT
    pub mint: Pubkey,
    // Ссылка на метаданные (например, Arweave или IPFS JSON)
    pub uri: String,
    // Bump для PDA
    pub bump: u8,
}

impl SbtAccount {
    // Рассчитываем размер аккаунта, чтобы зарезервировать место в блокчейне
    pub const LEN: usize = 8 + // Дискриминатор Anchor
                           32 + // issuer pubkey
                           32 + // owner pubkey
                           32 + // mint pubkey
                           4 + 200 + // Максимальная длина URI (4 байта для длины + 200 символов)
                           1; // bump
}