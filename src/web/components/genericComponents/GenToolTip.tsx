import * as style from "@styles/genericComponents/genToolTip";

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
  const { isActive } = props;
  return (
    <div
      style={{
        top: position[1],
        left: position[0],
        opacity: isActive ? 1 : 0,
      }}
      css={style.genToolTip}
    >
      {children}
      <span
        css={style.text}
      >
        {text}
      </span>
    </div>
  );
}