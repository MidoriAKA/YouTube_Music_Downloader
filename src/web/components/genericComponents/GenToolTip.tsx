import * as style from "@styles/genericComponents/genToolTip";
import { useSettingsContext } from "@/web/context/settings";

interface IGenToolTipProps {
  text: string;
  isActive: boolean;
  children?: React.ReactNode;
  position: [number, number];
}

export const GenToolTip = (props: IGenToolTipProps) => {
  const {
    text,
    children,
    position,
  } = props;
  const {
    isDarkmode: darkMode
  } = useSettingsContext();
  const { isActive } = props;
  return (
    <div
      style={{
        top: position[1],
        left: position[0],
        opacity: isActive ? 1 : 0,
        visibility: isActive ? "visible" : "hidden",
      }}
      css={style.genToolTip({ isDarkMode: darkMode })}
    >
      {children}
      <span
        css={style.text({ isDarkMode: darkMode })}
      >
        {text}
      </span>
    </div>
  );
}