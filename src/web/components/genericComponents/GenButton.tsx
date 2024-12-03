import * as style from "@styles/genericComponents/genButton";
import { useSettingsContext } from "@/web/context/settings";

export const GenButton = (props: IGenButtonProps) => {

  const { text, isSubmit, onClick, isDisabled } = props;
  const {
    isDarkmode: darkMode,
  } = useSettingsContext();

  return (
    <button
      css={style.genButton({ isDarkMode: darkMode })}
      type={isSubmit ? "submit" : "button"}
      onClick={onClick ? onClick : () => { }}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};