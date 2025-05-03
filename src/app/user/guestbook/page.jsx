"use client";
import React, { useEffect, useState } from "react";
import "../../../scss/styles.scss";
import Navigate from "@/components/layout/navigate/Navigate";
import { Search } from "@/components/common/Search";
import { WrithButton } from "@/components/common/Button";
import GuestBookItem from "./guestbookitem/page";
import Link from "next/link";
import { format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import axios from "axios";

const guestbook = () => {
    const [registItems, setRegistItems] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const handleDeleteGuestbook = (id, inputPassword) => {
        const guestbookToDelete = registItems.find((item) => item.guestBookId === id);
        if (guestbookToDelete && guestbookToDelete.password === inputPassword) {
            const updatedGuestbooks = registItems.filter((item) => item.guestBookId !== id);
            setRegistItems(updatedGuestbooks);
            alert("방명록이 삭제되었습니다.");
        } else {
            alert("비밀번호가 일치하지 않습니다.");
        }
    };
    axios.get("/api/guestbooks");

    useEffect(() => {
        const fetchGuestbooks = async () => {
            try {
                const res = await axios.get("/api/guestbooks");
                console.log("Api 응답 확인:", res.data);

                setRegistItems(res.data.data);
            } catch (error) {
                console.log("방명록 불러오기 실패", error);
            }
        };
        fetchGuestbooks();
    }, []);

    const filteredGuestbooks = Array.isArray(registItems)
        ? registItems.filter(
              (item) =>
                  item.guestBookNickname?.toLowerCase().includes(searchValue.toLowerCase()) ||
                  item.guestBookInfo?.toLowerCase().includes(searchValue.toLowerCase())
          )
        : [];
    return (
        <>
            <div className="inner-wrapper">
                <Navigate title="방명록" />
                <Search searchValue={searchValue} setSearchValue={setSearchValue} />
                <div className="guestbook-title">
                    <p>총 방명록 {registItems.length}개</p>
                    <Link href={"/user/write"} className="write-button">
                        <WrithButton />
                    </Link>
                </div>
            </div>

            <section className="guestbook-list-wrapper">
                {filteredGuestbooks.map((item) => {
                    const d = new Date(item.createdAt);
                    d.setHours(d.getHours()+9)
                    const now = Date.now();
                    const diff = (now - d) / 1000;

                    let formattedDate = "";
                    if (diff < 60) {
                        formattedDate = "방금 전";
                    } else if (diff < 60 * 60 * 24 * 3) {
                        formattedDate = formatDistanceToNow(d, { addSuffix: true, locale: ko });
                    } else {
                        formattedDate = format(d, "PPP EEE p", { locale: ko });
                    }
                    return (
                        <GuestBookItem
                            key={item.guestBookId ?? index}
                            name={item.guestBookNickname}
                            content={item.guestBookInfo}
                            createdAt={formattedDate}
                            isRegist={!!registItems.find((regist) => regist.guestBookId === item.guestBookId)}
                            onDelete={handleDeleteGuestbook}
                        />
                    );
                })}
            </section>
        </>
    );
};

export default guestbook;
