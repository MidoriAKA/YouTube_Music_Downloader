import path, { dirname } from "node:path";
import { BrowserWindow, app, clipboard, dialog, ipcMain, webContents } from "electron";
import { spawn } from "child_process";
import fs from "fs";
import fetch from "node-fetch";
import albumArt from "album-art";
import NodeID3 from "node-id3";
import Store, { Schema } from "electron-store";
import iconv from "iconv-lite";
import { ISubmitDownload, TSelectDirectory, TSettingsValues } from "./types/window.global";

const schema: Schema<TSettingsValues> = {
  settings: {
    type: "object",
    properties: {
      isFirstTime: {
        type: "boolean",
        default: true,
      },
      language: {
        type: "string",
        enum: ["enUS", "jaJP", "ptBR"],
        default: "enUS",
      },
      isDarkMode: {
        type: "boolean",
        default: false,
      },
      ytdlpPath: {
        type: "string",
        default: "",
      },
      downloadOptions: {
        type: "object",
        properties: {
          audioFormat: {
            type: "string",
            enum: ["mp3", "m4a", "wav"],
            default: "mp3",
          },
          audioQuality: {
            type: "number",
            enum: [128, 192, 256, 320],
            default: 320,
          },
        },
      },
    },
  },
}

const settings = new Store({ schema });
if (settings.get("settings") === undefined) {
  console.log("Settings not found. Creating default settings...");
  const def:TSettingsValues  = {
    settings: {
      isFirstTime: true,
      language: "enUS",
      isDarkMode: false,
      ytdlpPath: "",
      downloadOptions: {
        audioQuality: 320,
        audioFormat: "mp3",
      },
    },
  };
  settings.set("settings", def);
}

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
    },
  });
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadFile("dist/index.html");
  mainWindow.webContents.openDevTools({ mode: "detach" });

  const appDataPath = app.getPath("appData"); // C:\Users\username\AppData\Roaming 
  console.log("AppData Path:", appDataPath); // to set ytdlpPath when user download on first setting

  ipcMain.handle("load-settings", async () => {
    const settingsValues = settings.get("settings");
    console.dir(settingsValues);
    return settingsValues;
  });
});

ipcMain.handle("get-app-data-path", async () => {
  const appDataPath = path.join(app.getPath("appData"), "mudo");
  return appDataPath;
});

ipcMain.on("save-settings", (event, values) => {
  settings.set("settings", values);
  console.dir(values);
});

ipcMain.handle("yt-dlp-download", async (event) => {
  const appDataPath = app.getPath("appData");

  event.sender.send("receive-log", "installing yt-dlp...");
  const winget = "winget install yt-dlp";
  const cmdProcess = spawn(winget, {
    shell: true,
    cwd: appDataPath,
  });
  cmdProcess.stdin.write("y\n");
  cmdProcess.stdin.end();
  cmdProcess.stdout.on("data", (data) => {
    event.sender.send("receive-log", data.toString());
  });
  cmdProcess.on("close", (code) => {
    if (code === 0) {
      event.sender.send("receive-log", "success");
    } else {
      event.sender.send("receive-log", "falied");
    }
  });
});

ipcMain.handle("yt-dlp-set-path", (event, path) => {
  const settingsValues = settings.get("settings");
  settingsValues.ytdlpPath = path;
  settings.set("settings", settingsValues);
});

ipcMain.handle("paste-from-clipboard", async () => {
  return clipboard.readText();
});

ipcMain.handle("submit-download", async (event, values: ISubmitDownload) => {
  const settingsValues = settings.get("settings");
  console.dir(settingsValues);
  const downloadOptions = settingsValues.settings.downloadOptions;
  const ytdlpPrompt = settingsValues.settings.ytdlpPath 
    ? `"${settingsValues.settings.ytdlpPath}"`
    : "yt-dlp";

  const isPlaylist = values.url.includes("playlist") ? "--yes-playlist" : "";
  const output = path.join(values.saveDir, "%(artist)s - %(title)s.%(ext)s");
  const downloadPrompts = [
    `${ytdlpPrompt}`,
    "--verbose",
    "--progress",
    `${isPlaylist}`,
    `--output "${output}"`,
    "--windows-filenames",
    "--abort-on-unavailable-fragment",
    "--buffer-size 1M",
    "--extract-audio",
    `--audio-format ${downloadOptions.audioFormat}`,
    `--audio-quality ${downloadOptions.audioQuality}K`,
    "--embed-metadata",
    `"${values.url}"`,
  ].join(" ");

  return new Promise((resolve, reject) => {
    const cmdProcess = spawn(downloadPrompts, {
      shell: true,
    });
    cmdProcess.stdout.on("data", (data) => {
      event.sender.send("receive-log", data.toString());
      console.log("\x1b[36m%s\x1b[0m", data.toString());
    });
    cmdProcess.stderr.on("data", (data) => {
      event.sender.send("receive-log", data.toString());
      console.log("\x1b[32m%s\x1b[0m", data.toString());
    });
    cmdProcess.on("close", (code) => {
      if (code === 0) {
        resolve("Download completed successfully.");
      } else {
        reject("Download failed.");
      }
    });
  });
});

ipcMain.handle("submit-add-cover", async (event, path: string) => {
  const audioFiles = fs.readdirSync(path).filter((file) => file.endsWith(".mp3"))
  ? fs.readdirSync(path).filter((file) => file.endsWith(".mp3"))
  : [];

  audioFiles.forEach(async (path) => {
    await setCover(path);
  });
});

const setCover = async (filePath: string) => {
  try {
    NodeID3.read(filePath, async (err: string, tags: { album: string; title: string; }) => {
      if (err) {
        console.error(err);
        return;
      }

      const albumName = tags.album
        ? tags.album
        : tags.title;
      const fileName = path.basename(filePath, ".mp3");
      const [artist, title] = fileName.split(" - ");

      try {
        const coverURL = await albumArt(artist, { album: albumName, size: "large" });
        const coverData = await fetchCover(coverURL);

        NodeID3.update({ image: { mime: "image/jpeg", type: { id: 3 }, description: "Cover", imageBuffer: coverData } }, filePath, (err: string) => {
          if (err) {
            console.error(err);
            return;
          } else {
            console.log("Cover added successfully.");
          }
        });
      } catch (error) {
        console.error(error);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

const fetchCover = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch cover image.");
  } else {
    console.log("Cover image fetched successfully.");
  }
  const buffer = await res.arrayBuffer();
  return Buffer.from(buffer);
};

ipcMain.handle("select-directory", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  if (result.canceled) {
    return;
  }

  const directlyPath = result.filePaths[0];
  const audioFiles = fs.readdirSync(directlyPath).filter((file) =>
    file.endsWith(".mp3")
    || file.endsWith(".m4a")
    || file.endsWith(".wav"))
      ? fs.readdirSync(directlyPath).filter((file) =>
        file.endsWith(".mp3")
        || file.endsWith(".m4a")
        || file.endsWith(".wav"))
  : [];

  const returnValues: TSelectDirectory = [
    directlyPath,
    audioFiles,
  ]

  return returnValues;
});

app.once("window-all-closed", () => app.quit());
