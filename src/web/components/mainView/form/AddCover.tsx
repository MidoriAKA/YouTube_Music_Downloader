import text from "@web/lang/enUS.json";
import * as style from "@styles/App";
import * as formStyle from "@styles/genericComponents/genForm";
import { GenForm } from "@generic/GenForm";
import { GenButton } from "@generic/GenButton";

export const AddCover = () => {
  const { main } = text;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  }
  return (
    <>
      <h1
        css={style.h1}
      >{main.title.cover}</h1>
      <GenForm
        buttonText={main.form.cover.button.addCover}
        onSubmit={handleSubmit}
      >
        <label
          css={formStyle.label}
        >{main.form.cover.label.selectDir}</label>
        <GenButton
          text={main.form.cover.button.selectDir}
          isSubmit={false}
        />
        <input
          css={formStyle.input}
          type="text"
          readOnly={true}
        />
      </GenForm>
    </>
  );
}