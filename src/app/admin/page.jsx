"use client";
import { PageButton } from "@/components/common/Button";
import {
    GuestBookIcon,
    GuestChart,
    TestQuestion,
    AdminLogout,
    AdminLogin,
    UserHome,
} from "@/components/common/icon/AdminIcon";
import Navigate from "@/components/layout/navigate/Navigate";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "../../scss/styles.scss";
import api from "@/utils/axios";
import { adminApi } from "@/lib/storage";
import { useRouter } from "next/navigation";

const admin = () => {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        api.get("/v1/admins/questions", { withCredentials: true })
            .then(() => setIsAdmin(true))
            .catch(() => {
                // 서버 연결 실패 시 → 로컬 세션으로 fallback
                setIsAdmin(adminApi.isLoggedIn());
            });
    }, []);

    const handleLogout = async () => {
        try {
            const res = await api.delete("/v1/admins/logout", { withCredentials: true });
            if (res.data.success) {
                alert("로그아웃 되었습니다.");
                router.push("/admin");
            } else {
                alert("로그아웃 오류");
            }
        } catch {
            // 서버 실패 시 → 로컬 세션 제거로 fallback
            adminApi.setSession(false);
            alert("로그아웃 되었습니다.");
            setIsAdmin(false);
            router.push("/admin");
        }
    };

    if (isAdmin === null) return null;

    return (
        <>
            <div className="inner">
                <Navigate isAdmin />

                {/* 비로그인 시 안내 문구 */}
                {!isAdmin && (
                    <div
                        style={{
                            backgroundColor: "#FFF9ED",
                            border: "1px solid var(--white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            borderRadius: "8px",
                            padding: "12px 16px",
                            marginBottom: "16px",
                            fontSize: "14px",
                            color: "var(--gray-40, #FFF9ED)",
                        }}
                    >
                        <img
                            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Objects/Key.webp"
                            alt="Key"
                            width="25"
                            height="25"
                        />
                        <span>{" 관리자 로그인 후 접근 가능합니다."}</span>
                    </div>
                )}

                <div className="admin-wrapper">
                    {/* 로그인 시에만 활성화되는 버튼들 */}
                    {isAdmin ? (
                        <Link href="/admin/guestbook">
                            <PageButton
                                text="방명록 관리"
                                desc="방명록 삭제"
                                Icon={GuestBookIcon}
                                hoverColor="var(--white)"
                            />
                        </Link>
                    ) : (
                        <div style={{ opacity: 0.4, cursor: "not-allowed", pointerEvents: "none" }}>
                            <PageButton
                                text="방명록 관리"
                                desc="방명록 삭제"
                                Icon={GuestBookIcon}
                                hoverColor="var(--white)"
                            />
                        </div>
                    )}

                    {isAdmin ? (
                        <Link href="/admin/question">
                            <PageButton
                                text="Test 질문지 관리"
                                desc="지문지, 선택지 수정"
                                Icon={TestQuestion}
                                hoverColor="var(--white)"
                            />
                        </Link>
                    ) : (
                        <div style={{ opacity: 0.4, cursor: "not-allowed", pointerEvents: "none" }}>
                            <PageButton
                                text="Test 질문지 관리"
                                desc="지문지, 선택지 수정"
                                Icon={TestQuestion}
                                hoverColor="var(--white)"
                            />
                        </div>
                    )}

                    {isAdmin ? (
                        <Link href="/admin/stats">
                            <PageButton
                                text="사용자 차트"
                                desc="포지션, 총 테스트 인원"
                                Icon={GuestChart}
                                hoverColor="var(--white)"
                            />
                        </Link>
                    ) : (
                        <div style={{ opacity: 0.4, cursor: "not-allowed", pointerEvents: "none" }}>
                            <PageButton
                                text="사용자 차트"
                                desc="포지션, 총 테스트 인원"
                                Icon={GuestChart}
                                hoverColor="var(--white)"
                            />
                        </div>
                    )}

                    {/* 항상 활성화 */}
                    <Link href="/">
                        <PageButton text="사용자 메인화면 돌아가기" desc="" Icon={UserHome} hoverColor="var(--white)" />
                    </Link>

                    {/* 로그인 상태에 따라 로그아웃 / 로그인 버튼 */}
                    {isAdmin ? (
                        <PageButton
                            text="관리자 로그아웃"
                            Icon={AdminLogout}
                            onClick={handleLogout}
                            hoverColor="var(--white)"
                        />
                    ) : (
                        <Link href="/admin/login">
                            <PageButton text="관리자 로그인" Icon={AdminLogin} hoverColor="var(--white)" />
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default admin;
