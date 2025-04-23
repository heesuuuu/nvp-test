import React from "react";
import "../../../../scss/styles.scss";

const GuestBookItem = ({ name, content, createdAt }) => {
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
        <div className="guestbook-wrapper">
            <div className="title-wrapper">
                <div className="title-header">
                    <div className="name">{name}</div>
                    <div className="time">{getTimeAgo(createdAt)}</div>
                </div>
                <button>
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
            </div>
            <div className="guestbook-desc">{content}</div>
        </div>
    );
};

export default GuestBookItem;
