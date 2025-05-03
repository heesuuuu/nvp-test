"use client";

import { ButtonCancel, ButtonEnroll } from "@/components/common/Button";
import { InputDefault, InputPassword, InputTextarea } from "@/components/common/InputField";
import Modal from "@/components/layout/modal/page";
import Navigate from "@/components/layout/navigate/Navigate";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Write = () => {
    const router = useRouter();

    const exception = (value) => value.replace(/[!@#$%^&*_-]/g, "");

    const [guestBookNickname, setGuestBookNickname] = useState("");
    const [guestBookInfo, setGuestBookInfo] = useState("");
    const [guestBookPassword, setGuestBookPassword] = useState("");
    const [passwordValid, setPasswordValid] = useState(false);

    const [nameTouched, setNameTouched] = useState(false);
    const [contentTouched, setContentTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);

    const isNameValid = guestBookNickname.trim().length > 0 && guestBookNickname.trim().length <= 10;
    const isContentValid = guestBookInfo.trim().length >= 4 && guestBookInfo.trim().length <= 70;
    const isPasswordValid = guestBookPassword.trim().length >= 4 && guestBookPassword.trim().length <= 8;
    const isFormValid = isNameValid && isContentValid && passwordValid;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;
        try {
            const response = await axios.post("/api/guestbooks", {
                guestBookNickname,
                guestBookInfo,
                guestBookPassword,
            });
            console.log("방명록 등록 성공", response.data);
            router.push("/user/guestbook");

        } catch (error) {
            console.log("방명록 저장 실패", error);
            if (error.response) {
                console.log("서버 응답 오류:", error.response.data);
            } else {
                console.log("네트워크 오류 또는 서버 연결 실패:", error.message);
            }
        }

        console.log("방명록 제출!", { guestBookNickname, guestBookInfo, guestBookPassword });
        router.push("/user/guestbook");
    };

    const handleConfirmCancel = () => {
        setGuestBookNickname("");
        setGuestBookInfo("");
        setGuestBookPassword("");
        closeModal();
        router.push("/user/guestbook");
    };

    return (
        <div className="write-bg-wrapper">
            <div className="inner">
                <Navigate title="방명록 작성" />
                <section className="write-wrapper">
                    {/* 이름 입력 */}
                    <div className="write-title">
                        <p>
                            <span className="required">*</span> 이름
                        </p>
                        <InputDefault
                            placeholder="이름을 입력해 주세요. (특수문자 제외, 10자 이내)"
                            value={guestBookNickname}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                const filtered = exception(inputValue);
                                setGuestBookNickname(filtered);
                            }}
                            onBlur={() => setNameTouched(true)}
                        />

                        {!isNameValid && nameTouched && (
                            <p className="error">이름은 특수문제 제외, 1~10자 이내로 입력해주세요.</p>
                        )}
                    </div>

                    {/* 내용 입력 */}
                    <div className="write-title">
                        <p>
                            <span className="required">*</span> 내용
                        </p>
                        <InputTextarea
                            placeholder="글을 작성해 주세요 
                            (4 ~ 70자 이내)"
                            value={guestBookInfo}
                            onChange={(e) => setGuestBookInfo(e.target.value)}
                            onBlur={() => setContentTouched(true)}
                            height="225px"
                        />

                        {!isContentValid && contentTouched && (
                            <p className="error">내용은 4~7자이내로 작성해 주세요.</p>
                        )}
                        <p className="check">제출 이후 수정은 어렵기 때문에, 다시 한 번 확인해 주세요!</p>
                    </div>

                    {/* 비밀번호 입력 */}
                    <div className="write-title">
                        <p>
                            <span className="required">*</span> 비밀번호
                        </p>
                        <InputPassword
                            placeholder="비밀번호를 입력해 주세요. (4 ~ 8자 이내)"
                            value={guestBookPassword}
                            onChange={(e) => setGuestBookPassword(e.target.value)}
                            onBlur={() => setPasswordTouched(true)}
                            onValidChange={(isValid) => setPasswordValid(isValid)}
                        />

                        {!isPasswordValid && passwordTouched && (
                            <p className="error">비밀번호는 4자이상 8자이내로 입력해 주세요.</p>
                        )}
                        <p className="check">방명록 삭제 시 비밀번호가 일치해야 합니다.</p>
                    </div>
                </section>

                {/* 버튼 영역 */}
                <section className="write-button">
                    <ButtonEnroll onClick={handleSubmit} disabled={!isFormValid}>
                        등록하기
                    </ButtonEnroll>
                    <ButtonCancel onClick={openModal}>취소</ButtonCancel>
                </section>
            </div>

            {/* 취소 모달 */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleConfirmCancel}
                title="작성중인 방명록을 취소 하시겠습니까?"
                txt=" 작성중인 내용은 저장되지 않습니다."
                className="cancel-modal"
            />
        </div>
    );
};

export default Write;
