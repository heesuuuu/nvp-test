"use client";
import React from "react";
import "../../../scss/styles.scss";
import Navigate from "@/components/layout/navigate/Navigate";

const NvpHome = () => {
    return (
        <div className="nvp-big-wrapper">
            <div className="inner">
                <Navigate title="Comming Soon" />
                <div className="nvp-wrapper">
                    <div>
                        <img
                            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Saluting%20Face.png"
                            alt="Saluting Face"
                            width="125"
                            height="125"
                        />
                    </div>
                    <div className="nvp-title">
                        눈 깜빡하면 돌아올게요 😉
                        <p> NVP 홈페이지는 2학기 출시 예정입니다!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NvpHome;
