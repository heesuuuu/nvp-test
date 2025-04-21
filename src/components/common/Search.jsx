'use client';
import { useState } from "react";
import styled from "styled-components";

export const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    width: 351px;
    height: 51px;
    background-color: var(--white);
    padding: 15px;
    gap: 15px;
`;

export const StyledSearchInput = styled.input`
    width: 244px;
    border: none;
    outline: none;
    font-size: 14px;
    color: var(--black);
    &::placeholder {
        color: var(--gray-default);
    }
`;

export const Search = () => {
    const [searchValue, setSearchValue] = useState("");
    const valueDelete = () => {
        setSearchValue("");
    };
    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };
    return (
        <SearchWrapper>
            <StyledSearchInput
                type="text"
                placeholder="검색할 내용을 입력하세요."
                value={searchValue}
                onChange={handleInputChange}
            />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "right", gap: "15px" }}>
                {/* 삭제 아이콘 */}
                {searchValue && (
                    <div
                        onClick={valueDelete}
                        style={{
                            cursor: "pointer",
                        }}
                    >
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.5 0C11.6421 0 15 3.35786 15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0ZM10.1477 4.85225L10.0847 4.79779C9.8889 4.65255 9.62025 4.65076 9.4227 4.79241L9.35227 4.85225L7.5 6.70425L5.64775 4.85225L5.58466 4.79779C5.38892 4.65255 5.12026 4.65076 4.92271 4.79241L4.85225 4.85225L4.79779 4.91534C4.65255 5.11108 4.65076 5.37974 4.79241 5.57729L4.85225 5.64775L6.70425 7.5L4.85225 9.35227L4.79779 9.41535C4.65255 9.6111 4.65076 9.87975 4.79241 10.0773L4.85225 10.1477L4.91534 10.2022C5.11108 10.3474 5.37974 10.3492 5.57729 10.2076L5.64775 10.1477L7.5 8.29575L9.35227 10.1477L9.41535 10.2022C9.6111 10.3474 9.87975 10.3492 10.0773 10.2076L10.1477 10.1477L10.2022 10.0847C10.3474 9.8889 10.3492 9.62025 10.2076 9.4227L10.1477 9.35227L8.29575 7.5L10.1477 5.64775L10.2022 5.58466C10.3474 5.38892 10.3492 5.12026 10.2076 4.92271L10.1477 4.85225Z"
                                fill="#B8C1CF"
                            />
                        </svg>
                    </div>
                )}

                {/* 실선 */}
                <div
                    style={{
                        border: "0.5px solid var(--blue-50)",
                        height: "32px",
                        width: "0.5px",
                    }}
                ></div>

                {/* 돋보기 버튼 */}
                <div
                    style={{
                        cursor: "pointer",
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2 7C2 4.23858 4.23858 2 7 2C9.7614 2 12 4.23858 12 7C12 9.7614 9.7614 12 7 12C4.23858 12 2 9.7614 2 7ZM7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14C8.5723 14 10.0236 13.4816 11.1922 12.6064L16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L12.6064 11.1922C13.4816 10.0236 14 8.5723 14 7C14 3.13401 10.866 0 7 0Z"
                            fill="#61ADC4"
                        />
                    </svg>
                </div>
            </div>
        </SearchWrapper>
    );
};
