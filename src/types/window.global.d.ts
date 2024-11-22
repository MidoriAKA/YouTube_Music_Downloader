export interface IElectronAPI {
  pasteFromClipboard: () => Promise<string>;
  submitDownload: (values: ISubmitDownload) => Promise<void>;
  selectDirectory: () => Promise<TSelectDirectory>;
  submitAddCover: (path: string) => Promise<void>;
  onReceiveLog: (callback: (log: string) => void) => void;
}
interface ISubmitDownload {
  url: string;
  saveDir: string;
}
type TSelectDirectory = [string, string[] | []];

declare global {
  interface Window {
    electron: IElectronAPI;
  }
}
