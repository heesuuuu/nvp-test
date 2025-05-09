"use client";
import { PageButton } from "@/components/common/Button";
import { GuestBookIcon, GuestChart, TestQuestion, AdminLogout, AdminLogin, UserHome } from "@/components/common/icon/AdminIcon";
import Navigate from "@/components/layout/navigate/Navigate";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import "../../scss/styles.scss";
import api from "@/utils/axios";
import { useRouter } from "next/navigation";

const admin = () => {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        api.get("/v1/admins/questions", { withCredentials: true })
            .then(() => setIsAdmin(true))
            .catch(() => setIsAdmin(false));
    }, []);

    const handleLogout = async () => {
        try {
            const res = await api.delete("/v1/admins/logout", { withCredentials: true });
            if (res.data.success) {
                alert("로그아웃 되었습니다.");
                router.push("/admin");
            } else {
                console.error("로그아웃 실패", res.data.error.message);
                alert("로그아웃 오류");
            }
        } catch (error) {
            console.error("요청 실패", error);
            alert("네트워크 오류");
        }
    };
    if (isAdmin === null) return null;
    return (
        <>
            <div className="inner">
                <Navigate isAdmin />
                <div className="admin-wrapper">
                    <Link href="/admin/guestbook">
                        <PageButton
                            text="방명록 관리"
                            desc="방명록 삭제"
                            Icon={GuestBookIcon}
                            hoverColor="var(--white)"
                        ></PageButton>
                    </Link>
                    <Link href="/admin/question">
                        <PageButton
                            text="Test 질문지 관리"
                            desc="지문지, 선택지 수정"
                            Icon={TestQuestion}
                            hoverColor="var(--white)"
                        ></PageButton>
                    </Link>
                    <Link href="/admin/stats">
                        <PageButton
                            text="사용자 차트"
                            desc="포지션, 총 테스트 인원"
                            Icon={GuestChart}
                            hoverColor="var(--white)"
                        ></PageButton>
                    </Link>
                    <Link href="/">
                        <PageButton
                            text="테스트 메인화면"
                            desc=""
                            Icon={UserHome}
                            hoverColor="var(--white)"
                        ></PageButton>
                    </Link>
                    {isAdmin === null ? null : isAdmin ? (
                        <PageButton
                            text="관리자 로그아웃"
                            Icon={AdminLogout}
                            onClick={handleLogout}
                            hoverColor="var(--white)"
                        ></PageButton>
                    ) : (
                        <Link href="/admin/login">
                            <PageButton text="관리자 로그인" Icon={AdminLogin} hoverColor="var(--white)"></PageButton>
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default admin;
