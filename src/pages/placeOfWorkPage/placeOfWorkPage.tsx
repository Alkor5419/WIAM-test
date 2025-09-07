import React, { useState } from "react";
import { PlaceOfWorkForm } from "../../features/placeOfWorkForm/ui/placeOfWorkForm";
import { useNavigate } from "react-router-dom";
import { routes } from "../../shared/config/routes";
import { WorkData } from "../../entities/work/model/types";

export const PlaceOfWorkPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: WorkData) => {
        setIsLoading(true);
        try {
            localStorage.setItem(
                "workData",
                JSON.stringify(data)
            );
        } catch (error) {
            console.error("Error saving work data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        navigate(routes.personalData);
    };
    return (
        <>
            <PlaceOfWorkForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                onBack={handleBack}
            />
        </>
    );
};
