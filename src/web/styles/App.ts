import { css, SerializedStyles } from "@emotion/react";
import * as theme from "@styles/root";

export const container: SerializedStyles = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "95vh",
  backgroundColor: theme.Colors.light,
});

export const h1: SerializedStyles = css({
  color: theme.Colors.dark,
  fontSize: "2rem",
  margin: "10px",
});