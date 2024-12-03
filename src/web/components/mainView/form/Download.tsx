import * as style from "@styles/App";
import * as formStyle from "@styles/genericComponents/genForm";
import { GenForm } from "@generic/GenForm";
import { GenButton } from "@generic/GenButton";
import { useState } from "react";
import { TSelectDirectory } from "@/types/window.global";
import { useSettingsContext } from "@/web/context/settings";
import { LogView } from "../../absolute/logView";

export const Download = () => {
  const {
    text: { main, alert },
    isDarkmode: darkMode,
  } = useSettingsContext();
  const [url, setUrl] = useState<string>("");
  const [saveDir, setSaveDir] = useState<string>("");
  const [downloadButtonText, setDownloadButtonText] = useState<string>(main.form.download.button.download);
  const [isWorking, setIsWorking] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setDownloadButtonText(main.form.download.button.downloading);
    e.preventDefault();
    try {
      setIsWorking(true);
      const value = {
        url,
        saveDir,
      }
      const result = await window.electron.submitDownload(value)
      window.alert(result);
      setDownloadButtonText(main.form.download.button.download);
      setIsWorking(false);
    } catch (error: any) {
      window.alert(error);
      setDownloadButtonText(main.form.download.button.download);
      setIsWorking(false);
    }
  };

  const handlePaste = async () => {
    await window.electron.pasteFromClipboard().then((data: string) => {
      setUrl(data);
    });
  }

  const handleSelectDir = async () => {
    await window.electron.selectDirectory().then((data: TSelectDirectory) => {
      console.log(data);
      setSaveDir(data[0]);
    });
  }
  return (
    <>
      <LogView active={isWorking} isWorking={isWorking} />
      <h1
        css={style.h1({ isDarkMode: darkMode })}
      >{main.title.download}</h1>
      <GenForm
        buttonText={downloadButtonText}
        onSubmit={handleSubmit}
        isDisabled={downloadButtonText === main.form.download.button.downloading}
      >
        <label
          css={formStyle.label({ isDarkMode: darkMode })}
        >{main.form.download.label.urlInput}</label>
        <GenButton
          text={main.form.download.button.paste}
          onClick={handlePaste}
          isSubmit={false}
        />
        <input
          css={formStyle.input({ isDarkMode: darkMode })}
          type="text"
          placeholder={main.form.download.input.urlInputPlaceholder}
          required={true}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <label
          css={formStyle.label({ isDarkMode: darkMode })}
        >{main.form.download.label.saveDir}</label>
        <GenButton
          text={main.form.download.button.selectDir}
          isSubmit={false}
          onClick={handleSelectDir}
        />
        <input
          css={formStyle.input({ isDarkMode: darkMode })}
          type="text"
          readOnly={true}
          required={true}
          value={saveDir ? saveDir : ""}
        />
      </GenForm>
    </>
  );
};
