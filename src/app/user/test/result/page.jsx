"use client";
import React, { useEffect, useState } from "react";
import "../../../../scss/styles.scss";
import Rank from "@/components/layout/rank/Rank";
import { ButtonEnroll } from "@/components/common/Button";
import Link from "next/link";
import { Fire, Retry } from "@/components/common/icon/TestResult";
import api from "@/utils/axios";

const Result = () => {
    const [resultData, setResultData] = useState(null);
    useEffect(() => {
        const fetchResult = async () => {
            try {
                const res = await api.get("/v1/results");
                setResultData(res.data.data);
            } catch (error) {
                console.error("결과 불러오기 실패", error);
            }
        };
        fetchResult();
    }, []);
    return (
        <div className="result">
            <div className="inner">
                <div className="result-top-title">포지션 테스트 결과</div>
                {resultData && (
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
                                <p>{resultData.resultStatusKo}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* result 설명 */}
                {resultData && (
                    <div className="des-wrapper">
                        <div className="des-title">{resultData.resultModifier}인 나는...!</div>
                        <div className="description">
                            <p>🎉 {resultData.resultInfo}</p>
                            {resultData.resultInfo}🔥
                        </div>
                    </div>
                )}

                {/* 전체 유형 순위 */}
                {resultData?.resultStatus?.length > 0 && (
                    <section className="rank-wrapper">
                        <div className="rank-title">전체 유형 순위</div>
                        {resultData.resultStatus.map((status) => (
                            <Rank
                                key={status.resultStatusId}
                                name={status.resultStatusKo}
                                percent={status.resultStatusPer}
                            />
                        ))}
                    </section>
                )}

                {/* 페이지 이동 버튼 */}
                <div className="page-btn-wrapper">
                    <Link href={"/user/guestbook/"}>
                        <ButtonEnroll style={{ backgroundColor: "var(--blue-500)" }} className="page-btn blue-button">
                            방명록 보러가기
                            <Fire />
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
                        <Link href={"https://www.youtube.com/@NVP-lh3op"} target="_blank">
                            <img src="/images/SNS/youtube.svg" alt="Nvp-youtube" />
                        </Link>
                        <Link href={"https://www.instagram.com/nsu_nvp_volleyball/"} target="_blank">
                            <img src="/images/SNS/instagram.svg" alt="Nvp-instagram" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;
