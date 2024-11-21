import text from "@web/lang/enUS.json"
import * as style from "@styles/App";
import * as formStyle from "@styles/genericComponents/genForm";
import { GenForm } from "@generic/GenForm";
import { GenButton } from "@generic/GenButton";

export const Download = () => {
  const { main } = text;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  }
  return (
    <>
      <h1
        css={style.h1}
      >{main.title.download}</h1>
      <GenForm
        buttonText={main.form.download.button.download}
        onSubmit={handleSubmit}
      >
        <label
          css={formStyle.label}
        >{main.form.download.label.urlInput}</label>
        <GenButton
          text={main.form.download.button.paste}
          isSubmit={false}
        />
        <input
          css={formStyle.input}
          type="text"
          placeholder={main.form.download.input.urlInputPlaceholder}
        />
        <label
          css={formStyle.label}
        >{main.form.download.label.saveDir}</label>
        <GenButton
          text={main.form.download.button.selectDir}
          isSubmit={false}
        />
        <input
          css={formStyle.input}
          type="text"
        />
      </GenForm>
    </>
  );
};