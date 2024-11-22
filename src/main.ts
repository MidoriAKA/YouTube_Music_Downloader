import path, { dirname } from "node:path";
import { BrowserWindow, app, clipboard, dialog, ipcMain } from "electron";
import { exec, spawn } from "child_process";
import fs from "fs";
import fetch from "node-fetch";
import albumArt from "album-art";
import NodeID3 from "node-id3";
import { ISubmitDownload, TSelectDirectory } from "./types/window.global";

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("dist/index.html");
  // mainWindow.webContents.openDevTools({ mode: "detach" });
});

ipcMain.handle("paste-from-clipboard", async () => {
  return clipboard.readText();
});

ipcMain.handle("submit-download", async (event, values: ISubmitDownload) => {
  const ytDlpPath = path.join(__dirname, "bin", "yt-dlp.exe");
  const isPlaylist = values.url.includes("playlist") ? "--yes-playlist" : "";
  const output = path.join(values.saveDir, "%(artist)s - %(title)s.%(ext)s");
  const downloadPrompts = [
    `"${ytDlpPath}"`,
    "--verbose",
    `${isPlaylist}`,
    `--output "${output}"`,
    "--windows-filenames",
    "--abort-on-unavailable-fragment",
    "--buffer-size 1M",
    "--extract-audio",
    "--audio-format mp3",
    "--audio-quality 320K",
    "--embed-metadata",
    `"${values.url}"`,
  ].join(" ");

  console.log(downloadPrompts);

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
  const mp3Files = fs.readdirSync(path).filter((file) => file.endsWith(".mp3"))
  ? fs.readdirSync(path).filter((file) => file.endsWith(".mp3"))
  : [];

  mp3Files.forEach(async (path) => {
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
  const mp3Files = fs.readdirSync(directlyPath).filter((file) => file.endsWith(".mp3"))
  ? fs.readdirSync(directlyPath).filter((file) => file.endsWith(".mp3"))
  : [];

  const returnValues: TSelectDirectory = [
    directlyPath,
    mp3Files,
  ]

  return returnValues;
});

app.once("window-all-closed", () => app.quit());
