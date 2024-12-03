import { css, SerializedStyles } from "@emotion/react";
import * as theme from "@styles/root";

interface IFirstSettingsProps {
  isDarkmode?: boolean;
}

export const container = (props: IFirstSettingsProps): SerializedStyles => css({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "95%",
  height: "95%",
  borderRadius: "10px",
  backgroundColor: props.isDarkmode ? theme.Colors.dark : theme.Colors.light,
  color: props.isDarkmode ? theme.Colors.light : theme.Colors.dark,
  zIndex: 101,
  "& > *": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "90%",
    margin: "5px",
  },
});