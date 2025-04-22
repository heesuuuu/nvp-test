"use client";
import styled from "styled-components";
import React from "react";

const Button = () => {
    return (
        <div
            style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                borderRadius: "3px",
                width: "351px",
                height: "51px",
                backgroundColor: "var(--gray-20)",
            }}
        ></div>
    );
};

export default Button;

////////////////////////////////////
//기본 버튼
////////////////////////////////////

export const ButtonDefault = styled.button`
    background-color: ${(props) => props.background || "var(--primary)"};
    color: ${(props) => props.fontColor || "var(--white)"};
    width: 351px;
    height: 51px;
    /* padding: 8px 16px; */
    border: none;
    border-radius: 7px;
    cursor: pointer;
    /* font-weight: 600; */
    font-size: ${(props) => props.fontSize || "13px"};
    font-family: ${(props) => props.fontFamily || "var(--font-family-base)"};

    &:hover {
        background-color: ${(props) => props.backgroundColor || "var(--active)"};
        color: var(--white);
    }
    &:active {
        background-color: ${(props) => props.backgroundColor || "var(--active)"};
        color: var(--white);
    }
`;

////////////////////////////////////
//취소 버튼
////////////////////////////////////

export const ButtonCancel = styled.button`
    background-color: ${(props) => props.background || "transparent"};
    color: ${(props) => props.color || "var(--primary)"};
    width: ${(props) => props.width || "351px"};
    height: ${(props) => props.height || "51px"};
    /* padding: 8px 16px; */
    border: 1px solid var(--blue-80);
    border-radius: 7px;
    cursor: pointer;
    /* font-weight: 600; */
    font-size: ${(props) => props.fontSize || "13px"};

    &:hover {
        background-color: ${(props) => props.backgroundColor || "var(--blue-80)"};
    }
`;

////////////////////////////////////
//이전 버튼
////////////////////////////////////

export const PrevBtn = () => {
    return (
        <div
            style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                borderRadius: "3px",
                width: "41px",
                height: "29px",
                backgroundColor: "var(--gray-20)",
                cursor: "pointer",
            }}
        >
            <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M5.25 0.75L1.25204 5.41429C0.963147 5.75133 0.963147 6.24867 1.25204 6.58571L5.25 11.25"
                    stroke="white"
                    strokeWidth="1.125"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
};

////////////////////////////////////
// 작성 버튼
////////////////////////////////////

const StyledWrithButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    width: 38px;
    height: 38px;
    border-radius: 7px;
    background-color: var(--white);
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: var(--blue-50); // 원하는 hover 색상
    }
    &:active {
        background-color: var(--blue-50); // 원하는 hover 색상
    }
`;

export const WrithButton = () => {
    return (
        <StyledWrithButton>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.5332 3.25198C11.1186 2.66575 12.068 2.66539 12.6538 3.25118L14.5227 5.12007C15.1034 5.70086 15.1095 6.64109 14.5362 7.22929L13.2913 8.50659L9.28589 4.50122L10.5332 3.25198ZM8.491 5.29732L12.506 9.31229L7.61133 14.3342C7.18801 14.7686 6.60741 15.0135 6.00116 15.0134L3.93705 15.0134C3.29742 15.0133 2.78661 14.4801 2.81352 13.8406L2.90213 11.7338C2.92583 11.1704 3.16 10.6364 3.5583 10.2375L8.491 5.29732ZM15.3861 15.5214C15.6967 15.5214 15.9484 15.2694 15.9484 14.9586C15.9484 14.6479 15.6967 14.3959 15.3861 14.3959H10.7948C10.4843 14.3959 10.2325 14.6479 10.2325 14.9586C10.2325 15.2694 10.4843 15.5214 10.7948 15.5214H15.3861Z"
                    fill="#61ADC4"
                />
            </svg>
        </StyledWrithButton>
    );
};

////////////////////////////////////
// Scroll Button
////////////////////////////////////

const StyledScrollButton = styled.svg`
    cursor: pointer;
    opacity: 0.72;
    transition: opacity 0.2s ease;

    &:active {
        opacity: 1; /* 클릭(누르고 있는 중) 상태에서 더 선명하게 */
    }
