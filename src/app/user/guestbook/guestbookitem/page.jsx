"use client";
import React, { useState } from "react";
import "../../../../scss/styles.scss";
import Modal from "@/components/layout/modal/page";

const GuestBookItem = ({ name, content, createdAt }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const getTimeAgo = (timestamp) => {
        const time = new Date(timestamp);
        const now = new Date();
        const diff = Math.floor((now - time) / 1000);

        if (diff < 60) return `${diff}초 전`;
        if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
        return `${Math.floor(diff / 86400)}일 전`;
    };

    const handleDelete = () => {
        console.log("삭제 확인");
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="guestbook-wrapper">
                <div className="title-wrapper">
                    <div className="title-header">
                        <div className="name">{name}</div>
                        <div className="time">{getTimeAgo(createdAt)}</div>
                    </div>
                    <button onClick={() => setIsModalOpen(true)}>
                        <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1.45406 11.2729L11 1.72699"
                                stroke="#D2D9E3"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M1.45406 1.72707L11 11.273"
                                stroke="#D2D9E3"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onConfirm={handleDelete}
                        title="방명록을 삭제하시겠습니까?"
                        txt={`방명록 작성 시 설정한 비밀번호를 입력해 주세요 :)\n비밀번호가 일치해야 삭제가 완료됩니다.`}
                        showPasswordInput={true}
                    />
                </div>
                <div className="guestbook-desc">{content}</div>
            </div>
        </>
    );
};

export default GuestBookItem;
