import Navigate from "@/components/layout/navigate/Navigate";
import React from "react";
import "../../../../scss/styles.scss";
import Rank from "@/components/layout/rank/Rank";
import { ButtonEnroll } from "@/components/common/Button";
import Link from "next/link";
import { Fire, Retry } from "@/components/common/icon/TestResult";

const Result = () => {
    return (
        <div className="result">
            <div className="inner">
                {/* <Navigate title="포지션 테스트 결과" /> */}
                <div className="result-top-title">포지션 테스트 결과</div>
                <div className="title-wrapper">
                    <div className="result-title">
                        <div>코트 위 내 자리는...</div>
                        <div>
                            <p>팀의 에너지 핵폭탄!</p>
                        </div>
                    </div>
                    <div className="result-img-wrapper">
                        <div className="result-img">
                            <img src="/images/Position/LeftRight.png" />
                        </div>
                        <div className="result-position">
                            <p>레프트</p>
                        </div>
                    </div>
                </div>

                {/* result 설명 */}
                <div className="des-wrapper">
                    <div className="des-title">팀의 에너지 핵폭탄인 나는...!</div>
                    <div className="description">
                        <p>🎉 분위기 메이커는 나야 나!</p>
                        어디서든 중심이 되고 싶은 당신은 레프트형! 에너지 넘치고 적극적인 당신 덕분에 팀은 언제나
                        활기차요. 하지만 가끔 너무 앞서가다 혼자 폭주할 수도...? 그래도 없으면 심심한 사람 1위! 당신
                        없인 경기가 안 돌아가요🔥
                    </div>
                </div>

                {/* 전체 유형 순위 */}
                <section className="rank-wrapper">
                    <div className="rank-title">전체 유형 순위</div>
                    {[...Array(4)].map((_, i) => (
                        <Rank key={i} />
                    ))}
                </section>

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
