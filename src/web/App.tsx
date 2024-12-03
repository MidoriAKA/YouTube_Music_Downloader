import * as style from "@styles/App";
import { AddCover, Download } from "./components/mainView";
import { SideMenu } from "./components/mainView/sideMenu/sideMenu";
import { useSideMenuContext } from "./context/sideMenu/sideMenuContext";
import { GenToolTip } from "./components/genericComponents/GenToolTip";
import { Settings } from "./components/settingsView/Settings";
import { useSettingsContext } from "./context/settings";
import { useEffect, useState } from "react";
import { FirstSetting } from "./components/absolute/firstSetting";

export const App = () => {
  const {
    currentActive,
  } = useSideMenuContext();
  const {
    isFirstTime,
    isDarkmode: darkMode,
  } = useSettingsContext();
  return (
    <>
      {
        isFirstTime && (
          <FirstSetting />
        )
      }
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
            <Settings
              isFromFirstSetting={false}
            />
          )
        }
      </div>
    </>
  );
};
