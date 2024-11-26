import { GenButton } from "./GenButton";
import * as style from "@styles/genericComponents/genForm";

export const GenForm = (props: IGenFormProps) => {
  const {
    children,
    buttonText,
    onSubmit,
  } = props;
  return (
    <form
      css={style.genForm}
      onSubmit={onSubmit}
    >
      {children}
      <GenButton
        text={buttonText}
        isSubmit={true}
      />
    </form>
  );
};
