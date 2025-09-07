import React from "react";
import { routes } from "../../config/routes";
import { Link } from "react-router-dom";

interface AppLinkProps {
    to: keyof typeof routes;
    children: React.ReactNode;
    className?: string;
}

export const AppLink: React.FC<AppLinkProps> = ({
    to,
    children,
    className = "",
    ...props
}) => {
    return (
        <Link
            to={routes[to]}
            className={className}
            {...props}
        >
            {children}
        </Link>
    );
};
