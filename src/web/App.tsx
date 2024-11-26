import * as style from "@styles/App";
import { AddCover, Download } from "./components/mainView";
import { SideMenu } from "./components/mainView/sideMenu/sideMenu";
import { useSideMenuContext } from "./context/sideMenu/sideMenuContext";
import { GenToolTip } from "./components/genericComponents/GenToolTip";
import { LangContextProvider } from "./context/lang/langContext";
import { Settings } from "./components/settingsView/Settings";
import { useDarkModeContext } from "./context/darkMode";

export const App = () => {
  const {
    currentActive,
  } = useSideMenuContext();
  const {
    darkMode,
  } = useDarkModeContext();
  return (
    <>
      <LangContextProvider>
        <SideMenu />
        <div
          css={style.container({ isDarkMode: darkMode })}
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
          {
            currentActive === "settings" && (
              <Settings />
            )
          }
        </div>
      </LangContextProvider>
    </>
  );
};
