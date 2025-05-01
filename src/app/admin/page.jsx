'use client";';
import { PageButton } from "@/components/common/Button";
import { GuestBookIcon, GuestChart, TestQuestion, AdminLogout } from "@/components/common/icon/AdminIcon";
import Navigate from "@/components/layout/navigate/Navigate";
import Link from "next/link";
import React from "react";

import "../../scss/styles.scss";

const admin = () => {
    return (
        <>
            <div className="inner">
                <Navigate  isAdmin />
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
                    <Link href="/admin/guestbook">
                        <PageButton text="관리자 로그아웃" Icon={AdminLogout} hoverColor="var(--white)"></PageButton>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default admin;
