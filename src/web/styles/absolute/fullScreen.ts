import { css, SerializedStyles } from "@emotion/react";
import * as theme from "@styles/root";

interface IFullScreenProps {
  isDarkmode?: boolean;
}

export const container = (props: IFullScreenProps): SerializedStyles => css({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  backgroundColor: theme.Colors.black,
  opacity: 0.3,
  zIndex: 100,
  "& > *": {
    margin: "5px",
  },
});