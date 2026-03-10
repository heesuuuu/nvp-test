"use client";
import { ButtonCancel, ButtonEnroll } from "@/components/common/Button";
import { Search } from "@/components/common/Search";
import Navigate from "@/components/layout/navigate/Navigate";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "../../../scss/styles.scss";
import Modal from "@/components/layout/modal/page";
import AdminGuestBookItem from "./guestbookitem/page";
import api from "@/utils/axios";
import { format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { guestbooksApi } from "@/lib/storage";

const AdminGuestbook = () => {
    const [registItems, setRegistItems] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cursor, setCursor] = useState(null);
    const [hasNext, setHasNext] = useState(true);
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [isOffline, setIsOffline] = useState(false);

    const fetchGuestbooks = async (isInitial = false, currentCursor = null) => {
        if (!isInitial && (loading || !hasNext)) return;
        setLoading(true);
        try {
            const isSearchMode = searchValue.trim() !== "";
            const url = isSearchMode ? "/v1/admins/search" : "/v1/admins/guestbooks";
            const params = {
                limit: 10,
                ...(currentCursor !== null ? { cursor: currentCursor } : {}),
                ...(isSearchMode ? { keyword: searchValue } : {}),
            };
            const res = await api.get(url, { params });
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
            if (loading || !hasNext) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasNext && !loading) fetchGuestbooks(false, cursor);
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasNext, cursor]
    );

    const toggleSelect = (id) => {
        setSelectedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
    };

    const handleDelete = async () => {
        if (isOffline) {
            // 서버 없을 때 → localStorage fallback
            if (selectedItems.length === 1) guestbooksApi.delete(selectedItems[0], null);
            else guestbooksApi.deleteMany(selectedItems);
            setRegistItems((prev) => prev.filter((item) => !selectedItems.includes(item.guestBookId)));
            setTotalCount((prev) => prev - selectedItems.length);
            setIsModalOpen(false);
            setSelectedItems([]);
            return;
        }
        try {
            if (selectedItems.length === 1) {
                await api.delete(`/v1/admins/guestbooks/${selectedItems[0]}`);
            } else {
                await api.delete("/v1/admins/guestbooks", { data: { guestBookIds: selectedItems } });
            }
            setRegistItems((prev) => prev.filter((item) => !selectedItems.includes(item.guestBookId)));
            setTotalCount((prev) => prev - selectedItems.length);
            setIsModalOpen(false);
            setSelectedItems([]);
        } catch {
            // 서버 실패 시 → localStorage fallback
            if (selectedItems.length === 1) guestbooksApi.delete(selectedItems[0], null);
            else guestbooksApi.deleteMany(selectedItems);
            setRegistItems((prev) => prev.filter((item) => !selectedItems.includes(item.guestBookId)));
            setTotalCount((prev) => prev - selectedItems.length);
            setIsModalOpen(false);
            setSelectedItems([]);
            alert("삭제 완료 (오프라인 모드)");
        }
    };

    return (
        <>
            <div className="inner-wrapper">
                <Navigate title="방명록 관리" isAdmin />
                <Search setSearchValue={setSearchValue} searchValue={searchValue} />
                <div className="guestbook-title">
                    <p>전체 방명록 {totalCount}개</p>
                    <div className="delete-btn-wrapper">
                        <ButtonCancel
                            width="65px"
                            height="38px"
                            background="var(--gray-20)"
                            color="var(--white)"
                            border="none"
                            onClick={() => setSelectedItems([])}
                        >
                            취소
                        </ButtonCancel>
                        <ButtonEnroll
                            width="auto"
                            height="38px"
                            className="admin-guestbook-delete"
                            onClick={() => setIsModalOpen(true)}
                            disabled={selectedItems.length === 0}
                        >
                            삭제하기
                        </ButtonEnroll>
                    </div>
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
                            <AdminGuestBookItem
                                key={item.guestBookId}
                                id={item.guestBookId}
                                name={item.guestBookNickname}
                                content={item.guestBookInfo}
                                createdAt={formattedDate}
                                isRegist={true}
                                isSelected={selectedItems.includes(item.guestBookId)}
                                toggleSelect={() => toggleSelect(item.guestBookId)}
                                ref={isLastItem ? lastItemRef : null}
                            />
                        );
                    })
                ) : (
                    <div className="none-guestbook">등록된 방명록이 없습니다.</div>
                )}
            </section>
            <Modal
                className="delete-modal"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                title={
                    <>
                        선택한 방명록{" "}
                        <span style={{ color: "var(--primary)", fontWeight: "bold" }}>{selectedItems.length}개</span>를
                        <br />
                        삭제하시겠습니까?
                    </>
                }
                txt={`삭제 후 복구할 수 없습니다. \n정말 삭제하시겠어요?`}
            />
        </>
    );
};

export default AdminGuestbook;
