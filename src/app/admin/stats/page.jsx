import React from "react";
import "../../../scss/styles.scss";
import Navigate from "@/components/layout/navigate/Navigate";
import ChartComponent from "@/components/chartComponent/ChartComponent";

const stats = () => {
    const seriesData = [30, 40, 35, 50];
    const total = seriesData.reduce((acc, cur) => acc + cur, 0);
    return (
        <div className="inner">
            <Navigate />
            <div className="all-test">
                <p>총 테스트 인원</p>
          <div>{total.toLocaleString()}명</div>
            </div>
            <section>
                <div className="statis-title">포지션 결과</div>
                <div className="pie">
                    <ChartComponent data={seriesData} />
                </div>
            </section>
        </div>
    );
};

export default stats;
