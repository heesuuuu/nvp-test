"use client";
import React, { useEffect, useState } from "react";
import "../../../scss/styles.scss";
import Navigate from "@/components/layout/navigate/Navigate";
import { Search } from "@/components/common/Search";
import { WrithButton } from "@/components/common/Button";
import GuestBookItem from "./guestbookitem/page";
import Link from "next/link";
import axios from "axios";

const guestbook = () => {
    const initalregistbooks = Array.from({ length: 10 }, (_, idx) => ({
        id: idx,
        name: `User${idx + 1}`,
        content: `Content${idx + 1}`,
        createdAt: new Date().toISOString(),
    }));

    const [registItems, setRegistItems] = useState(initalregistbooks);
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
    useEffect(() => {
        const fetchGuestbooks = async () => {
            try {
                const res = await axios.get("https://api.nvp.kr/v1/questbooks?limit=10");
                console.log("Api 응답 확인:", res.data);
                console.log("API 응답 전체:", res);

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
    // const handleSearch = () => {
    //     setSearchValue(searchValue)
    // }
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
                {filteredGuestbooks.map((item) => (
                    <GuestBookItem
                        key={item.guestBookId}
                        name={item.guestBookNickname}
                        content={item.guestBookInfo}
                        createdAt={item.createdAt}
                        isRegist={!!registItems.find((regist) => regist.guestBookId === item.guestBookId)}
                        onDelete={handleDeleteGuestbook}
                    />
                ))}
                {/* <GuestBookItem /> */}
            </section>
        </>
    );
};

export default guestbook;
