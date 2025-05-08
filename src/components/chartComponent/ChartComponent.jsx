"use client";

import React from "react";
import dynamic from "next/dynamic";
import "../../scss/styles.scss";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ChartComponent = ({ data = [0, 0, 0, 0] }) => {
    const chartOptions = {
        options: {
            chart: {
                type: "pie",
                width: 300,
                toolbar: {
                    download: true,
                },
            },
            color: ["#61ADC4"],
        },
        labels: ["공격(Left)", "수비(Libero)", "세터(Setter)", "센터(Center)"],
        dataLabels: {
            formatter: function (val, opts) {
                const seriesValue = opts.w.config.series[opts.seriesIndex];
                return `${Math.round(seriesValue)}명`;
            },
        },
        legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontSize: "14px",
            floating: false,
            itemMargin: {
                horizontal: 15,
                vertical: 8,
            },
            markers: {
                width: 12,
                height: 12,
                radius: 12,
            },
        },
    };

    return (
        <div className="chart-container">
            <ApexChart options={chartOptions} series={data} type="pie" height={320} />
            <div id="html-dist"></div>
        </div>
    );
};

export default ChartComponent;
