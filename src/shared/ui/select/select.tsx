import React from "react";
import s from "./select.module.scss";
import classNames from "classnames";

interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface SelectProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    error?: string;
    options: SelectOption[];
}

export const Select: React.FC<SelectProps> = ({
    error,
    options,
    className = "",
    ...props
}) => {
    const selectClass = classNames(s.select, {
        [s.selectErrorOption]: error,
    });

    return (
        <div className={className}>
            <select className={selectClass} {...props}>
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <span className={s.selectError}>
                    {error}
                </span>
            )}
        </div>
    );
};
