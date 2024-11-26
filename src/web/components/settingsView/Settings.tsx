
import { useLangContext } from "@/web/context/lang/langContext";
import { useDarkModeContext } from "@/web/context/darkMode";
import * as color from "@styles/root";
import * as style from "@styles/settingsView/settingsView";
import * as inputStyle from "@styles/inputStyles";
import { useState } from "react";
import { css, SerializedStyles } from "@emotion/react";

export const Settings = () => {
  type TLanguage = "enUS" | "jaJP";

  const [sliderValue, setSliderValue] = useState(320);
  const [sliderValuePercentage, setSliderValuePercentage] = useState(100);

  type TAudioFormat = "mp3" | "m4a" | "wav";
  const [audioFormat, setAudioFormat] = useState<TAudioFormat>("mp3");

  const {
    text: { main },
    setLang,
    lang,
  } = useLangContext();
  const {
    darkMode,
    setDarkMode,
  } = useDarkModeContext();

  const handleLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.dir(e)
    console.log(e.target.value)
    setLang(e.target.value as TLanguage);
  }

  const handleDarkMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(e.target.checked);
  }

  const SliderBackground: SerializedStyles = css({
    background: darkMode ? `
      linear-gradient(to right,
      rgb(${color.Colors.secondary.base}) ${sliderValuePercentage}%,
      rgb(${color.Colors.secondary.light}) ${sliderValuePercentage}%)
      !important` : `
      linear-gradient(to right,
      rgb(${color.Colors.primary.base}) ${sliderValuePercentage}%,
      rgb(${color.Colors.primary.light}) ${sliderValuePercentage}%)
      !important`,
  })
  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(e.target.value));
    setSliderValuePercentage(((Number(e.target.value) - 128) / (320 - 128)) * 100);
  }

  const handleAudioFormat = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAudioFormat(e.target.value as TAudioFormat);
  }

  return (
    <>
      <div
        css={style.container}
      >
        <h1>{main.title.settings}</h1>
        <div
          css={style.section}
        >
          <div
            css={style.options}
          >
            <label>{main.form.settings.label.language}</label>
            <select
              css={inputStyle.Select({ isDarkMode: darkMode })}
              value={lang}
              onChange={(e) => handleLanguage(e)}
            >
              <option value="enUS">
                {main.form.settings.option.language.enUS}
              </option>
              <option value="jaJP">
                {main.form.settings.option.language.jaJP}
              </option>
              <option value="ptBR">
                {main.form.settings.option.language.ptBR}
              </option>
            </select>
          </div>
          <div
            css={style.options}
          >
            <label>{main.form.settings.label.theme}</label>
            <input
              css={inputStyle.CheckBox({ isDarkMode: darkMode })}
              type="checkbox"
              checked={darkMode}
              onChange={(e) => handleDarkMode(e)}
            />
          </div>
        </div>
        <div
          css={style.section}
        >
          <h2>{main.title.downloadOption}</h2>
          <div
            css={style.options({ isDarkMode: darkMode })}
          >
            <label>{main.form.settings.label.audioQuality}</label>
            <div
              className="slider"
            >
              <input
                css={SliderBackground}
                type="range"
                min="128"
                max="320"
                step="64"
                defaultValue="320"
                onChange={(e) => handleSlider(e)}
              />
              <p>{sliderValue} kbps</p>
            </div>
          </div>
          <div
            css={style.options}
          >
            <label>{main.form.settings.label.audioFormat}</label>
            <select
              css={inputStyle.Select}
              onChange={(e) => handleAudioFormat(e)}
            >
              <option value="mp3">mp3</option>
              <option value="m4a">m4a</option>
              <option value="wav">wav</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}