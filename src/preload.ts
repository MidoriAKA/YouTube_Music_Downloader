import { contextBridge, ipcRenderer } from "electron";
import { ISubmitDownload, TSettingsValues } from "./types/window.global";

contextBridge.exposeInMainWorld("electron", {
  pasteFromClipboard: () =>
    ipcRenderer.invoke("paste-from-clipboard"),

  submitDownload: (values: ISubmitDownload) =>
    ipcRenderer.invoke("submit-download", values),
  cancelDownload: () =>
    ipcRenderer.send("cancel-download"),

  selectDirectory: () =>
    ipcRenderer.invoke("select-directory"),
  submitAddCover: (path: string) => 
    ipcRenderer.invoke("submit-add-cover", path),

  onReceiveLog: (callback: (log: string) => void) => 
    ipcRenderer.on("receive-log", (event, log) => callback(log)),

  loadSettings: () =>
    ipcRenderer.invoke("load-settings"),
  saveSettings: (settingsValues: TSettingsValues) =>
    ipcRenderer.send("save-settings", settingsValues),

  loadDirectroy: () =>
    ipcRenderer.invoke("load-directory"),
  saveDirectory: (path: string) =>
    ipcRenderer.invoke("save-directory", path),

  ytdlpDownload: () => 
    ipcRenderer.invoke("yt-dlp-download", (event)),
  ytdlpSetPath: (path: string) =>
    ipcRenderer.invoke("yt-dlp-set-path", path),
});