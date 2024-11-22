import { css, SerializedStyles } from "@emotion/react";
import * as theme from "@styles/root";

export const container: SerializedStyles = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "calc(100vw)",
  overflow: "hidden",
  backgroundColor: theme.Colors.light,
  margin: "0",
  padding: "0",
});

export const h1: SerializedStyles = css({
  color: theme.Colors.dark,
  fontSize: "2rem",
  margin: "10px",
});