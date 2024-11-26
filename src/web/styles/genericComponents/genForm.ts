import { css, SerializedStyles } from "@emotion/react";
import * as theme from "@styles/root";

interface IGenFormProps {
  isDarkMode?: boolean;
}

export const genForm: SerializedStyles = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "300px",
  "& > *": {
    margin: "5px",
  },
});

export const input = (props: IGenFormProps): SerializedStyles => css({
  padding: "10px",
  width: "100%",
  border: props.isDarkMode ? `solid rgba(${theme.Colors.secondary.base}, 0.2)` : `solid rgba(${theme.Colors.primary.base}, 0.2)`,
  backgroundColor: props.isDarkMode ? theme.Colors.dark : theme.Colors.light,
  color: props.isDarkMode ? theme.Colors.light : theme.Colors.dark,
  borderWidth: "0 0 2px 0",
  "&:focus": {
    outline: "none",
    borderColor: props.isDarkMode ? `rgba(${theme.Colors.secondary.base}, 1)` : `rgba(${theme.Colors.primary.base}, 1)`,
  },
});

export const label = (props: IGenFormProps): SerializedStyles => css({
  color: props.isDarkMode ? theme.Colors.light : theme.Colors.dark,
  fontSize: "1.2rem",
});