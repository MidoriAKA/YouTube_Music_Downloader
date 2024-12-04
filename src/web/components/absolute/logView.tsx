import { useEffect, useState } from "react";

import { useSettingsContext } from "@/web/context/settings"
import * as background from "@styles/absolute/fullScreen"
import * as style from "@styles/absolute/logView"
import { GenButton } from "../genericComponents/GenButton";


interface ILogViewProps {
  active: boolean;
  isWorking: boolean;
}

export const LogView = ({ active, isWorking }: ILogViewProps) => {

  const {
    isDarkmode
  } = useSettingsContext();

  const [logs, setLogs] = useState<string[]>([]);
  const [logsAmount, setLogsAmount] = useState<number>(0);
  const [playlistName, setPlaylistName] = useState<string>("");
  const [itemName, setItemName] = useState<string>("");
  const [dlAmount, setDlAmount] = useState<number[]>([]); // [current, total], if total is 0, it means it's not a playlist

  useEffect(() => {
    if (!active) {
      setLogs([]);
      setLogsAmount(0);
      setPlaylistName("");
      setItemName("");
      setDlAmount([]);
    }
  }, [active]);

  useEffect(() => {
    const handleLog = (data: string) => {
      setLogs((prev) => [...prev, data]);
      setLogsAmount((prev) => prev + 1);

      const playlistNameMatch = data.match(/\[download\] Downloading playlist: (.+)/);
      if (playlistNameMatch) {
        setPlaylistName(playlistNameMatch[1]);
      }
      const playlistItemsAmountMatch = data.match(/\[download\] Downloading (\d+) items of (\d+)/);
      if (playlistItemsAmountMatch) {
        setDlAmount([0, parseInt(playlistItemsAmountMatch[2])]);
      }
      const currentDlMatch = data.match(/\[download\] Downloading item (\d+) of (\d+)/);
      if (currentDlMatch) {
        setDlAmount([parseInt(currentDlMatch[1]), parseInt(currentDlMatch[2])]);
      }
    };

    window.electron.onReceiveLog(data => {
      handleLog(data);
    });
  }, []);

  useEffect(() => {
    const logContainer = document.getElementById("log-container");
    if (logContainer) {
      logContainer.scrollTop = logContainer.scrollHeight;
    }
  }, [logs]);

  return (
    <>
      <div
        style={{ display: active ? "flex" : "none" }}
        css={background.container({ isDarkmode: isDarkmode })}
      >
      </div>
      <div
        style={{ display: active ? "flex" : "none" }}
        css={style.container({ isDarkmode: isDarkmode })}
      >
        <GenButton
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
          text="cancel"
          onClick={() => {
            window.electron.cancelDownload();
          }}
        />
        <h1>
          {
            playlistName ? playlistName : "Downloading"
          }
        </h1>
        <h3>
          {dlAmount[0]}/{dlAmount[1]}
        </h3>
        <pre
          id="log-container"
          css={style.log({ isDarkmode: isDarkmode })}
        >
          {
            logs.map((log, index) => (
              <div
                key={index}
              >
                {log}
              </div>
            ))
          }
        </pre>
      </div>
    </>
  )
}
