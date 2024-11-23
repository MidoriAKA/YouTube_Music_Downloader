import * as style from "@styles/App";
import { AddCover, Download } from "./components/mainView";
import { SideMenu } from "./components/mainView/sideMenu/sideMenu";
import { useSideMenuContext } from "./context/sideMenu/sideMenuContext";
import { GenToolTip } from "./components/genericComponents/GenToolTip";
import { LangContextProvider } from "./context/lang/langContext";

export const App = () => {
  const {
    currentActive,
  } = useSideMenuContext();
  return (
    <>
      <LangContextProvider>
        <SideMenu />
        <div
          css={style.container}
        >
          {
            currentActive === "download" && (
              <Download />
            )
          }
          {
            currentActive === "addCover" && (
              <AddCover />
            )
          }
        </div>
      </LangContextProvider>
    </>
  );
};
