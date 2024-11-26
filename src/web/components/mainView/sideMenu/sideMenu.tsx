import { useState } from "react";
import * as style from "@styles/mainView/sideMenu";
import * as theme from "@styles/root";
import { IconDownload } from "@/web/assets/download.svg";
import { IconAddCover } from "@/web/assets/addCover.svg";
import { IconSettings } from "@/web/assets/settings.svg";
import { useSideMenuContext } from "@/web/context/sideMenu/sideMenuContext";
import { useDarkModeContext } from "@/web/context/darkMode";
import { GenToolTip } from "../../genericComponents/GenToolTip";
import { useLangContext } from "@/web/context/lang/langContext";

export const SideMenu = () => {
  const {
    text: { side },
  } = useLangContext();
  const {
    darkMode,
  } = useDarkModeContext();

  type THandleToolTip = ["Download" | "Add Cover" | "Settings", boolean];
  const [handleToolTip, setHandleToolTip] = useState<THandleToolTip>([
    "Download",
    false,
  ]);

  type TMousePosition = [number, number];
  const [mousePosition, setMousePosition] = useState<TMousePosition>([0, 0]);

  const {
    currentActive,
    setCurrentActive,
  } = useSideMenuContext();

  const handleToolTipVisibility = (
    toolTip: "Download" | "Add Cover" | "Settings",
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const { clientX, clientY } = event;
    setMousePosition([clientX + 10, clientY + -10]);
    setHandleToolTip([toolTip, !handleToolTip[1]]);
  };

  return (
    <>
      <div>
        <div
          css={style.container({ isDarkMode: darkMode })}
          onMouseLeave={() => setHandleToolTip([`${handleToolTip[0]}`, false])}
        >
          <div
            css={style.icon({ isDarkMode: darkMode })}
            style={{
              outlineWidth: currentActive === "download" ? "2px" : "0",
            }}
            onClick={() => setCurrentActive("download")}
            onMouseEnter={(event) => handleToolTipVisibility("Download", event)}
            onMouseLeave={(event) => handleToolTipVisibility("Download", event)}
          >
            <IconDownload
              style={{
                width: "30px",
                height: "30px",
              }}
              color={
                darkMode ? theme.Colors.secondary.base
                  : theme.Colors.primary.base
              }
              hoverColor={
                darkMode ? theme.Colors.secondary.light
                  : theme.Colors.primary.dark
              }
            />
          </div>
          <div
            css={style.icon({ isDarkMode: darkMode })}
            style={{
              outlineWidth: currentActive === "addCover" ? "2px" : "0",
            }}
            onClick={() => setCurrentActive("addCover")}
            onMouseEnter={(event) => handleToolTipVisibility("Add Cover", event)}
            onMouseLeave={(event) => handleToolTipVisibility("Add Cover", event)}
          >
            <IconAddCover
              style={{
                width: "30px",
                height: "30px",
              }}
              color={
                darkMode ? theme.Colors.secondary.base
                  : theme.Colors.primary.base
              }
              hoverColor={
                darkMode ? theme.Colors.secondary.light
                  : theme.Colors.primary.dark
              }
            />
          </div>
          <div
            css={style.icon({ isDarkMode: darkMode })}
            style={{
              outlineWidth: currentActive === "settings" ? "2px" : "0",
            }}
            onClick={() => setCurrentActive("settings")}
            onMouseEnter={(event) => handleToolTipVisibility("Settings", event)}
            onMouseLeave={(event) => handleToolTipVisibility("Settings", event)}
          >
            <IconSettings
              style={{
                width: "30px",
                height: "30px",
              }}
              color={
                darkMode ? theme.Colors.secondary.base
                  : theme.Colors.primary.base
              }
              hoverColor={
                darkMode ? theme.Colors.secondary.light
                  : theme.Colors.primary.dark
              }
            />
          </div>
        </div>
        <GenToolTip
          text={
            handleToolTip[0] === "Download"
              ? side.toolTip.download
              : handleToolTip[0] === "Add Cover"
                ? side.toolTip.addCover
                : side.toolTip.settings
          }
          isActive={handleToolTip[1]}
          position={mousePosition}
        />
      </div>
    </>
  );
}
