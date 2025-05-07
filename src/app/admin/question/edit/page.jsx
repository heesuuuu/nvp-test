"use client";
import Navigate from "@/components/layout/navigate/Navigate";
import React, { useEffect, useRef, useState } from "react";
import "../../../../scss/styles.scss";
import { InputEdit } from "@/components/common/InputField";
import { ButtonCancel, ButtonEnroll } from "@/components/common/Button";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import api from "@/utils/axios";
import useQuestionStore from "@/store/questionStore";

const EditQuestionPage = () => {
    const router = useRouter();
    // const searchParams = useSearchParams();
    const questionData = useQuestionStore((state) => state.questionToEdit);
    const setQuestionToEdit = useQuestionStore((state) => state.setQuestionToEdit);
   
    const didRun = useRef(false)

    const handleUpdate = async () => {
        try {
            await api.put("/v1/admins/questions", questionData); // body에 전체 질문+답변 포함
            alert("수정이 완료되었습니다.");
            router.push("/admin/question");
        } catch (error) {
            console.error("질문 수정 실패", error);
        }
    };
    useEffect(() => {
        if (!questionData && !didRun.current) {
            didRun.current=true;
            alert("잘못된 접근입니다.");
            router.push("/admin/question");
        }
    }, [questionData, router]);
    if (!questionData) return null;

    const handleBack = () => {
        router.push("/admin/question");
    };

    return (
        <div className="inner">
            <Navigate title="Test 질문지 수정" isAdmin />
            <div className="test-edit-wrapper">
                <div className="test-title">
                    <span>{questionData.questionId}</span>

                    <input
                        type="text"
                        value={questionData.questionInfo}
                        onChange={(e) => setQuestionToEdit({ ...questionData, questionInfo: e.target.value })}
                        className="title-input"
                    />
                </div>
                <div className="answer">
                    {questionData.answers.map((answer, idx) => (
                        <div className="answer-edit-wrapper" key={answer.answerId}>
                            <div className="edit-position">{answer.result}</div>
                            <InputEdit
                                value={answer.answer}
                                onChange={(e) => {
                                    const updatedAnswers = [...questionData.answers];
                                    updatedAnswers[idx].answer = e.target.value;
                                    setQuestionToEdit({ ...questionData, answers: updatedAnswers });
                                }}
                                height="46px"
                                width="236px"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="test-button-wrapper">
                <ButtonCancel onClick={handleBack} background="var(--gray-20)" color="var(--white)">
                    취소
                </ButtonCancel>
                <ButtonEnroll onClick={handleUpdate}>수정하기</ButtonEnroll>
            </div>
        </div>
    );
};

export default EditQuestionPage;
