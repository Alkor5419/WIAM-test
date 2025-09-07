import React from "react";
import s from "./button.module.scss";
import classNames from "classnames";

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
}
export const Button: React.FC<ButtonProps> = ({
    isLoading = false,
    children,
    className = "",
    disabled,
    ...props
}) => {
    return (
        <button
            className={classNames(s.btn, className)}
            disabled={disabled || isLoading}
            {...props}
        >
            <span className={s.btnContent}>{children}</span>
        </button>
    );
};
