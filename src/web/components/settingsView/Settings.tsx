import { useSettingsContext } from "@/web/context/settings";
import * as color from "@styles/root";
import * as style from "@styles/settingsView/settingsView";
import * as inputStyle from "@styles/inputStyles";
import { useEffect, useState } from "react";
import { css, SerializedStyles } from "@emotion/react";
import { TLangType, TAudioFormat, TAudioQuality } from "@/types/window.global";
import { GenButton } from "@generic/GenButton";

interface ISettingsProps {
  isFromFirstSetting: boolean;
}

export const Settings = ({ isFromFirstSetting }: ISettingsProps) => {

  const {
    text: { main },
    lang,
    setLang,
    isDarkmode: darkMode,
    setIsDarkmode: setDarkMode,
    audioFormat,
    setAudioFormat,
    audioQuality,
    setAudioQuality,
    handleSaveSettings
  } = useSettingsContext();

  useEffect(() => {
    setSliderValuePercentage(((audioQuality - 128) / (320 - 128)) * 100);
  }, [])

  const [sliderValuePercentage, setSliderValuePercentage] = useState<number>();

  const handleLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLang(e.target.value as TLangType);
    console.log(e.target.value);
  }

  const handleDarkMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(e.target.checked);
    console.log(e.target.checked);
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
    setAudioQuality(Number(e.target.value) as TAudioQuality);
    setSliderValuePercentage(((Number(e.target.value) - 128) / (320 - 128)) * 100);
    console.log(e.target.value);
  }

  const handleAudioFormat = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAudioFormat(e.target.value as TAudioFormat);

  }

  return (
    <>
      <div
        css={style.container}
      >
        {
          isFromFirstSetting ? (
            null
          ) : (
            <h1
              css={style.title({ isDarkMode: darkMode })}
            >{main.title.settings}</h1>
          )
        }
        <div
          css={style.section}
        >
          <div
            css={style.options}
          >
            <label
              css={style.label({ isDarkMode: darkMode })}
            >{main.form.settings.label.language}</label>
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
            <label
              css={style.label({ isDarkMode: darkMode })}
            >{main.form.settings.label.theme}</label>
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
          {
            isFromFirstSetting ? (
              null
            ) : (
              <h2
                css={style.title({ isDarkMode: darkMode })}
              >{main.title.downloadOption}</h2>
            )
          }
          <div
            css={style.options({ isDarkMode: darkMode })}
          >
            <label
              css={style.label({ isDarkMode: darkMode })}
            >{main.form.settings.label.audioQuality}</label>
            <div
              className="slider"
            >
              <input
                css={SliderBackground}
                type="range"
                min="128"
                max="320"
                step="64"
                defaultValue={audioQuality}
                onChange={(e) => handleSlider(e)}
              />
              <p
                css={style.label({ isDarkMode: darkMode })}
              >{audioQuality} kbps</p>
            </div>
          </div>
          <div
            css={style.options}
          >
            <label
              css={style.label({ isDarkMode: darkMode })}
            >{main.form.settings.label.audioFormat}</label>
            <select
              css={inputStyle.Select({ isDarkMode: darkMode })}
              value={audioFormat}
              onChange={(e) => handleAudioFormat(e)}
            >
              <option value="mp3">mp3</option>
              <option value="m4a">m4a</option>
              <option value="wav">wav</option>
            </select>
          </div>
        </div>
        <GenButton
          onClick={handleSaveSettings}
          text={"save"}
        />
      </div>
    </>
  );
}