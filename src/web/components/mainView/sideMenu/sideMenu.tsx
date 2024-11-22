import { useState } from "react";
import * as style from "@styles/mainView/sideMenu";
import * as theme from "@styles/root";
import { IconDownload } from "@/web/assets/download.svg";
import { IconAddCover } from "@/web/assets/addCover.svg";
import { useSideMenuContext } from "@/web/context/sideMenu/sideMenuContext";
import { GenToolTip } from "../../genericComponents/GenToolTip";

export const SideMenu = () => {

  type THandleToolTip = ["Download" | "Add Cover", boolean];
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
    toolTip: "Download" | "Add Cover", visibility: boolean,
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
            style={{
              padding: "2px",
              border: `solid rgba(${theme.Colors.primary.base}, 0.5)`,
              borderRadius: "10px",
              borderWidth: currentActive === "download" ? "2px" : "0",
              transition: "border-width 0.1s",
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
            style={{
              padding: "2px",
              border: `solid rgba(${theme.Colors.primary.base}, 0.5)`,
              borderRadius: "10px",
              borderWidth: currentActive === "addCover" ? "2px" : "0",
              transition: "border-width 0.1s",
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
        </div>
        <GenToolTip
          text={handleToolTip[0]}
          isActive={handleToolTip[1]}
          position={mousePosition}
        />
      </div>
    </>
  );
}
