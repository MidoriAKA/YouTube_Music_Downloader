import * as style from "@styles/App";
import * as formStyle from "@styles/genericComponents/genForm";
import { GenForm } from "@generic/GenForm";
import { GenButton } from "@generic/GenButton";
import { useState } from "react";
import { TSelectDirectory } from "@/types/window.global";
import { useLangContext } from "@/web/context/lang/langContext";
import { useDarkModeContext } from "@/web/context/darkMode";

export const Download = () => {
  const {
    text: { main },
  } = useLangContext();
  const {
    darkMode
  } = useDarkModeContext();
  const [url, setUrl] = useState<string>("");
  const [saveDir, setSaveDir] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const value = {
        url,
        saveDir,
      }
      const result = await window.electron.submitDownload(value);
      alert(result);
    } catch (error) {
      console.error(error);
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
      <h1
        css={style.h1({ isDarkMode: darkMode })}
      >{main.title.download}</h1>
      <GenForm
        buttonText={main.form.download.button.download}
        onSubmit={handleSubmit}
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
