"use client";
import { ButtonCancel, ButtonEnroll } from "@/components/common/Button";
import { Search } from "@/components/common/Search";
import Navigate from "@/components/layout/navigate/Navigate";
import React, { useEffect, useState } from "react";
import "../../../scss/styles.scss";
import Modal from "@/components/layout/modal/page";
import AdminGuestBookItem from "./guestbookitem/page";

const AdminGuestbook = () => {
    
    const [guestbookItems, setGuestbookItems] = useState(() =>
        Array.from({ length: 10 }, (_, idx) => ({
            id: idx,
            name: `User${idx + 1}`,
            content: `방명록 내용 ${idx + 1}`,
            createdAt: new Date().toISOString(),
        }))
    );
    

    const [isModalOpen, setIsModalOpen] = useState(false);

    // search
    
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    // search filter
    const filterGuestbooks = guestbookItems.filter(
        (item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.content.toLowerCase().includes(searchValue.toLowerCase())
    );

    const handleDelete = () => {
        const updatedItems = guestbookItems.filter((item) => !selectedItems.includes(item.id));
        setIsModalOpen(false);
        setGuestbookItems(updatedItems);
        setSelectedItems([]);
    };

    return (
        <>
            <div className="inner-wrapper">
                <Navigate title="방명록 관리" isAdmin />
                <Search setSearchValue={setSearchValue} searchValue={searchValue} />
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
            {guestbookItems.length > 0 && (
                <section className="guestbook-list-wrapper">
                    {filterGuestbooks.map((item) => (
                        <AdminGuestBookItem
                            key={item.id}
                            id={item.id}
                            content={item.content}
                            isSelected={selectedItems.includes(item.id)}
                            isRegist={selectedItems.includes(item.id)}
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
            )}
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
