import { css, SerializedStyles } from "@emotion/react";
import * as theme from "@styles/root";

interface IGenButtonProps {
  isDarkMode?: boolean;
}

export const genButton = (props: IGenButtonProps): SerializedStyles => css({
  backgroundColor: props.isDarkMode ? `rgba(${theme.Colors.secondary.base}, 1)` : `rgba(${theme.Colors.primary.base}, 1)`,
  color: props.isDarkMode ? theme.Colors.dark : theme.Colors.light,
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: props.isDarkMode ? "bold" : "normal",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: props.isDarkMode ? `rgba(${theme.Colors.secondary.dark}, 1)` : `rgba(${theme.Colors.primary.dark}, 1)`,
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