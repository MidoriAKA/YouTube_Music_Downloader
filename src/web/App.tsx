import * as style from "@styles/App";
import { AddCover, Download } from "./components/mainView";

export const App = () => {
  return (
    <div
      css={style.container}
    >
      <Download />
      <AddCover />
    </div>
  );
};
