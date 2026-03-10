"use client";
import React, { useEffect, useState } from "react";
import "../../../scss/styles.scss";
import Navigate from "@/components/layout/navigate/Navigate";
import { ButtonDafult } from "@/components/common/Button";
import { Button, MobileStepper, useTheme } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import api from "@/utils/axios";
import { useRouter } from "next/navigation";
import { questionsApi, resultsApi } from "@/lib/storage";
import { buildResultData } from "@/lib/positionData";

const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

const TestMain = () => {
    const router = useRouter();
    const theme = useTheme();
    const [answers, setAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await api.get("/v1/questions");
                const shuffled = shuffleArray(res.data.data).map((q) => ({
                    ...q,
                    answers: shuffleArray(q.answers),
                }));
                setQuestions(shuffled);
            } catch {
                // 서버 실패 시 → localStorage(mockData) fallback
                const raw = questionsApi.getAll();
                setQuestions(shuffleArray(raw).map((q) => ({ ...q, answers: shuffleArray(q.answers) })));
            }
        };
        fetchQuestions();
    }, []);

    const calcPosition = (finalAnswerIds, qs) => {
        const position = {};
        finalAnswerIds.forEach((id) => {
            for (const q of qs) {
                const matched = q.answers.find((a) => a.answerId === id);
                if (matched) {
                    position[matched.result] = (position[matched.result] || 0) + 1;
                    break;
                }
            }
        });
        return position;
    };

    const handleNextStep = (answerIdx) => {
        const selected = questions[activeStep].answers[answerIdx];
        setSelectedAnswer(answerIdx);

        const newAnswers = [...answers];
        newAnswers[activeStep] = selected.answerId;
        setAnswers(newAnswers);

        const updatedSelected = [...selectedAnswers];
        updatedSelected[activeStep] = answerIdx;
        setSelectedAnswers(updatedSelected);

        setTimeout(async () => {
            setSelectedAnswer(null);

            if (activeStep === questions.length - 1) {
                const position = calcPosition(newAnswers, questions);

                try {
                    // 서버에 결과 저장 시도
                    const res = await api.post("/v1/results/my", { position });
                    const result = res.data.data;
                    sessionStorage.setItem("latestResult", JSON.stringify(result));
                    router.push(`/user/test/result?resultId=${result.resultId}`);
                } catch {
                    // 서버 실패 시 → localStorage fallback
                    const result = resultsApi.save(position, buildResultData);
                    sessionStorage.setItem("latestResult", JSON.stringify(result));
                    router.push(`/user/test/result?resultId=${result.resultId}`);
                }
            } else {
                setActiveStep((prev) => prev + 1);
            }
        }, 200);
    };

    const handleBack = () => setActiveStep((prev) => prev - 1);
    const currentQuestion = questions[activeStep];
    if (!currentQuestion) return null;

    return (
        <div className="inner">
            <Navigate title="MBTI는 끝났다. 이제는 VBPI" step={`${activeStep + 1}/${questions.length}`} />
            <div className="question-title">{currentQuestion.questionInfo}</div>
            <div className="answer-wrapper">
                {currentQuestion.answers.map((a, idx) => (
                    <ButtonDafult
                        key={a.answerId}
                        style={{
                            backgroundColor:
                                selectedAnswer === idx || selectedAnswers[activeStep] === idx
                                    ? "var(--primary)"
                                    : "var(--white)",
                            color:
                                selectedAnswer === idx || selectedAnswers[activeStep] === idx
                                    ? "var(--white)"
                                    : "var(--black)",
                        }}
                        onClick={() => handleNextStep(idx)}
                    >
                        {a.answer}
                    </ButtonDafult>
                ))}
            </div>
            <MobileStepper
                sx={{
                    maxWidth: 500,
                    padding: 0,
                    backgroundColor: "transparent",
                    "& .MuiLinearProgress-root": { height: 4, backgroundColor: "var(--gray-20)" },
                    "& .MuiLinearProgress-bar": { backgroundColor: "var(--primary)" },
                }}
                variant="progress"
                steps={questions.length}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={() => handleNextStep(selectedAnswers[activeStep])}
                        disabled={selectedAnswers[activeStep] == null}
                        sx={{
                            color: "var(--primary)",
                            "&:hover": { backgroundColor: "rgb(97 173 196 / 22%)", color: "var(--primary)" },
                        }}
                    >
                        Next {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        sx={{
                            color: "var(--primary)",
                            "&:hover": { backgroundColor: "rgb(97 173 196 / 22%)", color: "var(--primary)" },
                            "&disabled": { color: "rgba(0, 0, 0, 0.26)" },
                        }}
                    >
                        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />} Back
                    </Button>
                }
            />
        </div>
    );
};

export default TestMain;
