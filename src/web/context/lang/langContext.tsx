import { createContext, useContext, useState } from "react";
import enUsJson from "@web/lang/enUS.json";
import jaJPJson from "@web/lang/jaJP.json";
import ptBRJson from "@web/lang/ptBR.json";

interface ILangContext {
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
  text: typeof enUsJson;
}

interface ILangContextProvider {
  children: React.ReactNode;
}

const LangContext = createContext({} as ILangContext);
export const useLangContext = () => {
  return useContext(LangContext);
}

export const LangContextProvider: React.FC<ILangContextProvider> = ({ children }) => {
  const [lang, setLang] = useState<string>("enUS");

  const langJson = {
    enUS: enUsJson,
    jaJP: jaJPJson,
    ptBR: ptBRJson,
  }

  const text = lang === "enUS" ? langJson.enUS
    : lang === "jaJP" ? langJson.jaJP
      : lang === "ptBR" ? langJson.ptBR
        : langJson.enUS; // fallback to enUS
  return (
    <LangContext.Provider
      value={{
        lang,
        setLang,
        text
      }}>
      {children}
    </LangContext.Provider>
  );
}