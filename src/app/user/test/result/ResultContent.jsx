"use client";
import React, { useEffect, useState } from "react";
import "../../../../scss/styles.scss";
import { ButtonEnroll } from "@/components/common/Button";
import Link from "next/link";
import { Fire, Retry } from "@/components/common/icon/TestResult";
import api from "@/utils/axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Rank } from "@/components/layout/rank/Rank";

const Result = () => {
    const [resultData, setResultData] = useState(null);
    const searchParams = useSearchParams();
    const router = useRouter()
    const handle = () => {
        router.push("/user/nvp")
    }
    const resultId = searchParams.get("resultId");
     useEffect(() => {
         const stored = sessionStorage.getItem("latestResult");
         if (stored) {
             const parsed = JSON.parse(stored);
             setResultData(parsed);
         }
     }, []);


    return (
        <div className="result">
            <div className="inner">
                <div className="result-top-title">포지션 테스트 결과</div>
                {resultData && (
                    <>
                        <div className="title-wrapper">
                            <div className="result-title">
                                <div>코트 위 내 자리는...</div>
                                <div>
                                    <p>{resultData.resultModifier}!</p>
                                </div>
                            </div>
                            <div className="result-img-wrapper">
                                <div className="result-img">
                                    <img src={`/images/Position/${resultData.result}.png`} />
                                </div>
                                <div className="result-position">
                                    <p>{resultData.resultKo}</p>
                                </div>
                            </div>
                        </div>

                        {/* result 설명 */}
                        {resultData && (
                            <div className="des-wrapper">
                                <div className="des-title">
                                    <span>{resultData.resultModifier}</span>인 나는...!
                                </div>
                                <div className="description">
                                    {/* <p>🎉 {resultData.resultInfo}</p> */}
                                    {resultData.resultInfo}🔥
                                </div>
                            </div>
                        )}

                        {/* 전체 유형 순위 */}
                        {resultData?.resultStatus?.length > 0 && (
                            <section className="rank-wrapper">
                                <div className="rank-title">가장 많이 나온 포지션은?</div>
                                {resultData.resultStatus.map((status) => (
                                    <Rank
                                        key={status.resultStatusId}
                                        name={status.resultStatusKo}
                                        percent={status.resultStatusPer}
                                        type={status.resultStatusName}
                                    />
                                ))}
                            </section>
                        )}
                    </>
                )}

                {/* 페이지 이동 버튼 */}
                <div className="page-btn-wrapper">
                    <Link href={"/user/guestbook/"}>
                        <ButtonEnroll style={{ backgroundColor: "var(--blue-500)" }} className="page-btn blue-button">
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
                    <Link href="/">
                        <ButtonEnroll className="page-btn">
                            테스트 다시하기
                            <Retry />
                        </ButtonEnroll>
                    </Link>
                </div>

                {/* SNS */}
                <div className="sns-wrapper">
                    <div className="sns-title">NVP 구경하러 가기</div>
                    <div className="sns-link">
                        <img
                            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Backhand%20Index%20Pointing%20Right%20Light%20Skin%20Tone.png"
                            alt="Backhand Index Pointing Right Light Skin Tone"
                            width="35"
                            height="35"
                        />
                        <Link href={"https://www.youtube.com/@NVP-lh3op"} target="_blank">
                            <img src="/images/SNS/youtube.svg" alt="Nvp-youtube" />
                        </Link>
                        <Link href={"https://www.instagram.com/nsu_nvp_volleyball/"} target="_blank">
                            <img src="/images/SNS/instagram.svg" alt="Nvp-instagram" />
                        </Link>

                        <img src="/images/SNS/NvpLogo.svg" alt="Nvp-instagram" onClick={handle} />

                        <img
                            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Backhand%20Index%20Pointing%20Left%20Light%20Skin%20Tone.png"
                            alt="Backhand Index Pointing Left Light Skin Tone"
                            width="35"
                            height="35"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;
