"use client";

import { ButtonCancel, ButtonDefault } from "@/components/common/Button";
import { InputDefault, InputPassword, InputTextarea } from "@/components/common/InputField";
import Modal from "@/components/layout/modal/page";
import Navigate from "@/components/layout/navigate/Navigate";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Write = () => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [password, setPassword] = useState("");

    const [nameError, setNameError] = useState("");
    const [contentError, setContentError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isValid, setIsValid] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleValidation = () => {
        let valid = true;

        if (!name.trim()) {
            setNameError("이름을 입력해 주세요.");
            valid = false;
        } else if (name.length > 10) {
            setNameError("이름은 10자 이내로 입력해 주세요.");
            valid = false;
        } else {
            setNameError("");
        }

        if (!content.trim()) {
            setContentError("내용을 입력해 주세요.");
            valid = false;
        } else if (content.length < 4 || content.length > 70) {
            setContentError("내용은 4자 이상 70자 이내로 입력해 주세요.");
            valid = false;
        } else {
            setContentError("");
        }

        if (!password.trim()) {
            setPasswordError("비밀번호를 입력해 주세요.");
            valid = false;
        } else if (password.length <= 4 || password.length > 8) {
            setPasswordError("비밀번호는 최소 4자 이상 8자 이내입니다.");
            valid = false;
        } else {
            setPasswordError("");
        }

        setIsValid(valid);
    };

    useEffect(() => {
        handleValidation();
    }, [name, content, password]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) return;
        console.log("방명록 제출!", { name, content, password });
        // 여기에서 등록 처리 로직 추가 가능
    };

    const handleConfirmCancel = () => {
        setName("");
        setContent("");
        setPassword("");
        closeModal();
        router.push("/user/guestbook");
    };

    return (
        <div className="write-bg-wrapper">
            <div className="inner">
                <Navigate />
                <section className="write-wrapper">
                    {/* 이름 입력 */}
                    <div className="write-title">
                        <p>
                            <span className="required">*</span> 이름
                        </p>
                        <InputDefault
                            placeholder="이름을 입력해 주세요. (10자 이내)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {nameError && <p className="error">{nameError}</p>}
                    </div>

                    {/* 내용 입력 */}
                    <div className="write-title">
                        <p>
                            <span className="required">*</span> 내용
                        </p>
                        <InputTextarea
                            placeholder="글을 작성해 주세요 
                            (4자이상 70자 이내)"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            height="225px"
                        />
                        {contentError && <p className="error">{contentError}</p>}
                        <p className="check">제출 이후 수정은 어렵기 때문에, 다시 한 번 확인해 주세요!</p>
                    </div>

                    {/* 비밀번호 입력 */}
                    <div className="write-title">
                        <p>
                            <span className="required">*</span> 비밀번호
                        </p>
                        <InputPassword
                            placeholder="비밀번호를 입력해 주세요. (4자 이상 8자 이내)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <p className="error">{passwordError}</p>}
                        <p className="check">방명록 삭제 시 비밀번호가 일치해야 합니다.</p>
                    </div>
                </section>

                {/* 버튼 영역 */}
                <section className="write-button">
                    <ButtonDefault onClick={handleSubmit} disabled={!isValid}>
                        등록하기
                    </ButtonDefault>
                    <ButtonCancel onClick={openModal}>취소</ButtonCancel>
                </section>
            </div>

            {/* 취소 모달 */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleConfirmCancel}
                title="취소 모달 창"
                className="cancel-modal"
            />
        </div>
    );
};

export default Write;
