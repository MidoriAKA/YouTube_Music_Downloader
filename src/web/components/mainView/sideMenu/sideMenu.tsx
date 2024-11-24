import { useState } from "react";
import * as style from "@styles/mainView/sideMenu";
import * as theme from "@styles/root";
import { IconDownload } from "@/web/assets/download.svg";
import { IconAddCover } from "@/web/assets/addCover.svg";
import { IconSettings } from "@/web/assets/settings.svg";
import { useSideMenuContext } from "@/web/context/sideMenu/sideMenuContext";
import { GenToolTip } from "../../genericComponents/GenToolTip";
import { useLangContext } from "@/web/context/lang/langContext";

export const SideMenu = () => {
  const {
    text: { side },
  } = useLangContext();

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
    toolTip: "Download" | "Add Cover" | "Settings", visibility: boolean,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const { clientX, clientY } = event;
    setMousePosition([clientX + 10, clientY + -10]);
    if (event.type === "mouseenter") {
      setTimeout(() => {
        setHandleToolTip([toolTip, visibility]);
      }, 300);
    } else {
      setHandleToolTip([toolTip, visibility]);
    }
  };

  return (
    <>
      <div>
        <div
          css={style.container}
          onMouseLeave={() => setHandleToolTip([`${handleToolTip[0]}`, false])}
        >
          <div
            css={style.icon}
            style={{
              padding: currentActive === "download" ? "0" : "2px",
              borderWidth: currentActive === "download" ? "2px" : "0",
            }}
            onClick={() => setCurrentActive("download")}
            onMouseEnter={(event) => handleToolTipVisibility("Download", true, event)}
            onMouseLeave={(event) => handleToolTipVisibility("Download", false, event)}
          >
            <IconDownload
              style={{
                width: "30px",
                height: "30px",
              }}
              color={theme.Colors.primary.base}
              hoverColor={theme.Colors.primary.dark}
            />
          </div>
          <div
            css={style.icon}
            style={{
              padding: currentActive === "addCover" ? "0" : "2px",
              borderWidth: currentActive === "addCover" ? "2px" : "0",
            }}
            onClick={() => setCurrentActive("addCover")}
            onMouseEnter={(event) => handleToolTipVisibility("Add Cover", true, event)}
            onMouseLeave={(event) => handleToolTipVisibility("Add Cover", false, event)}
          >
            <IconAddCover
              style={{
                width: "30px",
                height: "30px",
              }}
              color={theme.Colors.primary.base}
              hoverColor={theme.Colors.primary.dark}
            />
          </div>
          <div
            css={style.icon}
            style={{
              padding: currentActive === "settings" ? "0" : "2px",
              borderWidth: currentActive === "settings" ? "2px" : "0",
            }}
            onClick={() => setCurrentActive("settings")}
            onMouseEnter={(event) => handleToolTipVisibility("Settings", true, event)}
            onMouseLeave={(event) => handleToolTipVisibility("Settings", false, event)}
          >
            <IconSettings
              style={{
                width: "30px",
                height: "30px",
              }}
              color={theme.Colors.primary.base}
              hoverColor={theme.Colors.primary.dark}
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
