import { css, SerializedStyles } from "@emotion/react";
import * as theme from "@styles/root";

export const genForm: SerializedStyles = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "300px",
  "& > *": {
    margin: "5px",
  },
});

export const input: SerializedStyles = css({
  padding: "10px",
  width: "100%",
  border: `solid rgba(${theme.Colors.rgb.dark}, 0.2)`,
  borderWidth: "0 0 2px 0",
  "&:focus": {
    outline: "none",
    borderColor: `rgba(${theme.Colors.primary.base}, 1)`,
  },
});

export const label: SerializedStyles = css({
  color: theme.Colors.dark,
  fontSize: "1.2rem",
});