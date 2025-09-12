import idl from './sbt_program.json';

export type SbtProgram = typeof idl;

export const IDL: SbtProgram = idl as any;