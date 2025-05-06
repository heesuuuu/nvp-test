"use client";
import React, { useState } from "react";
import "../../../scss/styles.scss";
import Navigate from "@/components/layout/navigate/Navigate";
import { ButtonDafult, NextBtn, PrevBtn } from "@/components/common/Button";

import { Button, MobileStepper, useTheme } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const questions = [
  {
    question: "아침에 눈 떴을 때 당신의 반응은?",
    answers: ["5분만 더...", "기상! 상쾌함", "알람 끔", "SNS 확인"],
  },
  {
    question: "아침 식사는?",
    answers: ["절대 안 먹음", "꼭 먹음", "시간 나면", "카페에서"],
  },
];

const TestMain = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleNextStep = () => {
    if (selectedAnswer !== null) {
      setSelectedAnswer(null);
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const currentQuestion = questions[activeStep];

  return (
    <div className="inner">
      <div className="gauge-bar"></div>

      <Navigate title="MBTI는 끝났다. 이제는 VBPI" step={`${activeStep + 1}/${questions.length}`} />

      {/* 질문 */}
      <div className="question-title">{currentQuestion.question}</div>

      {/* 답변 */}
      <div className="answer-wrapper">
        {currentQuestion.answers.map((text, idx) => (
          <ButtonDafult
            key={idx}
            backgroundColor={selectedAnswer === idx ? "var(--primary)" : "var(--white)"}
            color={selectedAnswer === idx ? "var(--white)" : "var(--black)"}
            onClick={() => setSelectedAnswer(idx)}
          >
            {text}
          </ButtonDafult>
        ))}
      </div>

      {/* Stepper */}
      <MobileStepper
        sx={{
          maxWidth: 400,
          flexGrow: 1,
          mt: 3,
          backgroundColor: "transparent",
        }}
        variant="progress"
        steps={questions.length}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNextStep}
            disabled={activeStep === questions.length - 1 || selectedAnswer === null}
          >
            Next
            {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />

      {/* 이전, 다음 버튼 */}
      <div className="prev-btn">
        <PrevBtn onClick={handleBack} />
        <NextBtn disabled={selectedAnswer === null} onClick={handleNextStep} />
      </div>
    </div>
  );
};

export default TestMain;
