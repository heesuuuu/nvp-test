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
import api from "@/utils/axios";

const guestbook = () => {
    const [registItems, setRegistItems] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const handleDeleteGuestbook = async (id, password) => {
        console.log("삭제 확인 id", id);

        if (!password) {
            alert("비밀번호를 입력해주세요.");
            return false;
        }
        try {
            const res = await api.delete(`v1/guestbooks/${id}`, {
                params: { password },
            });
            console.log("삭제 성공", res.data);

            if (res.data && res.data.success === true) {
                const updatedGuestbooks = registItems.filter((item) => item.guestBookId !== id);
                setRegistItems(updatedGuestbooks);

                alert("방명록이 삭제되었습니다!");
                return true;
            } else {
                const errorMessage = res.data?.error?.message || "비밀번호가 일치하지 않거나 삭제에 실패했습니다.";
                alert(errorMessage);
                return false;
            }
        } catch (error) {
            console.error("삭제 실패", error);
        }
    };

    useEffect(() => {
        const fetchGuestbooks = async () => {
            try {
                const res = await api.get("v1/guestbooks");
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
                    d.setHours(d.getHours());
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
                            key={item.guestBookId}
                            id={item.guestBookId}
                            name={item.guestBookNickname}
                            content={item.guestBookInfo}
                            createdAt={formattedDate}
                            isRegist={true}
                            onDelete={handleDeleteGuestbook}
                        />
                    );
                })}
            </section>
        </>
    );
};

export default guestbook;
