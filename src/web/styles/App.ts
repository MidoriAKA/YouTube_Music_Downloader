import { css, SerializedStyles } from "@emotion/react";
import * as theme from "@styles/root";

interface IAppProps {
  isDarkMode?: boolean;
}

export const container = (props: IAppProps): SerializedStyles => css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "calc(100vw)",
  overflow: "hidden",
  backgroundColor: props.isDarkMode ? theme.Colors.dark : theme.Colors.light,
  margin: "0",
  padding: "0",
  transition: "background-color 0.3s",
});

export const h1 = (props: IAppProps): SerializedStyles => css({
  color: props.isDarkMode ? theme.Colors.light : theme.Colors.dark,
  fontSize: "2rem",
  margin: "10px",
});