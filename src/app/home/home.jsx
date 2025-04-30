"use client";
import React from "react";
import { useRouter } from "next/navigation";
import "../../scss/styles.scss";
import { ButtonEnroll } from "@/components/common/Button";

const Home = () => {
    const router = useRouter();
    const seriesData = [30, 40, 35, 50];
    const total = seriesData.reduce((acc, cur) => acc + cur, 0);

    const handleStart = () => {
        router.push("/user/test");
    };

    return (
        <div className="home-wrapper">
            <div className="home-content">
                <div className="home-title-wrapper">
                    <img src="/images/Items/LogoBall.svg" alt="NVP 배구공 로고" className="nvp-ball" />
                    <div className="title">
                        <p>성격으로 알아보는</p>
                        <div className="big-title">
                            <p>배구 포지션 테스트</p>
                        </div>
                    </div>
                </div>
                <div className="position">
                    <img src="/images/Position/MiddleBlocker.png" alt="속공수 캐릭터" />
                    <img src="/images/Position/Setter.png" alt="세터 캐릭터" />
                    <img src="/images/Position/Libero.png" alt="수비 캐릭터" />
                    <img src="/images/Position/LeftRight.png" alt="공격 캐릭터" />
                </div>

                <div className="start-btn-wrapper">
                    <div>총 테스트 인원: {total}명</div>
                    <ButtonEnroll onClick={handleStart} style={{ fontSize: "20px" }} className="start-button">
                        테스트 시작하기
                    </ButtonEnroll>
                </div>
            </div>
        </div>
    );
};

export default Home;
