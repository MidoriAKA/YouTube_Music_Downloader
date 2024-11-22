import * as style from "@styles/App";
import { AddCover, Download } from "./components/mainView";

export const App = () => {
  window.electron.onReceiveLog((log) => {
    console.log(log);
  });
  return (
    <div
      css={style.container}
    >
      <Download />
      <AddCover />
    </div>
  );
};
