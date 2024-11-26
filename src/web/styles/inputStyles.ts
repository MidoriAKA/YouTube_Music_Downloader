import { css, SerializedStyles } from "@emotion/react";
import * as theme from "@styles/root";

interface IInputStylesProps {
  isDarkMode?: boolean;
}

export const CheckBox = (props: IInputStylesProps): SerializedStyles => css({
  appearance: "none",
  display: "inline-block",
  outline: "solid 2px",
  outlineColor: props.isDarkMode ? `rgba(${theme.Colors.secondary.base}, 0.5)` : `rgba(${theme.Colors.primary.base}, 0.5)`,
  borderWidth: "2px",
  borderRadius: "5px",
  width: "20px",
  height: "20px",
  transition: "background-color 0.3s, border 0.3s, outline-color 0.3s",
  "&:hover": {
    outlineColor: props.isDarkMode ? `rgba(${theme.Colors.secondary.base}, 1)` : `rgba(${theme.Colors.primary.base}, 1)`,
  },
  "&:checked": {
    backgroundColor: props.isDarkMode ? `rgba(${theme.Colors.secondary.base}, 1)` : `rgba(${theme.Colors.primary.base}, 1)`,
    border: props.isDarkMode ? `solid 1px rgba(${theme.Colors.rgb.dark}, 1)` : `solid 1px rgba(${theme.Colors.rgb.light}, 1)`,
  },
});

export const Select = (props: IInputStylesProps): SerializedStyles => css({
  padding: "10px",
  width: "100px",
  border: props.isDarkMode ? `solid rgba(${theme.Colors.secondary.base}, 0.2)` : `solid rgba(${theme.Colors.primary.base}, 0.2)`,
  borderWidth: "0 0 2px 0",
});

