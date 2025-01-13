import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// import { useConfig } from "../ConfigProvider";
// import { CONTROL_SIZES, SIZES } from "../../utils/constant";
// import Spinner from "../Spinner";

export const Button = React.forwardRef((props, ref) => {
  const {
    children,
    size,
    color,
    shape,
    variant,
    icon,
    className,
    disabled,
    loading,
    showSpinnerOnLoading = true,
    ...rest
  } = props;

//   const { controlSize } = useConfig();

  const defaultClass = "button";
  const sizeIconClass = "inline-flex items-center justify-center";

  const splitedColor = color.split("-");

//   const buttonSize = size || controlSize;

  const sliptVariant = variant.split("-");

  const mVariant = sliptVariant[0] || "default";
  const type = sliptVariant[1] || "primary";

  const getButtonSize = () => {
    let sizeClass = "";
    switch (buttonSize) {
      case SIZES.LG:
        sizeClass = classNames(
          `h-${CONTROL_SIZES.lg}`,
          icon && !children
            ? `w-${CONTROL_SIZES.lg} ${sizeIconClass} text-2xl`
            : "px-8 py-2 text-base"
        );
        break;
      case SIZES.SM:
        sizeClass = classNames(
          `h-${CONTROL_SIZES.sm}`,
          icon && !children
            ? `w-${CONTROL_SIZES.sm} ${sizeIconClass} text-lg`
            : "px-3 py-2 text-sm"
        );
        break;
      case SIZES.XS:
        sizeClass = classNames(
          `h-${CONTROL_SIZES.xs}`,
          icon && !children
            ? `w-${CONTROL_SIZES.xs} ${sizeIconClass} text-base`
            : "px-3 py-1 text-xs"
        );
        break;
      case "none":
        sizeClass = classNames();
        break;
      default:
        sizeClass = classNames(
          `h-${CONTROL_SIZES.md}`,
          icon && !children
            ? `w-${CONTROL_SIZES.md} ${sizeIconClass} text-xl`
            : "px-8 py-2"
        );
        break;
    }
    return sizeClass;
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

  const classes = classNames(
    defaultClass,
    btnColor(),
    `radius-${shape}`,
    getButtonSize(),
    className
  );


  // const classNames: string | undefined = undefined;
  // const classes: string = `"${classNames||""} ${btnColor()}"`;

  // console.log(classes)

  const handleClick = (e) => {
    const { onClick } = props;
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const renderChildren = () => {
    if (loading && children) {
      return (
        <span className="flex items-center justify-center">
          {showSpinnerOnLoading && <Spinner enableTheme={false} className="mr-1" />}
          {children}
        </span>
      );
    }

    if (icon && !children && loading) {
      return <Spinner enableTheme={false} />;
    }

    if (icon && !children && !loading) {
      return <>{icon}</>;
    }

    if (icon && children && !loading) {
      return (
        <span className="flex items-center justify-center">
          <span className="text-lg">{icon}</span>
          <span className="ltr:ml-1 rtl:mr-1">{children}</span>
        </span>
      );
    }

    return <>{children}</>;
  };

  return (
    <button ref={ref} className={classes} {...rest} onClick={handleClick}>
      {renderChildren()}
    </button>
  );
});

Button.propTypes = {
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  shape: PropTypes.oneOf(["round", "circle", "none"]),
  className: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOf([SIZES.LG, SIZES.SM, SIZES.XS, SIZES.MD, "none"]),
  variant: PropTypes.string,
};

Button.defaultProps = {
  variant: "default-primary",
  shape: "round",
  loading: false,
  disabled: false,
  color: "",
};
