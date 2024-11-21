import { css, SerializedStyles } from "@emotion/react";
import * as theme from "@styles/root";

export const genButton: SerializedStyles = css({
  backgroundColor: `rgba(${theme.Colors.primary.base}, 1)`,
  color: theme.Colors.white,
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: `rgba(${theme.Colors.primary.dark}, 1)`,
  },
  "&:focus": {
    outline: "none",
  },
  "&:disabled": {
    backgroundColor: theme.Colors.light,
    color: theme.Colors.dark,
    cursor: "not-allowed",
  },
});