import { css, SerializedStyles } from "@emotion/react";
import * as theme from "@styles/root";

interface ISettingsProps {
  isDarkMode?: boolean;
}

export const container = (props: ISettingsProps): SerializedStyles => css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "300px",
  "& > *": {
    margin: "5px",
  },
});

export const section: SerializedStyles = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  "& > *": {
    margin: "5px",
  },
});

export const options = (props: ISettingsProps): SerializedStyles => css({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  "& > *": {
    margin: "5px",
  },
  "& > .slider": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > input[type='range']": {
      appearance: "none",
      width: "100px",
      height: "5px",
      borderRadius: "5px",
      borderColor: props.isDarkMode ? `rgba(${theme.Colors.secondary.base}, 1)` : `rgba(${theme.Colors.primary.base}, 1)`,
      outline: "none",
      transition: "background-color 0.3s",
      "&::-webkit-slider-thumb": {
        appearance: "none",
        width: "15px",
        height: "15px",
        borderRadius: "50%",
        backgroundColor: props.isDarkMode ? `rgba(${theme.Colors.secondary.dark}, 1)` : `rgba(${theme.Colors.primary.dark}, 1)`,
        cursor: "pointer",
      },
    }
  },
});