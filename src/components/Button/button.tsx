import classNames from 'classnames';
import React from 'react';
import "./index.css"

interface ButtonProps {
  onClick?: () => void;
  label: string;
  className: string;
  variant: string;
  disabled:boolean;
  loading:boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, className, variant, disabled, loading}) => {

  console.log(variant)

  const sliptVariant = variant.split("-");

  // console.log(sliptVariant)

  const mVariant = sliptVariant[0] || "default";
  const type = sliptVariant[1] || "primary";

  console.log(mVariant,"type  ", type)

  const btnColor = () => {
    switch (mVariant) {
      case "solid":
        return solidColor();
      case "danger":
        return dangerColor();
      case "none":
        return noneColor();
      default:
        return defaultColor();
    }
  };
  const solidColor = () => {
    const primary = {
      color: "bg-blue-500 text-white hover:bg-blue-700",
      disabledColor: "bg-blue-400/25 text-blue-500/40",
    };

    const secondary = {
      color:
        "border border-blue-500 text-blue-500 hover:bg-blue-400/25 hover:border-blue-400/25",
      disabledColor: "border border-blue-500/40 text-blue-500/40",
    };

    return getBtnColor(type === "primary" ? primary : secondary);
  };

  const dangerColor = () => {
    const primary = {
      color: "bg-red-500 text-white hover:bg-red-700",
      disabledColor: "bg-red-400/25 text-red-500/40",
    };

    const secondary = {
      color:
        "border border-red-500 text-red-500 hover:bg-red-400/25 hover:border-red-400/25",
      disabledColor: "border border-red-500/40 text-red-500/40",
    };

    return getBtnColor(type === "primary" ? primary : secondary);
  };

  const defaultColor = () => {
    const primary = {
      color:
        "bg-neutral-900 hover:bg-neutral-700 text-white dark:bg-blue-500 dark:hover:bg-blue-700",
      disabledColor:
        "bg-neutral-200 text-neutral-400 dark:bg-blue-400/25 dark:text-blue-400/40",
    };

    const secondary = {
      color:
        "border border-neutral-900 text-neutral-900 hover:bg-neutral-200 hover:border-neutral-200 " +
        "dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-400/25 dark:hover:border-blue-400/25",
      disabledColor:
        "border border-neutral-400 text-neutral-400 dark:border-blue-500/40 dark:text-blue-500/40",
    };

    return getBtnColor(type === "primary" ? primary : secondary);
  };

  const noneColor = () => {
    const btn = {
      color: "",
      disabledColor: "",
    };
    return getBtnColor(btn);
  };

  const getBtnColor = ({ color, disabledColor }) => {
    return `${
      disabled || loading ? disabledColor + " cursor-not-allowed" : color
    }`;
  };

  // const classNames: string | undefined = undefined;

  // const classes: string = `${classNames||""} ${btnColor()}`;

  // const btnClass=btnColor()

  console.log(btnColor())

  const classes = classNames(
    btnColor(),
    className
  );
  
  return (
    <button onClick={onClick} 
      className={classes}>
      {label}
    </button>
  );
};

export default Button;
