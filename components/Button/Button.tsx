import "./Button.scss";
import classNames from "classnames";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
};

const Button = ({
  children,
  type,
  fullWidth,
  onClick,
  secondary,
  danger,
  disabled,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={classNames("button-container", {
        disabled,
        fullWidth,
        secondary,
        danger,
      })}
    >
      {children}
    </button>
  );
};

export default Button;
