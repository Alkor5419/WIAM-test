import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../shared/ui/button/button";
import { useFormData } from "../../app/providers/form-data/lib/use-form-data";
import { routes } from "../../shared/config/routes";
import { LoanForm } from "../../features/loanForm/ui/loanForm";
import s from "./loanParametersPage.module.scss";
import { LoanData } from "../../entities/loan/model/types";

export const LoanParametersPage: React.FC = () => {
    const navigate = useNavigate();
    const { saveLoanData, formData } = useFormData();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: LoanData) => {
        setIsLoading(true);
        try {
            saveLoanData(data);
        } catch (error) {
            console.error("Error saving loan data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        navigate(routes.placeOfWork);
    };

    if (!formData.personal || !formData.work) {
        return (
            <div className={s.pageContainer}>
                <h1>Ошибка</h1>
                <p>
                    Пожалуйста, заполните сначала предыдущие
                    формы
                </p>
                <Button
                    onClick={() =>
                        navigate(routes.personalData)
                    }
                >
                    Вернуться к первой форме
                </Button>
            </div>
        );
    }

    return (
        <div className={s.pageContainer}>
            <h1>Параметры займа</h1>
            <p className={s.pageSubtitle}>
                Выберите сумму и срок займа
            </p>

            <LoanForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                onBack={handleBack}
            />
        </div>
    );
};
