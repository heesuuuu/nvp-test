"use client";
import Navigate from "@/components/layout/navigate/Navigate";
import React from "react";
import "../../../../scss/styles.scss";
import InputField, { InputEdit } from "@/components/common/InputField";
import { ButtonCancel, ButtonEnroll } from "@/components/common/Button";
import { useRouter } from "next/navigation";

const edit = () => {
    const router = useRouter();
    const handlePage = () => {
        router.push("/admin/question");
    };
    return (
        <div className="inner">
            <Navigate title="Test 질문지 수정" isAdmin />
            <div className="test-edit-wrapper">
                <div className="test-title">
                    <span>1.</span> <input type="text" defaultValue="아침에 " className="title-input" />
                </div>
                <div className="answer">
                    <div className="answer-wrapper">
                        <div className="edit-position">리베로</div>
                        <InputEdit defaultValue="5분만 더.." height="46px" />
                    </div>
                    <div className="answer-wrapper">
                        <div className="edit-position">레프트</div>
                        <InputEdit defaultValue="오늘은 또 뭘 해볼까" height="46px" />
                    </div>
                    <div className="answer-wrapper">
                        <div className="edit-position">센터</div>
                        <InputEdit defaultValue="5분만 더.." height="46px" />
                    </div>
                    <div className="answer-wrapper">
                        <div className="edit-position">세터</div>
                        <InputEdit defaultValue="오늘은 또F" height="46px" />
                    </div>
                </div>
            </div>
            <div className="test-button-wrapper">
                <ButtonCancel onClick={handlePage} background="var(--gray-20)" color="var(--white)" width="166px">
                    취소
                </ButtonCancel>
                <ButtonEnroll width="166px">수정하기</ButtonEnroll>
            </div>
        </div>
    );
};

export default edit;
