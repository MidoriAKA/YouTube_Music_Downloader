export interface IElectronAPI {
  pasteFromClipboard: () => Promise<string>;
  submitDownload: (values: ISubmitDownload) => Promise<void>;
  cancelDownload: () => void;
  selectDirectory: () => Promise<TSelectDirectory>;
  submitAddCover: (path: string) => Promise<void>;
  onReceiveLog: (callback: (log: string) => void) => void;

  loadSettings: () => Promise<TSettingsValues>;
  saveSettings: (settingsValues: TSettingsValues) => void;
  loadDirectroy: () => Promise<string[]>;
  saveDirectory: (path: string) => Promise<void>;

  ytdlpDownload: () => Promise<void>;
  ytdlpSetPath: (path: string) => Promise<void>;
}
interface ISubmitDownload {
  url: string;
  saveDir: string;
}
type TSelectDirectory = [string, string[] | []];
type TLangType = "enUS" | "jaJP" | "ptBR";
type TAudioQuality = 128 | 192 | 256 | 320;
type TAudioFormat = "mp3" | "m4a" | "wav";
export type TSettingsValues = {
  settings: {
    [x: string]: any;
    isFirstTime: boolean;
    language: TLangType;
    isDarkMode: boolean;
    ytdlpPath: string;
    downloadOptions: {
      audioQuality: TAudioQuality;
      audioFormat: TAudioFormat;
    }
  }
}

declare global {
  interface Window {
    electron: IElectronAPI;
  }
}
