"use client";
import React, { forwardRef, useState } from "react";
import "../../../../scss/styles.scss";
import { CheckActive, CheckDefault } from "@/components/common/icon/AdminIcon";

const AdminGuestBookItem = forwardRef((props, ref) => {
    const { id, content, name, createdAt, isRegist, isSelected, toggleSelect } = props;

    return (
        <div ref={ref} onClick={toggleSelect} className="guestbook-wrapper">
            <div className="title-wrapper">
                <div className="title-header">
                    <div className="name">{name}</div>
                    <div className="time">{createdAt}</div>
                </div>
                <div>{isSelected ? <CheckActive /> : <CheckDefault />}</div>
            </div>
            <div className="guestbook-desc">{content}</div>
        </div>
    );
});

export default AdminGuestBookItem;
