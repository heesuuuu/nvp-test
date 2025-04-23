"use client";
import { useState } from "react";
import styled from "styled-components";

const InputField = () => {
    return <div></div>;
};

export default InputField;

////////////////////////////////////
//기본 Input
////////////////////////////////////

export const InputDefault = styled.input`
    background-color: ${(props) => props.background || "var(--white)"};
    color: var(--black);
    width: ${(props) => props.width || "351px"};
    height: ${(props) => props.height || "51px"};
    padding: 15px;
    border: ${(props) => props.border || "none"};
    border-radius: 10px;
    font-size: 14px;
    font-weight: 200;
    transition: border 0.2s ease;

    &::placeholder {
        color: var(--gray-default);
    }
    &:focus {
        outline: none;
        border: 1px solid var(--primary);
    }
`;

////////////////////////////////////
//Textarea
////////////////////////////////////

export const InputTextarea = styled.textarea`
    background-color: ${(props) => props.background || "var(--white)"};
    color: var(--black);
    width: ${(props) => props.width || "351px"};
    height: ${(props) => props.height || "225px"};
    padding: 15px;
    border: ${(props) => props.border || "none"};
    border-radius: 10px;
    font-size: 14px;
    font-weight: 200;
    resize: none;
    overflow-y: auto;
    vertical-align: top;
    &::placeholder {
        color: var(--gray-default);
    }
    &:focus {
        outline: none;
        border: 1px solid var(--primary);
    }
`;

////////////////////////////////////
/* 관리자 */
////////////////////////////////////

// 질문지 수정 input
export const InputEdit = styled.input`
    background-color: var(--white);
    color: var(--black);
    width: ${(props) => props.width || "351px"};
    height: ${(props) => props.height || "51px"};
    padding: 15px;
    border: 1px solid transparent;
    border-bottom: 1px solid var(--blue-80);
    font-size: 14px;
    transition: border 0.2s ease;
    &::placeholder {
        color: var(--gray-default);
    }
    &:focus {
        outline: none;
        border: 1px solid var(--primary);
    }
`;

////////////////////////////////////
// 비밀번호 입력
////////////////////////////////////
export const PasswordWrapper = styled.div`
    display: flex;
    /* align-items: center; */
    justify-content: space-between;
    border-radius: 10px;
    width: ${(props) => props.width || "351px"};
    height: 51px;
    background-color: ${(props) => props.background || " var(--white)"};
    padding: 15px;
    gap: 15px;
    /* border: ${(props) => (props.$focused ? "1px solid var(--primary)" : "none")}; */
    border: none;
    transition: border 0.2s ease;

    &:focus-within {
        border: 1px solid var(--primary);
    }
`;

export const StyleInputPassword = styled.input`
    width: 100%;
    border: none;
    outline: none;
    font-size: 14px;
    color: var(--black);
    &::placeholder {
        color: var(--gray-default);
    }
`;

export const InputPassword = ({ value, onChange, placeholder, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisible = () => {
        setShowPassword((prev) => !prev);
    };
    return (
        <PasswordWrapper>
            <StyleInputPassword
                type={showPassword ? "text" : "password"}
                placeholder={placeholder || "비밀번호를 입력해 주세요"}
                value={value}
                onChange={onChange}
                {...props}
            />
            <div
                style={{
                    cursor: "pointer",
                }}
                onClick={togglePasswordVisible}
                aria-label="비밀번호 보기 토글"
            >
                {showPassword ? (
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.37492 7.25346C11.0317 7.25346 12.3749 8.59662 12.3749 10.2534C12.3749 11.9103 11.0317 13.2535 9.37492 13.2535C7.71805 13.2535 6.3749 11.9103 6.3749 10.2534C6.3749 8.59662 7.71805 7.25346 9.37492 7.25346ZM9.37492 4.625C12.835 4.625 15.822 6.98751 16.6507 10.2983C16.7262 10.5996 16.543 10.9051 16.2417 10.9806C15.9403 11.056 15.6349 10.8729 15.5594 10.5715C14.8552 7.75847 12.3159 5.75 9.37492 5.75C6.43261 5.75 3.89248 7.76019 3.18955 10.5749C3.11428 10.8762 2.80892 11.0596 2.50752 10.9843C2.20612 10.909 2.0228 10.6037 2.09807 10.3023C2.92539 6.98954 5.91327 4.625 9.37492 4.625Z"
                            fill="#212121"
                        />
                    </svg>
                ) : (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1.66475 1.66475C1.46505 1.86445 1.4469 2.17695 1.61029 2.39716L1.66475 2.46025L4.69068 5.48617C3.24919 6.49828 2.17183 8.00992 1.72416 9.7983C1.64873 10.0996 1.83188 10.4051 2.13323 10.4806C2.4346 10.5559 2.74005 10.3729 2.81549 10.0714C3.2126 8.48512 4.19334 7.1546 5.50062 6.29589L6.85784 7.65322C6.32721 8.19435 6 8.93572 6 9.75345C6 11.4103 7.34314 12.7534 9 12.7534C9.8178 12.7534 10.5591 12.4262 11.1003 11.8956L15.5398 16.3352C15.7594 16.5549 16.1156 16.5549 16.3352 16.3352C16.535 16.1356 16.5531 15.823 16.3897 15.6028L16.3352 15.5398L11.7501 10.9541L11.751 10.953L6.53908 5.74336L6.54 5.742L5.69004 4.89412L2.46025 1.66475C2.24058 1.44508 1.88442 1.44508 1.66475 1.66475ZM9 4.125C8.24977 4.125 7.52183 4.23605 6.83332 4.44375L7.76107 5.37089C8.16292 5.29149 8.5773 5.25 9 5.25C11.9423 5.25 14.4824 7.26019 15.1853 10.0749C15.2606 10.3762 15.5659 10.5595 15.8674 10.4843C16.1688 10.409 16.3521 10.1037 16.2768 9.80227C15.4496 6.48954 12.4616 4.125 9 4.125ZM9.14603 6.75696L11.997 9.6075C11.9207 8.06482 10.6854 6.83073 9.14603 6.75696Z"
                            fill="#212121"
                        />
                    </svg>
                )}
            </div>
        </PasswordWrapper>
    );
};
