"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "../../../scss/styles.scss";
import Navigate from "@/components/layout/navigate/Navigate";
import { Search } from "@/components/common/Search";
import { WrithButton } from "@/components/common/Button";
import GuestBookItem from "./guestbookitem/page";
import Link from "next/link";
import { format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import api from "@/utils/axios";
import { guestbooksApi } from "@/lib/storage";

const guestbook = () => {
    const [registItems, setRegistItems] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [cursor, setCursor] = useState(null);
    const [hasNext, setHasNext] = useState(true);
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [isOffline, setIsOffline] = useState(false);

    const handleDeleteGuestbook = async (id, password) => {
        if (!password) {
            alert("비밀번호를 입력해주세요.");
            return false;
        }

        if (isOffline) {
            // 서버 없을 때 → localStorage fallback
            const result = guestbooksApi.delete(id, password);
            if (result.success) {
                setRegistItems((prev) => prev.filter((item) => item.guestBookId !== id));
                setTotalCount((prev) => prev - 1);
                alert("방명록이 삭제되었습니다!");
                return true;
            } else {
                alert(result.message);
                return false;
            }
        }

        try {
            const res = await api.delete(`v1/guestbooks/${id}`, { params: { password } });
            if (res.data && res.data.success === true) {
                setRegistItems((prev) => prev.filter((item) => item.guestBookId !== id));
                setTotalCount((prev) => prev - 1);
                alert("방명록이 삭제되었습니다!");
                return true;
            } else {
                alert(res.data?.error?.message || "비밀번호가 일치하지 않거나 삭제에 실패했습니다.");
                return false;
            }
        } catch {
            const result = guestbooksApi.delete(id, password);
            if (result.success) {
                setRegistItems((prev) => prev.filter((item) => item.guestBookId !== id));
                setTotalCount((prev) => prev - 1);
                alert("방명록이 삭제되었습니다!");
                return true;
            } else {
                alert(result.message);
                return false;
            }
        }
    };

    const fetchGuestbooks = async (isInitial = false, currentCursor = null) => {
        if (!isInitial && (loading || !hasNext)) return;
        setLoading(true);
        try {
            const trimmedKeyword = searchValue.trim();
            const isSearchMode = trimmedKeyword.length > 0;
            const url = isSearchMode ? "/v1/guestbooks/search" : "/v1/guestbooks";
            const res = await api.get(url, {
                params: {
                    ...(currentCursor !== null ? { cursor: currentCursor } : {}),
                    limit: 10,
                    ...(isSearchMode ? { keyword: trimmedKeyword } : {}),
                },
            });
            const data = res.data?.data || {};
            const guestBookResList = data.guestBookResList || [];
            const nextCursor = data.nextCursor ?? null;
            const nextPageExists = data.hasNext ?? false;
            const total = data.total ?? 0;

            setIsOffline(false);
            setTotalCount(total);
            setRegistItems((prev) => {
                if (isInitial) return guestBookResList;
                const combined = [...prev, ...guestBookResList];
                return Array.from(new Map(combined.map((item) => [item.guestBookId, item])).values());
            });
            setCursor(nextCursor);
            setHasNext(nextPageExists);
        } catch {
            // 서버 실패 시 → localStorage fallback
            setIsOffline(true);
            const data = guestbooksApi.getPage({ cursor: currentCursor, limit: 10, keyword: searchValue });
            setTotalCount(data.total);
            setRegistItems((prev) => {
                if (isInitial) return data.guestBookResList;
                const combined = [...prev, ...data.guestBookResList];
                return Array.from(new Map(combined.map((item) => [item.guestBookId, item])).values());
            });
            setCursor(data.nextCursor);
            setHasNext(data.hasNext);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setCursor(null);
        setHasNext(true);
        fetchGuestbooks(true, null);
    }, [searchValue]);

    const observer = useRef();
    const lastItemRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasNext && !loading) fetchGuestbooks(false, cursor);
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasNext, cursor]
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
                        const isLastItem = index === registItems.length - 1;
                        const d = new Date(item.createdAt);
                        const diff = (Date.now() - d) / 1000;
                        let formattedDate = "";
                        if (diff < 60) formattedDate = "방금 전";
                        else if (diff < 60 * 60 * 24 * 3)
                            formattedDate = formatDistanceToNow(d, { addSuffix: true, locale: ko });
                        else formattedDate = format(d, "PPP EEE p", { locale: ko });
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
                        방명록이 기다리고 있어요. 소중한 한 줄을 남겨주세요
                        <img
                            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Love%20Letter.png"
                            alt="Love Letter"
                            width="25"
                            height="25"
                        />
                    </div>
                )}
                {loading && hasNext && <p className="loading">불러오는 중...</p>}
            </section>
        </>
    );
};

export default guestbook;
