import React from "react";
import Modal from "react-modal";
import { Button } from "../button/button";
import s from "./modal.module.scss";
import classNames from "classnames";

Modal.setAppElement("#root");

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    className?: string;
}

export const CustomModal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    className = "",
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel={title}
            className={classNames(
                s.modalContent,
                className
            )}
            overlayClassName={s.modalOverlay}
            closeTimeoutMS={200}
        >
            <div className={s.modalHeader}>
                <h2 className={s.modalTitle}>{title}</h2>
                <Button
                    className={s.modalClose}
                    onClick={onClose}
                >
                    x
                </Button>
            </div>

            <div className={s.modalBody}>{children}</div>
        </Modal>
    );
};
