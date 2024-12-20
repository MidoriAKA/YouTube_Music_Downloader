interface IGenFormProps {
  children: React.ReactNode;
  buttonText: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  styleProps?: React.CSSProperties;
  isDisabled?: boolean;
}