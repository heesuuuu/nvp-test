'use client'
import React, { useEffect, useState } from "react";
import "../../../scss/styles.scss";
import Navigate from "@/components/layout/navigate/Navigate";
import ChartComponent from "@/components/chartComponent/ChartComponent";
import api from "@/utils/axios";

const stats = () => {
    // const seriesData = [30, 40, 35, 50];
    const [seriesData, setSeriesData] = useState([0, 0, 0, 0]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get("/v1/admins/results")
                const resultData = res.data.data;

                setTotal(resultData.total)
                const positions = resultData.resultStatus;

                setSeriesData([
                    positions.LEFT || 0,
                    positions.LIBERO || 0,
                    positions.SETTER || 0,
                    positions.CENTER || 0,
                ])
            } catch (error) {
                console.error("포지션 통계 불러오기 실패",error);
                
            }
        }
        fetchStats()
    },[])
    return (
        <div className="inner">
            <Navigate title="포지션 통계" isAdmin />
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
