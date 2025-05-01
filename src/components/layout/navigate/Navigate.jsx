"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "../../../scss/styles.scss";

const Navigate = ({ title, step, isAdmin }) => {
    const router = useRouter();
    const [isClicked, setIsClicked] = useState(false);
    const onClickBtn = () => {
        setIsClicked(true);
        router.back();
    };
    return (
        <div className={`navigate ${isAdmin ? "admin" : ""}`}>
            <button onClick={onClickBtn}>
                <svg width="9" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8 1L1.57315 7.88591C1.25041 8.2317 1.25041 8.7683 1.57315 9.11409L8 16"
                        stroke={isClicked ? "var(--blue-200)" : "var(--blue-100)"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>
            </button>
            <div className="navigate-wrapper">
                {isAdmin ? (
                    <div className="admin-title">
                        <div className="admin-label">[관리자]</div>
                        <div className="admin-text">{title}</div>
                    </div>
                ) : (
                    <div>{title}</div>
                )}
                {step && <div>{step}</div>}
            </div>
        </div>
    );
};

export default Navigate;
