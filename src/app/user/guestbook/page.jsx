"use client";
import React, { useState } from "react";
import "../../../scss/styles.scss";
import Navigate from "@/components/layout/navigate/Navigate";
import { Search } from "@/components/common/Search";
import { WrithButton } from "@/components/common/Button";
import GuestBookItem from "./guestbookitem/page";
import Link from "next/link";

const guestbook = () => {
    const initalregistbooks = Array.from({ length: 10 }, (_, idx) => ({
        id: idx,
        name: `User${idx + 1}`,
        createdAt: new Date().toISOString(),
    }));
    const [registItems, setRegistItems] = useState(initalregistbooks);
    const handleDeleteGuestbook = (id, inputPassword) => {
        const guestbookToDelete = registItems.find((item) => item.id === id);
        if (guestbookToDelete && guestbookToDelete.password === inputPassword) {
            const updatedGuestbooks = registItems.filter((item) => item.id !== id);
            setRegistItems(updatedGuestbooks);
            alert("방명록이 삭제되었습니다.");
        } else {
            alert("비밀번호가 일치하지 않습니다.");
        }
    };
    return (
        <>
            <div className="inner-wrapper">
                <Navigate />
                <Search />
                <div className="guestbook-title">
                    <p>총 방명록 {registItems.length}개</p>
                    <Link href={"/user/write"} className="write-button">
                        <WrithButton />
                    </Link>
                </div>
            </div>
            <section className="guestbook-list-wrapper">
                {registItems.map((item) => (
                    <GuestBookItem
                        key={item.id}
                        name={item.name}
                        content={item.content}
                        createdAt={item.createdAt}
                        isRegist={registItems.includes(item.id)}
                        onDelete={handleDeleteGuestbook}
                    />
                ))}
                {/* <GuestBookItem /> */}
            </section>
        </>
    );
};

export default guestbook;
