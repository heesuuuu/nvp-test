"use client";
import React, { useEffect, useState } from "react";
import "../../../scss/styles.scss";
import Navigate from "@/components/layout/navigate/Navigate";
import { ButtonDafult } from "@/components/common/Button";

import { Button, MobileStepper, useTheme } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import api from "@/utils/axios";
import { useRouter } from "next/navigation";

const TestMain = () => {
    const router = useRouter();
    const theme = useTheme();
    const [answers, setAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const handleNextStep = (answerIdx) => {
        const selected = questions[activeStep].answers[answerIdx];
        setAnswers((prev) => [...prev, selected.answerId]);
        setSelectedAnswer(answerIdx);
        setTimeout(() => {
            setSelectedAnswer(null);

            if (activeStep === questions.length - 1) {
                const finalAnswerIds = [...answers, selected.answerId];
                // position 객체
                const position = {};
                finalAnswerIds.forEach((id) => {
                    for (const q of questions) {
                        const matched = q.answers.find((a) => a.answerId === id);
                        if (matched) {
                            const key = matched.result;

                            position[key] = (position[key] || 0) + 1;
                            break;
                        }
                    }
                });
                console.log("최종 선택된 answerId 배열:", finalAnswerIds);
                console.log("계산된 포지션 객체:", position);
                api.post("/v1/results/my", { position }).then((res) => {
                    console.log("서버 응답 데이터:", res.data);
                    const result = res.data.data;
                    sessionStorage.setItem("latestResult", JSON.stringify(result));
                    router.push(`/user/test/result?resultId=${result.resultId}`);
                });
            } else {
                setActiveStep((prev) => prev + 1);
            }
        }, 200);
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const currentQuestion = questions[activeStep];

    //답변 랜덤으로
    const shuffleArray = (array) => {
        return [...array].sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await api.get("/v1/questions");

                const shuffledQuestions = res.data.data.map((q) => ({
                    ...q,
                    answers: shuffleArray(q.answers),
                }));
                setQuestions(shuffledQuestions);
                console.log("질문 리스트", shuffledQuestions);
            } catch (error) {
                console.error("가져오기 실패", error);
            }
        };
        fetchQuestions();
    }, []);
    if (!currentQuestion) return null;

    return (
        <div className="inner">
            <Navigate title="MBTI는 끝났다. 이제는 VBPI" step={`${activeStep + 1}/${questions.length}`} />

            {/* 질문 */}
            <div className="question-title">{currentQuestion.questionInfo}</div>

            {/* 답변 */}
            <div className="answer-wrapper">
                {currentQuestion.answers.map((a, idx) => (
                    <ButtonDafult
                        key={a.answerId}
                        style={{
                            backgroundColor: selectedAnswer === idx ? "var(--primary)" : "var(--white)",
                            color: selectedAnswer === idx ? "var(--white)" : "var(--black)",
                        }}
                        onClick={() => handleNextStep(idx)}
                    >
                        {a.answer}
                    </ButtonDafult>
                ))}
            </div>

            {/* Stepper */}
            <MobileStepper
                sx={{
                    maxWidth: 500,
                    // flexGrow: 1,
                    padding: 0,
                    backgroundColor: "transparent",
                    "& .MuiLinearProgress-root": {
                        height: 4,
                        // borderRadius: 4,
                        backgroundColor: "var(--gray-20)", // 배경 선 색상
                    },
                    "& .MuiLinearProgress-bar": {
                        backgroundColor: "var(--primary)", // 진행된 선 색상
                    },
                }}
                variant="progress"
                steps={questions.length}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={() => handleNextStep(selectedAnswer)}
                        disabled={activeStep === questions.length - 1 || selectedAnswer === null}
                        sx={{
                            color: "var(--primary)",

                            "&:hover": {
                                backgroundColor: "rgb(97 173 196 / 22%)",
                                color: "var(--primary)",
                            },
                        }}
                    >
                        Next
                        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        sx={{
                            color: "var(--primary)",
                            "&:hover": {
                                backgroundColor: "rgb(97 173 196 / 22%)",
                                color: "var(--primary)",
                            },
                            "&disables": {
                                color: "rgba(0, 0, 0, 0.26)",
                            },
                        }}
                    >
                        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                    </Button>
                }
            />
        </div>
    );
};

export default TestMain;
