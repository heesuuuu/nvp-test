import React from "react";
import "../../../../scss/styles.scss";

const GuestBookItem = () => {
    return (
        <>
            <div className="guestbook-wrapper">
                <div className="title-wrapper">
                    <div className="title-header">
                        <div className="name">이름</div>
                        <div className="time">3시간 전</div>
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
                                strokWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
                <div className="guestbook-desc">채류니 바보</div>
            </div>
        </>
    );
};

export default GuestBookItem;