`;
export const ScrollButton = () => {
    return (
        <StyledScrollButton
            style={{}}
            width="40"
            height="40"
            cursor="pointer"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M40 20C40 8.95431 31.0457 1.06779e-07 20 2.38498e-07C8.95431 3.70216e-07 1.06779e-07 8.95431 2.38498e-07 20C3.70216e-07 31.0457 8.95431 40 20 40C31.0457 40 40 31.0457 40 20ZM19.7332 18.1986C19.931 17.9856 20.2682 17.9856 20.466 18.1986L25.5004 23.6203C26.0641 24.2274 27.0132 24.2625 27.6203 23.6988C28.2274 23.1351 28.2625 22.186 27.6988 21.5789L22.6644 16.1573C21.2797 14.666 18.9195 14.666 17.5348 16.1573L12.5004 21.5789C11.9367 22.186 11.9719 23.1351 12.5789 23.6988C13.186 24.2625 14.1351 24.2274 14.6988 23.6203L19.7332 18.1986Z"
                fill="#61ADC4"
                fillOpacity="1"
            />
        </StyledScrollButton>
    );
};

////////////////////////////////////
/* 관리자 */
////////////////////////////////////

// 수정 버튼
const StyledEditButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    width: 38px;
    height: 38px;
    border: 1px solid var(--primary);
    border-radius: 7px;
    background-color: var(--white);
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: var(--hover); // 원하는 hover 색상
    }
    &:active {
        background-color: var(--secondary); // 원하는 hover 색상
    }
`;
export const EditButton = () => {
    return (
        <StyledEditButton>
            <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10.4183 0.786186C11.4664 -0.262021 13.1657 -0.262066 14.2139 0.786074C15.262 1.83412 15.262 3.53334 14.214 4.58146L13.5451 5.25045L9.74962 1.45495L10.4183 0.786186ZM8.95417 2.2505L1.45577 9.74977C1.15102 10.0546 0.936824 10.4379 0.836999 10.8571L0.0153066 14.3083C-0.0299334 14.4983 0.0266391 14.6982 0.164759 14.8363C0.302887 14.9744 0.502777 15.031 0.692796 14.9857L4.14373 14.1641C4.56313 14.0642 4.94659 13.8499 5.25143 13.5451L6.11475 12.6817C6.0396 12.3416 6 11.9881 6 11.6255C6 8.9331 8.18257 6.75045 10.875 6.75045C11.2375 6.75045 11.5907 6.79005 11.9306 6.86512L12.7496 6.04597L8.95417 2.2505ZM8.4579 8.98237C8.694 9.8001 8.2032 10.6501 7.377 10.8545L6.93885 10.963C6.90517 11.1787 6.8877 11.4001 6.8877 11.6257C6.8877 11.8617 6.90682 12.0931 6.94365 12.3183L7.3482 12.4157C8.18265 12.6166 8.67862 13.4754 8.4357 14.2985L8.29597 14.772C8.62537 15.0613 9.00067 15.2961 9.40912 15.4632L9.7791 15.0742C10.3705 14.4522 11.3622 14.4523 11.9534 15.0745L12.3274 15.4681C12.7351 15.3029 13.1101 15.0703 13.4395 14.7834L13.291 14.269C13.0549 13.4513 13.5457 12.6012 14.3719 12.3968L14.8097 12.2885C14.8434 12.0727 14.8609 11.8513 14.8609 11.6257C14.8609 11.3896 14.8417 11.1582 14.8049 10.933L14.4007 10.8356C13.5663 10.6347 13.0703 9.77595 13.3132 8.95282L13.4528 8.47965C13.1235 8.19037 12.7481 7.95547 12.3397 7.7883L11.9698 8.17725C11.3785 8.79915 10.3867 8.799 9.79552 8.17687L9.42142 7.7832C9.0138 7.94835 8.6388 8.18092 8.30932 8.46772L8.4579 8.98237ZM10.8743 12.7507C10.2738 12.7507 9.78705 12.247 9.78705 11.6257C9.78705 11.0044 10.2738 10.5007 10.8743 10.5007C11.4748 10.5007 11.9615 11.0044 11.9615 11.6257C11.9615 12.247 11.4748 12.7507 10.8743 12.7507Z"
                    fill="#61ADC4"
                />
            </svg>
        </StyledEditButton>
    );
};

////////////////////////////////////
// 페이지 이동 버튼 (Number)
////////////////////////////////////

export const NumberButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--white);
    color: var(--black);
    width: ${(props) => props.width || "25px"};
    height: ${(props) => props.height || "25px"};
    padding: 10px;
    border: none;
    border-radius: 7px;
    font-size: 13px;
    &:hover {
        background-color: var(--hover);
    }
    &:active {
        background-color: var(--primary);
        color: var(--white);
    }
`;
