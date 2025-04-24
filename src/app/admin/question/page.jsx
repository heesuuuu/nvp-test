'use client";';
import { EditButton, NumberButton } from "@/components/common/Button";
import React from "react";
import "../../../scss/styles.scss";
import Navigate from "@/components/layout/navigate/Navigate";

const question = () => {
    return (
        <div className="question-manage-wrapper">
            <div className="inner">
                <Navigate />
                <div>
                    <section className="num-wrapper">
                        {[...Array(10)].map((_, i) => (
                            <NumberButton key={i + 1}>{i + 1}</NumberButton>
                        ))}
                    </section>
                    {[...Array(10)].map((_, qIndex) => (
                        <section className="question-wrapper">
                            <div className="question-header">
                                <div className="admin-question-title">Q1. 아침에 눈을 떴을 때 당신의 반응은?</div>
                                <EditButton />
                            </div>

                            <div key={qIndex}>
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
            </div>
        </div>
    );
};

export default question;
