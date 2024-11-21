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
  border: `1px solid rgba(${theme.Colors.dark}, 0.2)`,
  borderRadius: "5px",
  "&:focus": {
    outline: "none",
    borderColor: `rgba(${theme.Colors.primary.base}, 1)`,
  },
});

export const label: SerializedStyles = css({
  color: theme.Colors.dark,
  fontSize: "1.3rem",
});