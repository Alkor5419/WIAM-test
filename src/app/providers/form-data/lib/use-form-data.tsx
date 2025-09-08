import { useState, useEffect } from "react";
import { PersonalData } from "../../../../entities/user/model/types";
import { WorkData } from "../../../../entities/work/model/types";
import { LoanData } from "../../../../entities/loan/model/types";

interface FormData {
    personal: PersonalData | null;
    work: WorkData | null;
    loan: LoanData | null;
}

export const useFormData = () => {
    const [formData, setFormData] = useState<FormData>({
        personal: null,
        work: null,
        loan: null,
    });

    useEffect(() => {
        const personalData =
            localStorage.getItem("personalData");
        const workData = localStorage.getItem("workData");
        const loanData = localStorage.getItem("loanData");

        setFormData({
            personal: personalData
                ? JSON.parse(personalData)
                : null,
            work: workData ? JSON.parse(workData) : null,
            loan: loanData ? JSON.parse(loanData) : null,
        });
    }, []);

    const savePersonalData = (data: PersonalData) => {
        localStorage.setItem(
            "personalData",
            JSON.stringify(data)
        );
        setFormData((prev) => ({
            ...prev,
            personal: data,
        }));
    };

    const saveWorkData = (data: WorkData) => {
        localStorage.setItem(
            "workData",
            JSON.stringify(data)
        );
        setFormData((prev) => ({ ...prev, work: data }));
    };

    const saveLoanData = (data: LoanData) => {
        localStorage.setItem(
            "loanData",
            JSON.stringify(data)
        );
        setFormData((prev) => ({ ...prev, loan: data }));
    };

    const clearAllData = () => {
        localStorage.removeItem("personalData");
        localStorage.removeItem("workData");
        localStorage.removeItem("loanData");
        setFormData({
            personal: null,
            work: null,
            loan: null,
        });
    };

    return {
        formData,
        savePersonalData,
        saveWorkData,
        saveLoanData,
        clearAllData,
    };
};
