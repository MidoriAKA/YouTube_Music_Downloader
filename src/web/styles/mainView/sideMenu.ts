import { css, SerializedStyles } from "@emotion/react";
import * as theme from "@styles/root";

export const container: SerializedStyles = css({
  position: "absolute",
  left: "0",
  top: "50%",
  transform: "translateY(-50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.Colors.light,
  border: `solid rgba(${theme.Colors.primary.base}, 0.3)`,
  borderWidth: "2px 2px 2px 0",
  borderRadius: "0 10px 10px 0",
  width: "60px",
  height: "auto",
  padding: "10px 0 10px 0",
  transition: `
    width 0.2s,
    border-width 0.2s,
  `,
  zIndex: "2",
  "& > *": {
    margin: "10px 0",
  },
})

export const icon: SerializedStyles = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  height: "32px",
  cursor: "pointer",
  border: `solid rgba(${theme.Colors.primary.base}, 0.5)`,
  borderRadius: "10px",
  "&:hover": {
    borderColor: `rgba(${theme.Colors.primary.dark}, 1)`,
  },
})