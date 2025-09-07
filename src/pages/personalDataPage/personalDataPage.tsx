import React, { useState } from "react";
import { PersonalDataForm } from "../../features/personalDataForm/ui/personalDataForm";
import { PersonalData } from "../../entities/user/model/types";

export const PersonalDataPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: PersonalData) => {
        setIsLoading(true);
        try {
            localStorage.setItem(
                "personalData",
                JSON.stringify(data)
            );
        } catch (error) {
            console.error(
                "Error saving personal data:",
                error
            );
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <PersonalDataForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </>
    );
};
