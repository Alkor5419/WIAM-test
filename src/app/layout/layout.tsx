import React from "react";
import s from "./layout.module.scss";

interface LayoutProps {
    children: React.ReactNode;
}
export const Layout: React.FC<LayoutProps> = ({
    children,
}) => {
    return <div className={s.layout}>{children}</div>;
};
