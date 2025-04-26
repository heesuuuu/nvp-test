import React, { useEffect } from "react";
import "../../../scss/styles.scss";
import { ButtonCancel, ButtonDefault } from "@/components/common/Button";
import { InputPassword } from "@/components/common/InputField";

const Modal = ({ isOpen, onClose, onConfirm, title, txt, showPasswordInput = false }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isOpen) return null;
    return (
        <>
            <div className="modal-bg">
                <div className="modal-wrapper">
                    {/* {title && <div className="modal-title">{title}</div>} */}
                    {title && (
                        <div className="modal-title" style={{ whiteSpace: "pre-line", textAlign: "center" }}>
                            {title}
                        </div>
                    )}
                    {txt && (
                        <div className="modal-txt" style={{ whiteSpace: "pre-line", textAlign: "center" }}>
                            {txt}
                        </div>
                    )}
                    {showPasswordInput && (
                        <div className="modal-input-wrapper">
                            <div className="pw-title">비밀번호</div>
                            <InputPassword backgroundColor="#E5F5FA" />
                        </div>
                    )}

                    <div className="modal-btn-wrapper">
                        <ButtonCancel width="144px" background="var(--gary-20)" onClick={onClose}>
                            취소
                        </ButtonCancel>
                        <ButtonDefault width="144px" onClick={onConfirm}>
                            확인
                        </ButtonDefault>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
