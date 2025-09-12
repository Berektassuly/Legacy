use anchor_lang::prelude::*;
pub mod instructions;
pub mod state;

use instructions::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS"); // Заменится после `anchor build`

#[program]
pub mod sbt_program {
    use super::*;

    pub fn mint_sbt(ctx: Context<MintSbt>, uri: String) -> Result<()> {
        instructions::mint_sbt::handler(ctx, uri)
    }
}