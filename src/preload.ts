import { contextBridge, ipcRenderer } from "electron";
import { ISubmitDownload } from "./types/window.global";

contextBridge.exposeInMainWorld("electron", {
  pasteFromClipboard: () =>
    ipcRenderer.invoke("paste-from-clipboard"),

  submitDownload: (values: ISubmitDownload) =>
    ipcRenderer.invoke("submit-download", values),

  selectDirectory: () =>
    ipcRenderer.invoke("select-directory"),
  submitAddCover: (path: string) => 
    ipcRenderer.invoke("submit-add-cover", path),

  onReceiveLog: (callback: (log: string) => void) => 
    ipcRenderer.on("receive-log", (event, log) => callback(log)),

  onLoadConfig: (callback: (configValues: any) => void) =>
    ipcRenderer.on("load-config", (event, configValues) => callback(configValues),
  ),
  setConfig: (configValues: any) =>
    ipcRenderer.send("set-config", configValues),
});