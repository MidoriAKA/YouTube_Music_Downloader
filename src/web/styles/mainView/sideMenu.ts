import { css, SerializedStyles } from "@emotion/react";
import * as theme from "@styles/root";

interface ISideMenu {
  isDarkMode?: boolean;
}

export const container = (props: ISideMenu): SerializedStyles => css({
  position: "absolute",
  left: "0",
  top: "50%",
  transform: "translateY(-50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: props.isDarkMode ? theme.Colors.dark : theme.Colors.light,
  border: props.isDarkMode ? `solid rgba(${theme.Colors.secondary.base}, 0.5)` : `solid rgba(${theme.Colors.primary.base}, 0.5)`,
  borderWidth: "2px 2px 2px 0",
  borderRadius: "0 10px 10px 0",
  width: "60px",
  height: "auto",
  padding: "10px 0 10px 0",
  transition: "background-color 0.2s, width 0.2s, border-width 0.2s",
  zIndex: "2",
  "& > *": {
    margin: "10px 0",
  },
})

export const icon = (props: ISideMenu): SerializedStyles => css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  height: "32px",
  cursor: "pointer",
  outline: props.isDarkMode ? `solid rgba(${theme.Colors.secondary.base}, 0.5)` : `solid 1px rgba(${theme.Colors.primary.base}, 0.5)`,
  borderRadius: "10px",
  transition: "border 0.3s, outline-color 0.3s, outline-width 0.1s",
  "&:hover": {
    outlineColor: props.isDarkMode ? `rgba(${theme.Colors.secondary.light}, 1)` : `rgba(${theme.Colors.primary.base}, 1)`,
  },
})