import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
    ProductCategory,
    WorkData,
} from "../../../entities/work/model/types";
import { Input } from "../../../shared/ui/input/input";
import { Select } from "../../../shared/ui/select/select";
import { Button } from "../../../shared/ui/button/button";
import { routes } from "../../../shared/config/routes";
import { useProductCategories } from "../lib/useProductCategories";

interface PlaceOfWorkFormProps {
    onSubmit: (data: WorkData) => void;
    isLoading?: boolean;
    onBack: () => void;
}

export const PlaceOfWorkForm: React.FC<
    PlaceOfWorkFormProps
> = ({ onSubmit, isLoading = false, onBack }) => {
    const navigate = useNavigate();
    const {
        categories,
        isLoading: categoriesLoading,
        error,
    } = useProductCategories();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<WorkData>({
        defaultValues: {
            workplace: "",
            address: "",
        },
    });

    const handleFormSubmit = (data: WorkData) => {
        onSubmit(data);
        navigate(routes.loanParameters);
    };

    const workplaceOptions = [
        {
            value: "",
            label: "Выберите место работы",
            disabled: true,
        },
        ...categories.map((option: ProductCategory) => ({
            value: option.id,
            label: option.category.name,
        })),
    ];
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div>
                <Select
                    id="workplace"
                    {...register("workplace", {
                        required: "Выберите место работы",
                    })}
                    options={workplaceOptions}
                    error={errors.workplace?.message}
                    disabled={categoriesLoading || !!error}
                />

                {categoriesLoading && (
                    <div className="loading-text">
                        Загрузка категорий...
                    </div>
                )}

                {error && (
                    <div className="error-text">
                        {error}
                    </div>
                )}
            </div>

            <div className="form-group">
                <Input
                    label="Адрес проживания *"
                    id="address"
                    type="text"
                    {...register("address", {
                        required:
                            "Адрес обязателен для заполнения",
                        minLength: {
                            value: 5,
                            message:
                                "Адрес должен содержать минимум 5 символов",
                        },
                    })}
                    placeholder="Введите ваш адрес проживания"
                    error={errors.address?.message}
                />
            </div>

            <div className="form-buttons">
                <Button
                    onClick={onBack}
                    disabled={isLoading}
                >
                    Назад
                </Button>

                <Button
                    disabled={
                        isLoading || categoriesLoading
                    }
                >
                    {isLoading ? "Загрузка..." : "Далее"}
                </Button>
            </div>
        </form>
    );
};
