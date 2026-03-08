"use client";
import { EditButton, NumberButton, ScrollButton } from "@/components/common/Button";
import React, { useEffect, useState } from "react";
import "../../../scss/styles.scss";
import Navigate from "@/components/layout/navigate/Navigate";
import { scrollToBottom, scrollToTop } from "@/utils/scroll";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";
import { questionsApi } from "@/lib/storage";
import useQuestionStore from "@/store/questionStore";

const question = () => {
    const router = useRouter();
    const [questionsList, setQuestionsList] = useState([]);
    const [isOffline, setIsOffline] = useState(false);
    const setQuestionToEdit = useQuestionStore((state) => state.setQuestionToEdit);

    const handlePage = (question) => {
        setQuestionToEdit(question);
        router.push("/admin/question/edit");
    };

    const handleReset = () => {
        if (confirm("질문을 초기 데이터로 초기화하시겠습니까?")) {
            questionsApi.reset();
            setQuestionsList(questionsApi.getAll());
            alert("초기화 완료!");
        }
    };

    useEffect(() => {
        const adminQuestions = async () => {
            try {
                const res = await api.get("/v1/admins/questions");
                setQuestionsList(res.data.data);
                setIsOffline(false);
            } catch {
                // 서버 실패 시 → localStorage fallback
                setIsOffline(true);
                setQuestionsList(questionsApi.getAll());
            }
        };
        adminQuestions();
    }, []);

    return (
        <div className="question-manage-wrapper">
            <div className="inner">
                <Navigate title="Test 질문지 관리" isAdmin />
                {isOffline && (
                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "8px" }}>
                        <button
                            onClick={handleReset}
                            style={{
                                fontSize: "13px",
                                color: "var(--gray-40)",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            초기화
                        </button>
                    </div>
                )}
                <div>
                    <section className="num-wrapper">
                        {questionsList.map((_, i) => (
                            <NumberButton
                                key={i + 1}
                                onClick={() =>
                                    document
                                        .getElementById(`question-${i}`)
                                        ?.scrollIntoView({ behavior: "smooth", block: "center" })
                                }
                            >
                                {i + 1}
                            </NumberButton>
                        ))}
                    </section>
                    {questionsList.map((q, qIndex) => (
                        <section key={q.questionId} className="question-wrapper" id={`question-${qIndex}`}>
                            <div className="question-header">
                                <div className="admin-question-title">
                                    Q{qIndex + 1}. {q.questionInfo}
                                </div>
                                <EditButton onClick={() => handlePage(q)} />
                            </div>
                            <div>
                                <div className="answer-wrapper">
                                    {[...q.answers]
                                        .sort(
                                            (a, b) =>
                                                ["LEFT", "CENTER", "SETTER", "LIBERO"].indexOf(a.result) -
                                                ["LEFT", "CENTER", "SETTER", "LIBERO"].indexOf(b.result)
                                        )
                                        .map((a, aIndex) => (
                                            <div className="answer-title" key={aIndex}>
                                                <p>A{aIndex + 1}.</p>
                                                <div>{a.answer}</div>
                                                <div>{a.result}</div>
                                            </div>
                                        ))}
                                </div>
                                {qIndex !== questionsList.length - 1 && <div className="answer-line"></div>}
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
