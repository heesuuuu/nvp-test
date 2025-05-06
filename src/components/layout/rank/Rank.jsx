import React from "react";

const Rank = (name, percent) => {
    return (
        <>
            <div className="ranking-wrapper">
                <div className="position-wrapper">
                    <div className="position-img-wrapper">
                        <div className="position">
                            <img src="/images/Position/LeftRight.png" alt="" />
                        </div>
                        <div className="position-title">{name}</div>
                    </div>

                    <div className="state-wrapper">
                        {/* 게이지 */}
                        <div
                            className="gauge-wrapper"
                            style={{ width: `${percent}%`, backgroundColor: "var(--primary)" }}
                        ></div>

                        {/* 퍼센트 */}
                        <div className="percent">{percent}%</div>
                    </div>
                </div>

                {/* 이동 버튼 */}
            </div>
        </>
    );
};

export default Rank;
