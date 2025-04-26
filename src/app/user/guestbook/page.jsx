"use client";
import React, { useState } from "react";
import "../../../scss/styles.scss";
import Navigate from "@/components/layout/navigate/Navigate";
import { Search } from "@/components/common/Search";
import { WrithButton } from "@/components/common/Button";
import GuestBookItem from "./guestbookitem/page";
import Link from "next/link";

const guestbook = () => {
    const [registItems, setRegistItems] = useState([
        { id: 1, name: "User1", content: "방명록 내용 1", createdAt: new Date().toISOString() },
        { id: 2, name: "User2", content: "방명록 내용 2", createdAt: new Date().toISOString() },
        { id: 3, name: "User3", content: "방명록 내용 3", createdAt: new Date().toISOString() },
    ]);
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
                    <GuestBookItem key={item.id} name={item.name} content={item.content} createdAt={item.createdAt} isRegist={registItems.includes(item.id)} />
                ))}
                {/* <GuestBookItem /> */}
            </section>
        </>
    );
};

export default guestbook;
