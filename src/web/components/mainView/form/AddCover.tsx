import * as style from "@styles/App";
import * as formStyle from "@styles/genericComponents/genForm";
import { GenForm } from "@generic/GenForm";
import { GenButton } from "@generic/GenButton";
import { useLangContext } from "@/web/context/lang/langContext";
import { useDarkModeContext } from "@/web/context/darkMode";

export const AddCover = () => {
  const {
    text: { main },
  } = useLangContext();
  const {
    darkMode,
  } = useDarkModeContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  }
  return (
    <>
      <h1
        css={style.h1({ isDarkMode: darkMode })}
      >{main.title.cover}</h1>
      <GenForm
        buttonText={main.form.cover.button.addCover}
        onSubmit={handleSubmit}
      >
        <label
          css={formStyle.label({ isDarkMode: darkMode })}
        >{main.form.cover.label.selectDir}</label>
        <GenButton
          text={main.form.cover.button.selectDir}
          isSubmit={false}
        />
        <input
          css={formStyle.input({ isDarkMode: darkMode })}
          type="text"
          readOnly={true}
        />
      </GenForm>
    </>
  );
}
