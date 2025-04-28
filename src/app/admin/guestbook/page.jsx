"use client";
import { ButtonCancel, ButtonEnroll } from "@/components/common/Button";
import { Search } from "@/components/common/Search";
import Navigate from "@/components/layout/navigate/Navigate";
import React, { useState } from "react";
import "../../../scss/styles.scss";
import Modal from "@/components/layout/modal/page";
import AdminGuestBookItem from "./guestbookitem/page";

const AdminGuestbook = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
     const initialGuestbooks = Array.from({ length: 10 }, (_, idx) => ({
         id: idx,
         name: `User${idx + 1}`,
         createdAt: new Date().toISOString(),
     }));
    const [guestbookItems, setGuestbookItems] = useState(initialGuestbooks);
    const handleDelete = () => {
        const updatedItems = guestbookItems.filter((item) => !selectedItems.includes(item.id));
        setIsModalOpen(false);
        setGuestbookItems(updatedItems);
        setSelectedItems([]);
    };
    const [selectedItems, setSelectedItems] = useState([]);

    return (
        <>
            <div className="inner-wrapper">
                <Navigate />
                <Search />
                <div className="guestbook-title">
                    <p>선택항목 {selectedItems.length}개</p>
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
                {guestbookItems.map((item) => (
                    <AdminGuestBookItem
                        key={item.id}
                        id={item.id}
                        isSelected={selectedItems.includes(item.id)}
                        name={item.name}
                        createdAt={item.createdAt}
                        toggleSelect={() => {
                            if (selectedItems.includes(item.id)) {
                                setSelectedItems((prev) => prev.filter((id) => id !== item.id));
                            } else {
                                setSelectedItems((prev) => [...prev, item.id]);
                            }
                        }}
                    />
                ))}
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
