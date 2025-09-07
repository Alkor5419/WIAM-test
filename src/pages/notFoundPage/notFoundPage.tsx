import React from "react";
import { AppLink } from "../../shared/ui/link/appLink";

export const NotFoundPage: React.FC = () => {
    return (
        <div className="page">
            <h1>404 - Страница не найдена</h1>
            <p>
                Извините, запрашиваемая страница не
                существует.
            </p>
            <AppLink to="personalData">
                Вернуться на главную
            </AppLink>
        </div>
    );
};
