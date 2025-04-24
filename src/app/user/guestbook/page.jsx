import React from "react";
import "../../../scss/styles.scss";
import Navigate from "@/components/layout/navigate/Navigate";
import { Search } from "@/components/common/Search";
import { WrithButton } from "@/components/common/Button";
import GuestBookItem from "./guestbookitem/page";
import Link from "next/link";

const guestbook = () => {
    return (
        <>
            <div className="inner-wrapper">
                <Navigate />
                <Search />
                <div className="guestbook-title">
                    <p>총 방명록 20개</p>
                    <Link href={"/user/write"} className="write-button">
                        <WrithButton />
                    </Link>
                </div>
            </div>
            <section className="guestbook-list-wrapper">
                <GuestBookItem />
                <GuestBookItem />
        </section>
        
        </>
    );
};

export default guestbook;
