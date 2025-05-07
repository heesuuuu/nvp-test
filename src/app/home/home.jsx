"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../../scss/styles.scss";
import { MainButton } from "@/components/common/Button";
import api from "@/utils/axios";

const Home = () => {
    const router = useRouter();
    const [total, setTotal] = useState(0);

    const handleStart = () => {
        router.push("/user/test");
    };

    useEffect(() => {
        api.get("/v1/admins/results")
            .then((res) => {
                if (res.data.success) {
                    setTotal(res.data.data.total);
                } else {
                    console.error("서버 에러", res.data.error.message);
                }
            })
            .catch((err) => {
                console.error("총 인원 조회 실패", err.response?.data || err);
            });
    },[]);

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
                    <MainButton onClick={handleStart} style={{ fontSize: "20px" }} className="start-button">
                        테스트 시작하기
                    </MainButton>
                </div>
            </div>
        </div>
    );
};

export default Home;
