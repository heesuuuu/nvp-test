"use client";
import { ButtonCancel, ButtonDefault } from "@/components/common/Button";
import { Search } from "@/components/common/Search";
import Navigate from "@/components/layout/navigate/Navigate";
import React, { useState } from "react";
import "../../../scss/styles.scss";
import Modal from "@/components/layout/modal/page";
import AdminGuestBookItem from "./guestbookitem/page";

const AdminGuestbook = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleDelete = () => {
        console.log("삭제 확인");
        setIsModalOpen(false);
    };
  const [selectedItems, setSelectedItems] = useState([
      
    ]);

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
                        <ButtonDefault
                            width="auto"
                            height="38px"
                            className="admin-guestbook-delete"
                            onClick={() => setIsModalOpen(true)}
                        >
                            삭제하기
                        </ButtonDefault>
                    </div>
                </div>
            </div>
            <section className="guestbook-list-wrapper">
                {[...Array(10)].map((_, idx) => (
                    <AdminGuestBookItem
                        key={idx}
                        id={idx}
                        isSelected={selectedItems.includes(idx)}
                        name={`User${idx + 1}`}
                        createdAt={new Date().toISOString()}
                        toggleSelect={() => {
                            if (selectedItems.includes(idx)) {
                                setSelectedItems((prev) => prev.filter((item) => item !== idx));
                            } else {
                                setSelectedItems((prev) => [...prev, idx]);
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
                        선택한 방명록 <span style={{ color: "var(--primary)", fontWeight: "bold" }}>5개</span>를<br />
                        삭제하시겠습니까?
                    </>
                }
                txt={`삭제 후 복구할 수 없습니다. \n정말 삭제하시겠어요?`}
            />
        </>
    );
};

export default AdminGuestbook;
