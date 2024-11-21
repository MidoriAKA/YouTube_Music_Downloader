import { css, SerializedStyles } from "@emotion/react";
import * as theme from "@styles/root";

export const container: SerializedStyles = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: theme.Colors.light,
  margin: "0",
  padding: "0",
});

export const h1: SerializedStyles = css({
  color: theme.Colors.dark,
  fontSize: "2rem",
  margin: "10px",
});