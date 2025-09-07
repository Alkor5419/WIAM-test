import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../shared/config/routes";
import { PersonalData } from "../../../entities/user/model/types";
import { Input } from "../../../shared/ui/input/input";
import { Select } from "../../../shared/ui/select/select";
import { Button } from "../../../shared/ui/button/button";
import { PhoneInput } from "../../../shared/ui/phoneInput/phoneInput";
import s from "./personalDataForm.module.scss";

interface PersonalDataFormProps {
    onSubmit: (data: PersonalData) => void;
    isLoading?: boolean;
}

export const PersonalDataForm: React.FC<
    PersonalDataFormProps
> = ({ onSubmit, isLoading = false }) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        trigger,
    } = useForm<PersonalData>({
        defaultValues: {
            phone: "",
            firstName: "",
            lastName: "",
            gender: "",
        },
    });

    const handleFormSubmit = (data: PersonalData) => {
        onSubmit(data);
        navigate(routes.placeOfWork);
    };
    const handlePhoneChange = (phoneDigits: string) => {
        setValue("phone", phoneDigits, {
            shouldValidate: true,
            shouldDirty: true,
        });

        trigger("phone");
    };
    const genderOptions = [
        {
            value: "",
            label: "Выберите пол",
            disabled: true,
        },
        { value: "male", label: "Мужской" },
        { value: "female", label: "Женский" },
    ];

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div>
                <PhoneInput
                    label="Телефон *"
                    onChange={handlePhoneChange}
                    error={errors.phone?.message}
                />
                <input
                    type="hidden"
                    {...register("phone", {
                        required:
                            "Телефон обязателен для заполнения",
                        validate: (value) =>
                            value?.length === 10 ||
                            "Телефон должен содержать 10 цифр",
                    })}
                />
            </div>
            <Input
                label="Имя *"
                id="firstName"
                type="text"
                {...register("firstName", {
                    required:
                        "Имя обязательно для заполнения",
                    minLength: {
                        value: 2,
                        message:
                            "Имя должно содержать минимум 2 символа",
                    },
                    pattern: {
                        value: /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/,
                        message:
                            "Имя может содержать только буквы",
                    },
                })}
                placeholder="Введите ваше имя"
                error={errors.firstName?.message}
            />

            <Input
                label=" Фамилия *"
                id="lastName"
                type="text"
                {...register("lastName", {
                    required:
                        "Фамилия обязательна для заполнения",
                    minLength: {
                        value: 2,
                        message:
                            "Фамилия должна содержать минимум 2 символа",
                    },
                    pattern: {
                        value: /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/,
                        message:
                            "Фамилия может содержать только буквы",
                    },
                })}
                placeholder="Введите вашу фамилию"
                error={errors.lastName?.message}
            />

            <Select
                id="gender"
                {...register("gender", {
                    required: "Выберите пол",
                    validate: (value) =>
                        value !== "" || "Выберите пол",
                })}
                options={genderOptions}
                error={errors.gender?.message}
                className={s.select}
            />

            <Button
                type="submit"
                disabled={isLoading}
                className={s.submitButton}
            >
                {isLoading ? "Загрузка..." : "Далее"}
            </Button>
        </form>
    );
};
