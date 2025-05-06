"use client";
import React, { useState } from "react";
import "../../../../scss/styles.scss";
import { CheckActive, CheckDefault } from "@/components/common/icon/AdminIcon";

const AdminGuestBookItem = ({ id, content, name, createdAt, isSelected, toggleSelect }) => {
    return (
        <>
            <div onClick={toggleSelect} className="guestbook-wrapper">
                <div className="title-wrapper">
                    <div className="title-header">
                        <div className="name">{name}</div>
                        <div className="time">{createdAt}</div>
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
