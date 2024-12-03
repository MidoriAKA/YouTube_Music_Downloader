import { createContext, useContext, useEffect, useState } from "react";
import { langJson, TLangJsonType, TLangType } from "@web/lang";
import { TSettingsValues } from "@/types/window.global";

type TAudioQuality = 128 | 192 | 256 | 320;
type TAudioFormat = "mp3" | "m4a" | "wav";

interface ISettingsContext {
  isFirstTime: boolean | undefined;
  setIsFirstTime: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  isDarkmode: boolean;
  setIsDarkmode: React.Dispatch<React.SetStateAction<boolean>>;
  lang: TLangType;
  setLang: React.Dispatch<React.SetStateAction<TLangType>>;
  text: TLangJsonType;
  audioQuality: TAudioQuality
  setAudioQuality: React.Dispatch<React.SetStateAction<TAudioQuality>>;
  audioFormat: TAudioFormat;
  setAudioFormat: React.Dispatch<React.SetStateAction<TAudioFormat>>;
  handleSaveSettings: () => void;
}

interface ISettingsContextProvider {
  children: React.ReactNode;
}

const SettingsContext = createContext({} as ISettingsContext);
export const useSettingsContext = () => {
  return useContext(SettingsContext);
}

export const SettingsContextProvider: React.FC<ISettingsContextProvider> = ({ children }) => {

  useEffect(() => {
    const loadSettings = async () => {
      const loadedValues = await window.electron.loadSettings();
      setIsFirstTime(loadedValues.settings.isFirstTime);
      setLang(loadedValues.settings.language);
      setIsDarkmode(loadedValues.settings.isDarkMode);
      setYtdlpPath(loadedValues.settings.ytdlpPath);
      setAudioQuality(loadedValues.settings.downloadOptions.audioQuality);
      setAudioFormat(loadedValues.settings.downloadOptions.audioFormat);
      console.log(loadedValues);
    }
    loadSettings().then(() => setIsFirstLoad(false));
  }, []);

  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  const [isFirstTime, setIsFirstTime] = useState<boolean | undefined>(true);

  const [lang, setLang] = useState<TLangType>("enUS");
  const text = lang === "enUS" ? langJson.enUS
    : lang === "jaJP" ? langJson.jaJP
      : lang === "ptBR" ? langJson.ptBR
        : langJson.enUS; // fallback to enUS

  const [ytdlpPath, setYtdlpPath] = useState<string | undefined>("");

  const [isDarkmode, setIsDarkmode] = useState<boolean>(false);

  const [audioQuality, setAudioQuality] = useState<TAudioQuality>(320);
  const [audioFormat, setAudioFormat] = useState<TAudioFormat>("mp3");

  const handleSaveSettings = (isFirstLoad?: boolean) => {
    const toSave: TSettingsValues = {
      settings: {
        isFirstTime: false,
        language: lang,
        isDarkMode: isDarkmode,
        ytdlpPath: ytdlpPath || "",
        downloadOptions: {
          audioQuality: audioQuality,
          audioFormat: audioFormat
        }
      }
    }
    window.electron.saveSettings(toSave);
  }

  return (
    <SettingsContext.Provider
      value={{
        isFirstTime,
        setIsFirstTime,
        isDarkmode,
        setIsDarkmode,
        lang,
        setLang,
        text,
        audioQuality,
        setAudioQuality,
        audioFormat,
        setAudioFormat,
        handleSaveSettings
      }}>
      {children}
    </SettingsContext.Provider>
  );
}
