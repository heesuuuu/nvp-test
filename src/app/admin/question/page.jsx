"use client";
import { EditButton, NumberButton, ScrollButton } from "@/components/common/Button";
import React from "react";
import "../../../scss/styles.scss";
import Navigate from "@/components/layout/navigate/Navigate";

import { scrollToBottom, scrollToTop } from "@/utils/scroll";
import { useRouter } from "next/navigation";

const question = () => {
    const router = useRouter();
    const handlePage = () => {
        router.push("/admin/question/edit/");
    };

    return (
        <div className="question-manage-wrapper">
            <div className="inner">
                <Navigate title="Test 질문지 관리" isAdmin />
                <div>
                    <section className="num-wrapper">
                        {[...Array(10)].map((_, i) => (
                            <NumberButton
                                key={i + 1}
                                onClick={() => {
                                    const target = document.getElementById(`question-${i}`);
                                    if (target) {
                                        target.scrollIntoView({ behavior: "smooth", block: "center" });
                                    }
                                }}
                            >
                                {i + 1}
                            </NumberButton>
                        ))}
                    </section>
                    {[...Array(10)].map((_, qIndex) => (
                        <section key={qIndex} className="question-wrapper" id={`question-${qIndex}`}>
                            <div className="question-header">
                                <div className="admin-question-title">
                                    Q{qIndex + 1}. 아침에 눈을 떴을 때 당신의 반응은?
                                </div>
                                <EditButton onClick={handlePage} />
                            </div>

                            <div>
                                <div className="answer-wrapper">
                                    {[...Array(4)].map((_, aIndex) => (
                                        <div className="answer-title" key={aIndex}>
                                            <p>A1.</p>
                                            <div>오늘은 또 어쩌고 저쩌고</div>
                                            <div>position</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="answer-line"></div>
                            </div>
                        </section>
                    ))}
                </div>

                <div className="scroll-position">
                    <div className="scroll-wrapper">
                        <ScrollButton onClick={scrollToTop} />
                        <ScrollButton onClick={scrollToBottom} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default question;
