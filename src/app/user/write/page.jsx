"use client";
import { ButtonCancel, ButtonEnroll } from "@/components/common/Button";
import { InputDefault, InputPassword, InputTextarea } from "@/components/common/InputField";
import Modal from "@/components/layout/modal/page";
import Navigate from "@/components/layout/navigate/Navigate";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";
import { guestbooksApi } from "@/lib/storage";

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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isNameValid = guestBookNickname.trim().length <= 10;
    const isContentValid = guestBookInfo.trim().length >= 4 && guestBookInfo.trim().length <= 70;
    const isPasswordValid = guestBookPassword.trim().length >= 4 && guestBookPassword.trim().length <= 8;
    const isFormValid = isNameValid && isContentValid && passwordValid;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        const finalNickname = guestBookNickname.trim() === "" ? "익명" : guestBookNickname;
        const postData = { guestBookNickname: finalNickname, guestBookInfo, guestBookPassword };

        try {
            const res = await api.post("/v1/guestbooks", postData);
            console.log("방명록 등록 성공", res.data);
            router.push("/user/guestbook");
        } catch {
            // 서버 실패 시 → localStorage fallback
            guestbooksApi.add(postData);
            router.push("/user/guestbook");
        }
    };

    const handleConfirmCancel = () => {
        setGuestBookNickname("");
        setGuestBookInfo("");
        setGuestBookPassword("");
        setIsModalOpen(false);
        router.push("/user/guestbook");
    };

    return (
        <div className="write-bg-wrapper">
            <div className="inner">
                <Navigate title="방명록 작성" />
                <section className="write-wrapper">
                    <div className="write-title">
                        <p>
                            이름 <span className="anonymity"> 미입력시 익명으로 등록됩니다.</span>
                        </p>
                        <InputDefault
                            placeholder="이름을 입력해 주세요. (특수문자 제외, 10자 이내)"
                            value={guestBookNickname}
                            onChange={(e) => setGuestBookNickname(exception(e.target.value))}
                            onBlur={() => setNameTouched(true)}
                        />
                        {!isNameValid && nameTouched && (
                            <p className="error">이름은 특수문자 제외, 1~10자 이내로 입력해주세요.</p>
                        )}
                    </div>
                    <div className="write-title">
                        <p>
                            <span className="required">*</span> 내용
                        </p>
                        <InputTextarea
                            placeholder={"글을 작성해 주세요\n(4 ~ 70자 이내)"}
                            value={guestBookInfo}
                            onChange={(e) => setGuestBookInfo(e.target.value)}
                            onBlur={() => setContentTouched(true)}
                            height="145px"
                        />
                        {!isContentValid && contentTouched && (
                            <p className="error">내용은 4~70자 이내로 작성해 주세요.</p>
                        )}
                        <p className="check">제출 이후 수정은 어렵기 때문에, 다시 한 번 확인해 주세요!</p>
                    </div>
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
                            <p className="error">비밀번호는 4자 이상 8자 이내로 입력해 주세요.</p>
                        )}
                        <p className="check">방명록 삭제 시 비밀번호가 일치해야 합니다.</p>
                    </div>
                </section>
                <section className="write-button">
                    <ButtonEnroll onClick={handleSubmit} disabled={!isFormValid}>
                        등록하기
                    </ButtonEnroll>
                    <ButtonCancel onClick={() => setIsModalOpen(true)}>취소</ButtonCancel>
                </section>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmCancel}
                title="작성중인 방명록을 취소 하시겠습니까?"
                txt="작성중인 내용은 저장되지 않습니다."
                className="cancel-modal"
            />
        </div>
    );
};

export default Write;
