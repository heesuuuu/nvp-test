"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../../scss/styles.scss";
import { ButtonEnroll, MainButton, PageButton } from "@/components/common/Button";
import api from "@/utils/axios";
import Link from "next/link";
import { GuestBookIcon } from "@/components/common/icon/AdminIcon";

const Home = () => {
    const router = useRouter();
    const [total, setTotal] = useState(0);

    const handleStart = () => {
        router.push("/user/test");
    };

    useEffect(() => {
        api.post("/v1/visitors/hit")

            .then((res) => {
                const totalCount = res?.data?.data;
                if (res.data.success && typeof totalCount === "number") {
                    setTotal(totalCount);
                } else {
                    console.error("서버 에러", res.data);
                }
            })
            .catch((err) => {
                console.error("방문자 수 조회 실패", err.response?.data || err);
            });
    }, []);

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
                    <img src="/images/Position/CENTER.png" alt="속공수 캐릭터" />
                    <img src="/images/Position/SETTER.png" alt="세터 캐릭터" />
                    <img src="/images/Position/LIBERO.png" alt="수비 캐릭터" />
                    <img src="/images/Position/LEFT.png" alt="공격 캐릭터" />
                </div>

                <div className="start-btn-wrapper">
                    <div>방문자 수: {total}명</div>
                    <MainButton onClick={handleStart} style={{ fontSize: "20px" }} className="start-button">
                        테스트 시작하기
                    </MainButton>
                    <Link href={"/user/guestbook/"}>
                        <ButtonEnroll
                            style={{ backgroundColor: "var(--blue-500)" }}
                            fontSize="18px"
                            className="page-btn blue-button main-guestbook"
                        >
                            방명록 보러가기
                            <img
                                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Animals%20and%20Nature/Fire.webp"
                                alt="Fire"
                                width="25"
                                height="25"
                            />
                            {/* <Fire /> */}
                        </ButtonEnroll>
                    </Link>
                    {/* <MainButton onClick={handleStart} style={{ fontSize: "20px" }} className="start-button">
                        방명록 보러가기
                    </MainButton> */}
                    {/* <Link href="/admin/guestbook">
                        <PageButton
                            text="방명록 관리"
                            desc="방명록 삭제"
                            Icon={GuestBookIcon}
                            hoverColor="var(--white)"
                        ></PageButton>
                    </Link> */}
                </div>
            </div>
        </div>
    );
};

export default Home;
