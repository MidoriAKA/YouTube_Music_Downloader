import { GenButton } from "./GenButton";
import * as style from "@styles/genericComponents/genForm";

export const GenForm = (props: IGenFormProps) => {
  const {
    children,
    buttonText,
    onSubmit,
    styleProps,
    isDisabled
  } = props;
  return (
    <form
      css={style.genForm}
      onSubmit={onSubmit}
      style={styleProps ? styleProps : {}}
    >
      {children}
      <GenButton
        text={buttonText}
        isSubmit={true}
        isDisabled={isDisabled}
      />
    </form>
  );
};
