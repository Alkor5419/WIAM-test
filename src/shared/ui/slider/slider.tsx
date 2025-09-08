import React from "react";
import s from "./slider.module.scss";

interface SliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
    error?: string;
    formatValue?: (value: number) => string;
}

export const Slider: React.FC<SliderProps> = ({
    label,
    value,
    min,
    max,
    step,
    onChange,
    error,
    formatValue = (val) => val.toString(),
}) => {
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        onChange(Number(e.target.value));
    };

    return (
        <div className={s.sliderGroup}>
            <label className={s.sliderLabel}>
                {label}:{" "}
                <span className={s.sliderValue}>
                    {formatValue(value)}
                </span>
            </label>

            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
                className={s.slider}
            />

            <div className={s.sliderLimits}>
                <span>{formatValue(min)}</span>
                <span>{formatValue(max)}</span>
            </div>

            {error && (
                <span className={s.sliderError}>
                    {error}
                </span>
            )}
        </div>
    );
};
