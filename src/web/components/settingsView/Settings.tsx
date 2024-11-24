
import { useLangContext } from "@/web/context/lang/langContext";

export const Settings = () => {
  const {
    text: { main },
    setLang,
    lang,
  } = useLangContext();
  return (
    <>
      <h1>{main.title.settings}</h1>
      <div>
        <label>{main.form.settings.label.language}</label>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        >
          <option value="enUS">
            {main.form.settings.option.language.enUS}
          </option>
          <option value="jaJP">
            {main.form.settings.option.language.jaJP}
          </option>
        </select>
      </div>
    </>
  );
}