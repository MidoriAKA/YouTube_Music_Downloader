import { TSelectDirectory } from "@/types/window.global";
import { GenButton } from "@generic/GenButton";
import { GenForm } from "@generic/GenForm";
import { useEffect, useState } from "react";

import * as background from "@styles/absolute/fullScreen"
import * as style from "@/web/styles/absolute/firstSettings"
import * as rootStyle from "@styles/App"
import * as inputStyle from "@styles/genericComponents/genForm"
import { useSettingsContext } from "@/web/context/settings";
import { Settings } from "../settingsView/Settings";

export const FirstSetting = () => {
  const {
    setIsFirstTime,
    isDarkmode,
    text: { firstSetting },
    handleSaveSettings,

  } = useSettingsContext();

  const [ytdlpPath, setYtdlpPath] = useState<string>("");
  const [downloadButtonText, setDownloadButtonText] = useState<string>(firstSetting.button.download);

  const handleDownload = () => {
    setDownloadButtonText(firstSetting.button.downloading);
    window.electron.ytdlpDownload();
    window.electron.onReceiveLog((data: string) => {
      if (data.includes("success")) {
        alert(firstSetting.message.ytdlp_download_success);
        setDownloadButtonText(firstSetting.button.download);
      } else if (data.includes("falied")) {
        alert(firstSetting.message.ytdlp_download_fail);
        setDownloadButtonText(firstSetting.button.download);
      }
    });
  }

  const handleSelectPath = () => {
    window.electron.selectDirectory().then((data: TSelectDirectory) => {
      if (!data) return;
      setYtdlpPath(data[0]);
    });
  }

  const habdleDone = () => {
    setIsFirstTime(false);
    handleSaveSettings();
    window.electron.ytdlpSetPath(ytdlpPath);
  }
  return (
    <>
      <div
        css={background.container({ isDarkmode: isDarkmode })}
      >
      </div>
      <div
        css={style.container({ isDarkmode: isDarkmode })}
      >
        <h1
          css={rootStyle.h1({ isDarkMode: isDarkmode })}
        >{firstSetting.title.welcome}</h1>
        <span>
          {firstSetting.message.welcome}
        </span>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Settings
            isFromFirstSetting={true}
          />
          <GenForm
            buttonText={firstSetting.button.done}
            onSubmit={habdleDone}
            styleProps={{
              justifyContent: "space-between",
              height: "100%",
              width: "45%",
            }}
          >
            <h3>
              {firstSetting.message.ytdlp_download}
            </h3>
            <GenButton
              onClick={handleDownload}
              text={downloadButtonText}
              isDisabled={downloadButtonText === firstSetting.button.downloading}

            />
            <GenButton
              onClick={handleSelectPath}
              text={firstSetting.button.set_path}
            />
            <input
              css={inputStyle.input({ isDarkMode: isDarkmode })}
              type="text"
              value={ytdlpPath}
              readOnly
              style={{
                width: "100%",
                padding: "5px",
                marginTop: "5px",
              }}
            />
          </GenForm>
        </div>
      </div>
    </>
  )
}