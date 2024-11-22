import { css, SerializedStyles } from "@emotion/react";
import * as theme from "@styles/root";

export const genToolTip: SerializedStyles = css({
  opacity: "0",
  position: "absolute",
  backgroundColor: theme.Colors.light,
  border: `solid 2px rgba(${theme.Colors.rgb.dark}, 0.5)`,
  borderRadius: "5px 5px 5px 0",
  width: "auto",
  height: "20px",
  transition: `opacity 0.3s`,
  zIndex: "99",
  padding: "0 5px",
});

export const text: SerializedStyles = css({
  fontWeight: "bold",
  color: theme.Colors.dark,
  fontSize: "0.8rem",
});