"use client";
import React from "react";
import "../../../scss/styles.scss";
import Navigate from "@/components/layout/navigate/Navigate";
import { ButtonDafult, PrevBtn } from "@/components/common/Button";

const TestMain = () => {
    return (
        <>
            <div className="gauge-bar"></div>
            <div className="inner">
                <Navigate />

                {/* 테스트 질문 */}
                <div className="question-title">아침에 눈 떴을 때 당신의 반응은?</div>

                {/* 테스트 답변 */}
                <div className="answer-wrapper">
                    {[...Array(4)].map((_, idx) => (
                        <ButtonDafult key={idx} backgroundcolor="var(--white)" color="var(--black)">
                            “5분만 더…" 이불과 전쟁 중
                        </ButtonDafult>
                    ))}
                </div>

                {/*  이전,다음 버튼*/}
                <div className="prev-btn">
                    <PrevBtn />
                    <PrevBtn />
                </div>
            </div>
        </>
    );
};

export default TestMain;
