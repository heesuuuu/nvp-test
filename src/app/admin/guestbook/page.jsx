"use client";
import { ButtonCancel, ButtonEnroll } from "@/components/common/Button";
import { Search } from "@/components/common/Search";
import Navigate from "@/components/layout/navigate/Navigate";
import React, { useEffect, useState } from "react";
import "../../../scss/styles.scss";
import Modal from "@/components/layout/modal/page";
import AdminGuestBookItem from "./guestbookitem/page";
import api from "@/utils/axios";
import { format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

const AdminGuestbook = () => {
    const [registItems, setRegistItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchGuestbooks = async () => {
            try {
                const res = await api.get("/v1/admins/guestbooks");
                console.log("방명록 목록 ", res.data);
                setRegistItems(res.data.data);
            } catch (error) {
                console.error("방명록 목록 불러오기 실패", error);
            }
        };
        fetchGuestbooks();
    }, []);

    // search

    const [selectedItems, setSelectedItems] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const toggleSelect = (id) => {
        setSelectedItems(
            (prev) =>
                prev.includes(id)
                    ? prev.filter((itemId) => itemId !== id) // 선택 해제
                    : [...prev, id] // 선택 추가
        );
    };

    const handleDelete = async () => {
        try {
            if (selectedItems.length === 1) {
                await api.delete(`/v1/admins/guestbooks/${selectedItems[0]}`);
            } else {
                await api.delete("/v1/admins/guestbooks", {
                    data: { guestBookIds: selectedItems },
                });
            }

            const updatedItems = registItems.filter((item) => !selectedItems.includes(item.guestBookId));
            setIsModalOpen(false);
            setRegistItems(updatedItems);
            setSelectedItems([]);
        } catch (error) {
            console.error("방명록 삭제 실패", error);
            alert("삭제 실패");
        }
    };
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
                <Navigate title="방명록 관리" isAdmin />
                <Search setSearchValue={setSearchValue} searchValue={searchValue} />
                <div className="guestbook-title">
                    <p>선택항목 {registItems.length}개</p>
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
                    <>
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
                                <AdminGuestBookItem
                                    key={item.guestBookId}
                                    id={item.guestBookId}
                                    name={item.guestBookNickname}
                                    content={item.guestBookInfo}
                                    createdAt={formattedDate}
                                    isRegist={true}
                                    isSelected={selectedItems.includes(item.guestBookId)}
                                    toggleSelect={() => toggleSelect(item.guestBookId)}
                                />
                            );
                        })}
                    </>
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
