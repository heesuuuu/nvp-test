import React from "react";
import "../../../scss/styles.scss";
import { ButtonDefault } from "@/components/common/Button";
import { InputPassword } from "@/components/common/InputField";

const Modal = ({ isOpen, onClose, onConfirm, title, txt, showPasswordInput = false }) => {
    if (!isOpen) return null;
    return (
        <>
            <div className="modal-bg">
                <div className="modal-wrapper">
                    {title && <div className="modal-title">{title}</div>}
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
                        <ButtonDefault width="144px" bgColor="var(--gray-30)" onClick={onClose}>
                            취소
                        </ButtonDefault>
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
