import * as style from "@styles/App";
import * as formStyle from "@styles/genericComponents/genForm";
import { GenForm } from "@generic/GenForm";
import { GenButton } from "@generic/GenButton";
import { useSettingsContext } from "@/web/context/settings";
import { useState } from "react";
import { TSelectDirectory } from "@/types/window.global";

export const AddCover = () => {
  const {
    text: { main },
    isDarkmode: darkMode,
  } = useSettingsContext();

  // const [saveDir, setSaveDir] = useState<string>("");

  // const handleSelectDir = async () => {
  //   await window.electron.selectDirectory().then((data: TSelectDirectory) => {
  //     console.log(data);
  //     setSaveDir(data[0]);
  //   });
  // }

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     const result = await window.electron.submitAddCover(saveDir);
  //     window.alert(result);
  //   } catch (error: any) {
  //     window.alert(error);
  //   }
  // };
  return (
    <>
      <h1
        css={style.h1({ isDarkMode: darkMode })}
      >{main.title.cover_unavailable}</h1>
      <GenForm
        buttonText={main.form.cover.button.addCover}
        onSubmit={() => { }}
      >
        <label
          style={{
            textDecoration: "line-through"
          }}
          css={formStyle.label({ isDarkMode: darkMode })}
        >{main.form.cover.label.selectDir}</label>
        <label
          style={{
            fontWeight: "bold",
          }}
          css={formStyle.label({ isDarkMode: darkMode })}
        >{main.form.cover.Unavailable}</label>
        <a href="https://www.mp3tag.de/en/index.html" target="_blank" rel="noreferrer">mp3tag</a>

        <GenButton
          text={main.form.cover.button.selectDir}
          isSubmit={false}
          onClick={() => { }}
        />
        <input
          css={formStyle.input({ isDarkMode: darkMode })}
          type="text"
          readOnly={true}
          value="unavailable now... :("
        />
      </GenForm>
    </>
  );
}
