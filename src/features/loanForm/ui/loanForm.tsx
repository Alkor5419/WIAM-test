import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoanData } from "../../../entities/loan/model/types";
import { Slider } from "../../../shared/ui/slider/slider";
import { Button } from "../../../shared/ui/button/button";
import { CustomModal } from "../../../shared/ui/modal/modal";
import { loanApi } from "../../../entities/loan/api/loan-api";
import { useFormData } from "../../../app/providers/form-data/lib/use-form-data";
import { routes } from "../../../shared/config/routes";
import s from "./loanForm.module.scss";

interface LoanFormProps {
    onSubmit: (data: LoanData) => void;
    isLoading?: boolean;
    onBack: () => void;
}

export const LoanForm: React.FC<LoanFormProps> = ({
    onSubmit,
    isLoading = false,
    onBack,
}) => {
    const navigate = useNavigate();
    const { formData } = useFormData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<LoanData>({
        defaultValues: {
            loanAmount: 500,
            loanTerm: 20,
        },
    });

    const loanAmount = watch("loanAmount");
    const loanTerm = watch("loanTerm");

    const handleFormSubmit = async (data: LoanData) => {
        setIsSubmitting(true);
        try {
            onSubmit(data);

            const application = {
                title: `${formData.personal?.firstName} ${formData.personal?.lastName}`,
                amount: data.loanAmount,
                term: data.loanTerm,
            };

            await loanApi.submitLoanApplication(
                application
            );

            setIsModalOpen(true);
        } catch (error) {
            console.error(
                "Error submitting loan application:",
                error
            );
            alert("Произошла ошибка при отправке заявки");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        navigate(routes.personalData);
    };

    const formatCurrency = (value: number) => `$${value}`;
    const formatDays = (value: number) => `${value} дней`;

    return (
        <>
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className={s.loanForm}
            >
                <div className={s.formGroup}>
                    <Slider
                        label="Сумма займа"
                        value={loanAmount}
                        min={200}
                        max={1000}
                        step={100}
                        onChange={(value) =>
                            setValue("loanAmount", value)
                        }
                        error={errors.loanAmount?.message}
                        formatValue={formatCurrency}
                    />
                    <input
                        type="hidden"
                        {...register("loanAmount", {
                            required:
                                "Выберите сумму займа",
                            min: {
                                value: 200,
                                message:
                                    "Минимальная сумма: $200",
                            },
                            max: {
                                value: 1000,
                                message:
                                    "Максимальная сумма: $1000",
                            },
                        })}
                    />
                </div>

                <div className={s.formGroup}>
                    <Slider
                        label="Срок займа"
                        value={loanTerm}
                        min={10}
                        max={30}
                        step={1}
                        onChange={(value) =>
                            setValue("loanTerm", value)
                        }
                        error={errors.loanTerm?.message}
                        formatValue={formatDays}
                    />
                    <input
                        type="hidden"
                        {...register("loanTerm", {
                            required: "Выберите срок займа",
                            min: {
                                value: 10,
                                message:
                                    "Минимальный срок: 10 дней",
                            },
                            max: {
                                value: 30,
                                message:
                                    "Максимальный срок: 30 дней",
                            },
                        })}
                    />
                </div>

                <div className={s.formButtons}>
                    <Button
                        type="button"
                        onClick={onBack}
                        disabled={isSubmitting}
                        className="backButton"
                    >
                        Назад
                    </Button>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        isLoading={isSubmitting}
                        className="submitButton"
                    >
                        {isSubmitting
                            ? "Отправка..."
                            : "Подать заявку"}
                    </Button>
                </div>
            </form>

            <CustomModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                title="Заявка одобрена!"
            >
                <div className="loanApprovalMessage">
                    <p>
                        Поздравляем,{" "}
                        {formData.personal?.lastName}{" "}
                        {formData.personal?.firstName}. Вам
                        одобрено ${loanAmount} на {loanTerm}{" "}
                        дней.
                    </p>

                    <Button
                        onClick={handleModalClose}
                        className="modalCloseButton"
                    >
                        Закрыть
                    </Button>
                </div>
            </CustomModal>
        </>
    );
};
