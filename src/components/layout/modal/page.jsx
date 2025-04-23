import React from "react";
import "../../../scss/styles.scss";
import { ButtonDefault } from "@/components/common/Button";

const Modal = ({ isOpen, onClose, onConfirm}) => {
    if (!isOpen) return null;
    return (
        <>
            <div className="modal-bg">
                <div className="modal-wrapper">
                    <div className="modal-title">작성중인 방명록을 취소 하시겠습니까?</div>
                    <div className="modal-txt">작성중인 내용이 삭제 됩니다.</div>

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
