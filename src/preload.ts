import { contextBridge, ContextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  pasteFromClipboard: async () => {
    return ipcRenderer.invoke("paste-from-clipboard");
  },
  submitDownload: async (values: ISubmitDownload) => {
    return ipcRenderer.invoke("submit-download", values);
  },
  selectDirectory: async () => {
    return ipcRenderer.invoke("select-directory");
  },
  submitAddCover: async (path: string) => {
    return ipcRenderer.invoke("submit-add-cover", path);
  },
  onReceiveLog: (callback: (log: string) => void) => {
    ipcRenderer.on("receive-log", (event, log) => callback(log));
  }
});