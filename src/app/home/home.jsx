"use client";
import React from "react";
import { useRouter } from "next/navigation";
import "../../scss/styles.scss";
import { ButtonDefault } from "@/components/common/Button";

const Home = () => {
    const router = useRouter();

    const handleStart = () => {
        router.push("/guestbook/test");
    };

    return (
        <div className="homeWrapper">
            <div className="homeContent">
                <div>
                    <img src="/images/Items/LogoBall.svg" alt="NVP 배구공 로고" className="nvp-ball" />
                    <div className="title">
                        <p>성격으로 알아보는</p>
                        <div className="big-title">
                            <p>배구 포지션 테스트</p>
                        </div>
                    </div>
                </div>
                <div className="position">
                    <img src="/images/Position/Setter.svg" alt="" />
                    <img src="/images/Position/MiddleBlocker.svg" alt="" />
                    <img src="/images/Position/LeftRight.svg" alt="" />
                    <img src="/images/Position/Libero.svg" alt="" />
                </div>

                <div className="start-btn-wrapper">
                    <ButtonDefault onClick={handleStart} style={{ fontSize: "20px" }} className="start-button">
                        테스트 시작하기
                    </ButtonDefault>
                </div>
            </div>
        </div>
    );
};

export default Home;
