import React from "react";

const Rank = () => {
    return (
        <>
            <div className="ranking-wrapper">
                <div className="position-wrapper">
                    <div className="position-img-wrapper">
                        <div className="position">
                            <img src="/images/Position/LeftRight.svg" alt="" />
                        </div>
                        <div className="position-title">레프트</div>
                    </div>

                    <div className="state-wrapper">
                        {/* 게이지 */}
                        <div className="gauge-wrapper"></div>

                        {/* 퍼센트 */}
                        <div className="percent">52%</div>
                    </div>
                </div>

                {/* 이동 버튼 */}
            </div>
        </>
    );
};

export default Rank;
