import enUS from "./enUS.json";
import jaJP from "./jaJP.json";
import ptBR from "./ptBR.json";

export const langJson = {
  enUS,
  jaJP,
  ptBR,
};

export type TLangType = keyof typeof langJson;
export type TLangJsonType = typeof langJson[TLangType];
