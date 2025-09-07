import React from "react";
import { useCallback, useState } from "react";
import { Input, InputProps } from "../input/input";

interface PhoneInputProps
    extends Omit<InputProps, "onChange" | "value"> {
    value?: string;
    onChange?: (value: string) => void;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
    value = "",
    onChange,
    error,
    label,
    ...props
}) => {
    const formatPhoneValue = (rawValue: string): string => {
        const digits = rawValue.replace(/\D/g, "");
        let formattedValue = "";

        if (digits.length > 0) {
            formattedValue = digits[0];
        }

        if (digits.length > 1) {
            formattedValue += digits.substring(1, 4);
        }

        if (digits.length > 4) {
            formattedValue += " " + digits.substring(4, 7);
        }

        if (digits.length > 7) {
            formattedValue += " " + digits.substring(7, 10);
        }

        return formattedValue;
    };
    const [displayValue, setDisplayValue] = useState(
        formatPhoneValue(value)
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value;
            const digits = inputValue.replace(/\D/g, "");

            // Ограничиваем до 10 цифр (0 + 9 цифр)
            const limitedDigits = digits.slice(0, 10);
            const formattedValue =
                formatPhoneValue(limitedDigits);

            setDisplayValue(formattedValue);
            onChange?.(limitedDigits);
        },
        [onChange]
    );

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            const allowedKeys = [
                "Backspace",
                "Delete",
                "Tab",
                "Escape",
                "Enter",
                "ArrowLeft",
                "ArrowRight",
                "ArrowUp",
                "ArrowDown",
                "Home",
                "End",
            ];

            if (allowedKeys.includes(e.key)) {
                return;
            }
            // Запрещаем всё, кроме цифр
            if (!/^\d$/.test(e.key)) {
                e.preventDefault();
            }
        },
        []
    );
    return (
        <Input
            type="tel"
            value={displayValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="0___ ___ ___"
            error={error}
            label={label}
            maxLength={12} // 0XXX XXX XXX
            {...props}
        />
    );
};
