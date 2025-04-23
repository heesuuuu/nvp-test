"use client";

import { ButtonCancel, ButtonDefault } from "@/components/common/Button";
import { InputDefault, InputPassword, InputTextarea } from "@/components/common/InputField";
import Modal from "@/components/layout/modal/page";
import Navigate from "@/components/layout/navigate/Navigate";
import React, { useEffect, useState } from "react";

const Write = () => {
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        if (name.trim() && content.trim() && password.trim()) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [name, content, password]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) return;
        console.log("방명록을 제출했습니다!", { name, content, password });
    };

    return (
        <div className="write-bg-wrapper">
            <div className="inner">
                <Navigate />
                <section className="write-wrapper">
                    <div className="write-title">
                        <p>
                            <span className="required">*</span> 이름
                        </p>
                        <InputDefault
                            placeholder="제목을 입력해 주세요. (10자 이내)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="write-title">
                        <p>
                            <span className="required">*</span>내용
                        </p>
                        <InputTextarea
                            placeholder="글을 작성해 주세요 (4글자 이상)"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            height="225px"
                        />
                        <p className="check">제출 이후 수정은 어렵기 때문에, 다시 한 번 확인해 주세요!</p>
                    </div>
                    <div className="write-title">
                        <p>
                            <span className="required">*</span> 비밀번호
                        </p>
                        <InputPassword
                            placeholder="비밀번호를 입력해 주세요. (4자 이하)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <p className="check">방명록 삭제시 비밀번호가 일치해야 됩니다.</p>
                    </div>
                </section>
                <section className="write-button">
                    <ButtonDefault onClick={handleSubmit} disabled={!isValid}>
                        등록하기
                    </ButtonDefault>
                    <ButtonCancel onClick={openModal}>취소</ButtonCancel>
                </section>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} title="취소 모달 창" className="cancel-modal"></Modal>
        </div>
    );
};

export default Write;
