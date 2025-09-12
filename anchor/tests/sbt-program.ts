import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SbtProgram } from "../target/types/sbt_program";
import { assert } from "chai";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";

describe("sbt-program", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.SbtProgram as Program<SbtProgram>;
  const issuer = provider.wallet as anchor.Wallet;
  const owner = anchor.web3.Keypair.generate(); // Генерируем новый кошелек для получателя

  // PDA для нашего кастомного аккаунта
  const [sbtAccountPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("sbt"), issuer.publicKey.toBuffer(), owner.publicKey.toBuffer()],
    program.programId
  );

  // PDA для mint-аккаунта
  const [mintPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("mint"), sbtAccountPda.toBuffer()],
    program.programId
  );

  it("Mints an SBT!", async () => {
    // Пополним баланс получателя для оплаты аренды
    await provider.connection.requestAirdrop(owner.publicKey, 1 * anchor.web3.LAMPORTS_PER_SOL);
    
    const metadataUri = "https://arweave.net/some_metadata_hash";

    // Вызываем нашу инструкцию
    const tx = await program.methods
      .mintSbt(metadataUri)
      .accounts({
        issuer: issuer.publicKey,
        owner: owner.publicKey,
        sbtAccount: sbtAccountPda,
        mint: mintPda,
        // ATA будет вычислен автоматически в инструкции, но можно передать явно
        // tokenAccount: getAssociatedTokenAddressSync(mintPda, owner.publicKey),
      })
      .rpc();

    console.log("Your transaction signature", tx);

    // Проверяем, что данные были записаны правильно
    const sbtAccountData = await program.account.sbtAccount.fetch(sbtAccountPda);
    assert.ok(sbtAccountData.issuer.equals(issuer.publicKey));
    assert.ok(sbtAccountData.owner.equals(owner.publicKey));
    assert.ok(sbtAccountData.mint.equals(mintPda));
    assert.strictEqual(sbtAccountData.uri, metadataUri);

    // Проверяем, что токен заморожен (является SBT)
    const ownerAta = getAssociatedTokenAddressSync(mintPda, owner.publicKey);
    const tokenAccountInfo = await provider.connection.getParsedAccountInfo(ownerAta);
    // @ts-ignore
    const tokenState = tokenAccountInfo.value.data.parsed.info.state;
    assert.strictEqual(tokenState, "frozen", "Token account should be frozen");

    // Проверяем, что права на минт отозваны
    const mintInfo = await provider.connection.getParsedAccountInfo(mintPda);
    // @ts-ignore
    const mintAuthority = mintInfo.value.data.parsed.info.mintAuthority;
    assert.isNull(mintAuthority, "Mint authority should be null");
  });
});