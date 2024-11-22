import { css, SerializedStyles } from "@emotion/react";
import * as theme from "@styles/root";

export const container: SerializedStyles = css({
  position: "absolute",
  left: "0",
  top: "0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.Colors.light,
  border: `solid rgba(${theme.Colors.primary.base}, 0.3)`,
  borderWidth: "0 2px 0 0",
  width: "60px",
  height: "calc(100vh - 10px)",
  transition: `
    width 0.2s,
    border-width 0.2s,
  `,
  zIndex: "2",
  padding: "10px 0 0 0",
  "& > *": {
    margin: "10px 0",
  },
})
