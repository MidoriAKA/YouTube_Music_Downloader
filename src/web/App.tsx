import * as style from "@styles/App";
import { Download } from "./components/mainView";

export const App = () => {
  return (
    <div
      css={style.container}
    >
      <Download />
    </div>
  );
};
