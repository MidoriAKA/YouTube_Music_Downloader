import { css, SerializedStyles } from "@emotion/react";
import * as theme from "@styles/root";

interface ILogViewProps {
  isDarkmode?: boolean;
}

export const container = (props: ILogViewProps): SerializedStyles => css({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  minWidth: "80%",
  minHeight: "80%",
  maxWidth: "80%",
  maxHeight: "80%",
  overflow: "hidden",
  borderRadius: "10px",
  backgroundColor: props.isDarkmode ? theme.Colors.dark : theme.Colors.light,
  color: props.isDarkmode ? theme.Colors.light : theme.Colors.dark,
  zIndex: 101,
  "& > *": {
    display: "flex",
    flexDirection: "column",
    maxWidth: "90%",
    margin: "5px",
  },
});

export const log = (props: ILogViewProps): SerializedStyles => css({
  overflowY: "auto",
  scrollbarWidth: "thin",
  scrollbarColor: `${props.isDarkmode ? theme.Colors.light : theme.Colors.dark} ${props.isDarkmode ? theme.Colors.dark : theme.Colors.light}`,
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: props.isDarkmode ? theme.Colors.dark : theme.Colors.light,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: props.isDarkmode ? theme.Colors.light : theme.Colors.dark,
    borderRadius: "10px",
    border: `2px solid ${props.isDarkmode ? theme.Colors.dark : theme.Colors.light}`,
  },
  color: props.isDarkmode ? theme.Colors.light : theme.Colors.dark,
  "& > *": {
    margin: "5px",
  },
});