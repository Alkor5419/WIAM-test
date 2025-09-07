import React from "react";
import classNames from "classnames";
import s from "./input.module.scss";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label?: string;
}

export const Input: React.FC<InputProps> = ({
    error,
    label,
    className = "",
    id,
    ...props
}) => {
    const inputClass = classNames(s.input, className, {
        [s.inputError]: error,
    });

    return (
        <div className={s.inputGroup}>
            {label && (
                <label
                    htmlFor={id}
                    className={s.inputLabel}
                >
                    {label}
                </label>
            )}

            <input
                id={id}
                className={inputClass}
                {...props}
            />

            {error && (
                <span className={s.inputError}>
                    {error}
                </span>
            )}
        </div>
    );
};
