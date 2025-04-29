"use client";
import React, { useState } from "react";
import "../../../../scss/styles.scss";
import { CheckActive, CheckDefault } from "@/components/common/icon/AdminIcon";

const AdminGuestBookItem = ({ id, content, name, createdAt, isSelected, toggleSelect }) => {
    const getTimeAgo = (timestamp) => {
        const time = new Date(timestamp);
        const now = new Date();
        const diff = Math.floor((now - time) / 1000);

        if (diff < 60) return `${diff}초 전`;
        if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
        return `${Math.floor(diff / 86400)}일 전`;
    };

    return (
        <>
            <div onClick={toggleSelect} className="guestbook-wrapper">
                <div className="title-wrapper">
                    <div className="title-header">
                        <div className="name">{name}</div>
                        <div className="time">{getTimeAgo(createdAt)}</div>
                    </div>
                    <div>{isSelected ? <CheckActive /> : <CheckDefault />}</div>
                    {/* 선택시 버튼 svg */}
                    {/* <button>
                        <CheckActive/>
                    </button> */}
                </div>
                <div className="guestbook-desc">{content}</div>
            </div>
        </>
    );
};

export default AdminGuestBookItem;
