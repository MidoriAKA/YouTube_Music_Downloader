import { css, SerializedStyles } from "@emotion/react";
import * as theme from "@styles/root";

interface IGenToolTips {
  isDarkMode?: boolean;
}

export const genToolTip = (props: IGenToolTips): SerializedStyles => css({
  visibility: "hidden",
  opacity: 0,
  position: "absolute",
  backgroundColor: props.isDarkMode ? theme.Colors.dark : theme.Colors.light,
  border: props.isDarkMode ? `solid rgba(${theme.Colors.secondary.base}, 0.3)` : `solid rgba(${theme.Colors.primary.base}, 0.3)`,
  borderRadius: "5px 5px 5px 0",
  width: "auto",
  height: "20px",
  transition: "opacity 0.3s, visibility 0.3s",
  zIndex: "99",
  padding: "0 5px",
});

export const text = (props: IGenToolTips): SerializedStyles => css({
  fontWeight: "bold",
  color: props.isDarkMode ? theme.Colors.light : theme.Colors.dark,
  fontSize: "0.8rem",
  userSelect: "none",
});