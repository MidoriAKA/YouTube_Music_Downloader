import * as style from "@styles/genericComponents/genButton";
import { useDarkModeContext } from "@/web/context/darkMode";

export const GenButton = (props: IGenButtonProps) => {

  const { text, isSubmit, onClick } = props;
  const {
    darkMode,
  } = useDarkModeContext();

  return (
    <button
      css={style.genButton({ isDarkMode: darkMode })}
      type={isSubmit ? "submit" : "button"}
      onClick={onClick ? onClick : () => { }}
    >
      {text}
    </button>
  );
};