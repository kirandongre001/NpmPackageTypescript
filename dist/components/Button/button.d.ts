import React from 'react';
interface ButtonProps {
    onClick?: () => void;
    label: string;
    className: string;
    variant: string;
    disabled: boolean;
    loading: boolean;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
