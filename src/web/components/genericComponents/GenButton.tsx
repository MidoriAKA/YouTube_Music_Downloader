import * as style from "@styles/genericComponents/genButton";

export const GenButton = (props: IGenButtonProps) => {

  const { text, isSubmit, onClick } = props;

  return (
    <button
      css={style.genButton}
      type={isSubmit ? "submit" : "button"}
      onClick={onClick ? onClick : () => { }}
    >
      {text}
    </button>
  );
};