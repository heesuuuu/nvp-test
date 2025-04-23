import Navigate from "@/components/layout/navigate/Navigate";
import React from "react";
import "../../../../scss/styles.scss";
import Rank from "@/components/layout/rank/Rank";
import { ButtonDefault } from "@/components/common/Button";
import Link from "next/link";

const Result = () => {
    return (
        <div className="result">
            <div className="inner">
                <Navigate />
                <div className="title-wrapper">
                    <div className="result-title">
                        <div>코트 위 내 자리는...</div>
                        <div>
                            <p>팀의 에너지 핵폭탄!</p>
                        </div>
                    </div>
                    <div className="result-img-wrapper">
                        <div className="result-img">
                            <img src="/images/Position/LeftRight.svg" />
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
                <div className="rank-wrapper">
                    <div className="rank-title">전체 유형 순위</div>
                    <Rank />
                </div>

                {/* 페이지 이동 버튼 */}
                <div className="page-btn-wrapper">
                    <Link href={"/user/guestbook/"}>
                        <ButtonDefault  
                            style={{ backgroundColor: "var(--blue-500)" }}
                            className="page-btn blue-button"
                        >
                            방명록 보러가기{" "}
                            <svg
                                width="12"
                                height="16"
                                viewBox="0 0 12 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7.31431 1.37918C7.31269 1.32202 7.25031 1.28479 7.20122 1.31412C4.60219 2.86682 4.65033 6.76181 4.68135 7.46757C4.68369 7.52081 4.63333 7.55837 4.58512 7.53567C4.28487 7.39427 3.42458 6.86173 3.37705 5.38648C3.37521 5.32924 3.31344 5.29243 3.26417 5.32164C1.75934 6.21352 0.75 7.86079 0.75 9.68749C0.75 12.4834 3.1005 14.75 6 14.75C8.8995 14.75 11.25 12.4834 11.25 9.68749C11.25 5.62559 7.41022 4.75205 7.31431 1.37918Z"
                                    stroke="white"
                                    strokeWidth="1.125"
                                />
                            </svg>
                        </ButtonDefault>
                    </Link>
                    <Link href="/">
                        <ButtonDefault className="page-btn">
                            테스트 다시하기
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M3.80383 5.99998C4.3571 5.0417 5.16459 4.25507 6.13703 3.72708C7.10947 3.19909 8.20898 2.9503 9.314 3.00821C10.419 3.06612 11.4865 3.42848 12.3984 4.05523C13.3103 4.68198 14.0312 5.5487 14.4813 6.55957"
                                    stroke="white"
                                    strokeWidth="1.125"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M2.4239 4.13646L2.97096 6.50611C3.06413 6.90971 3.46685 7.16135 3.87045 7.06818L6.2401 6.52112"
                                    stroke="white"
                                    strokeWidth="1.125"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M14.1962 11.9999C13.6429 12.9582 12.8354 13.7448 11.863 14.2728C10.8905 14.8008 9.79102 15.0496 8.686 14.9917C7.58098 14.9338 6.5135 14.5714 5.60158 13.9446C4.68965 13.3179 3.96881 12.4512 3.51874 11.4403"
                                    stroke="white"
                                    strokeWidth="1.125"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M15.5761 13.8633L15.029 11.4936C14.9359 11.09 14.5332 10.8384 14.1296 10.9316L11.7599 11.4786"
                                    stroke="white"
                                    strokeWidth="1.125"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </ButtonDefault>
                    </Link>
                </div>

                {/* SNS */}
                <div className="sns-wrapper">
                    <div className="sns-title">NVP 구경하러 가기</div>
                    <div className="sns-link">
                        <Link href={"https://www.youtube.com/@NVP-lh3op"}>
                            <img src="/images/SNS/youtube.svg" alt="" />
                        </Link>
                        <Link href={"https://www.instagram.com/nsu_nvp_volleyball/"}>
                            <img src="/images/SNS/instagram.svg" alt="" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;
