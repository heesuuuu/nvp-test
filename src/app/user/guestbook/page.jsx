"use client";
import React, { useCallback, useEffect, useState } from "react";
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
    const [cursor, setCursor] = useState(null);
    const [hasNext, setHasNext] = useState(true);
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

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

    const fetchGuestbooks = async () => {
        if (loading || !hasNext) return;
        setLoading(true);

        try {
            const trimmedKeyword = searchValue.trim();
            const isSearchMode = trimmedKeyword.length > 0;
            const url = isSearchMode ? "/v1/guestbooks/search" : "/v1/guestbooks";

            const res = await api.get(url, {
                params: {
                    ...(cursor !== null ? { cursor } : {}),
                    limit: 10,
                    ...(isSearchMode ? { keyword: trimmedKeyword } : {}),
                },
            });

            const data = res.data?.data || {};
            const guestBookResList = data.guestBookResList || [];
            const nextCursor = data.nextCursor ?? null;
            const nextPageExists = data.hasNext ?? false;
            const total = data.total ?? 0;

            setTotalCount(total);
            setRegistItems((prev) => {
                const combined = [...prev, ...guestBookResList];
                const unique = Array.from(new Map(combined.map((item) => [item.guestBookId, item])).values());
                return unique;
            });
            setCursor(nextCursor);
            setHasNext(nextPageExists);
        } catch (error) {
            console.error("❌ 방명록 불러오기 실패:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setRegistItems([]);
        setCursor(null);
        setHasNext(true);
    }, [searchValue]);

    useEffect(() => {
        if (cursor === null) {
            fetchGuestbooks();
        }
    }, [cursor, searchValue]);

    const observer = React.useRef();
    const lastItemRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasNext) {
                    fetchGuestbooks();
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, hasNext, searchValue]
    );

    return (
        <>
            <div className="inner-wrapper">
                <Navigate title="방명록" />
                <Search searchValue={searchValue} setSearchValue={setSearchValue} />
                <div className="guestbook-title">
                    <p>총 방명록 {totalCount}개</p>
                    <Link href={"/user/write"} className="write-button">
                        <WrithButton />
                    </Link>
                </div>
            </div>

            <section className="guestbook-list-wrapper">
                {registItems.length > 0 ? (
                    registItems.map((item, index) => {
                        const isLastItem = index == registItems.length - 1;
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
                                ref={isLastItem ? lastItemRef : null}
                                id={item.guestBookId}
                                name={item.guestBookNickname}
                                content={item.guestBookInfo}
                                createdAt={formattedDate}
                                isRegist={true}
                                onDelete={handleDeleteGuestbook}
                            />
                        );
                    })
                ) : (
                    <div className="none-guestbook">
                        "방명록이 기다리고 있어요. 소중한 한 줄을 남겨주세요
                        <img
                            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Love%20Letter.png"
                            alt="Love Letter"
                            width="25"
                            height="25"
                        />
                        "
                    </div>
                )}
                {loading && <p className="loading">불러오는 중...</p>}
            </section>
        </>
    );
};

export default guestbook;
