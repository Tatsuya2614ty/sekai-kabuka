"use client";

import { useEffect, useState } from "react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type ChartPoint = {
    date: string;
    close: number;
};

type FredDetailChartProps = {
    seriesId: string;
};

export default function FredDetailChart({
    seriesId,
}: FredDetailChartProps) {
    const [chartData, setChartData] = useState<ChartPoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // fetch data
    useEffect(() => {
        async function loadChartData() {
            try {
                setLoading(true);
                setError("");

                const encodedSeriesId =
                    encodeURIComponent(seriesId);

                const response = await fetch(
                    `/api/fred-chart?seriesId=${encodedSeriesId}`
                );

                if (!response.ok) {
                    throw new Error("Failed to load FRED chart data.");
                }

                const data = await response.json();

                setChartData(data.chartData);
            } catch {
                setError("The chart could not be loaded.");
            } finally {
                setLoading(false);
            }
        }

        loadChartData();
    }, [seriesId]);
    // show loading message
    if (loading) {
        return (
            <div className="yahoo-chart-message">
                Loading chart...
            </div>
        );
    }

    // show error message
    if (error) {
        return (
            <div className="yahoo-chart-message yahoo-chart-error">
                {error}
            </div>
        );
    }

    // show empty-data message
    if (chartData.length === 0) {
        return (
            <div className="yahoo-chart-message">
                No chart data is available.
            </div>
        );
    }

    return (
        <div
            className="yahoo-detail-chart"
            style={{
                width: "100%",
                height: "600px",
                marginTop: "24px",
            }}
        >
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={chartData}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 10,
                        left: 10,
                    }}
                >
                    <defs>
                        <linearGradient
                            id="yahooChartGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#089981"
                                stopOpacity={0.4}
                            />
                            <stop
                                offset="95%"
                                stopColor="#089981"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        stroke="rgba(255, 255, 255, 0.08)"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="date"
                        stroke="#888888"
                        tickLine={false}
                        axisLine={false}
                        minTickGap={30}
                    />

                    <YAxis
                        stroke="#888888"
                        tickLine={false}
                        axisLine={false}
                        domain={["auto", "auto"]}
                        width={60}
                    />

                    <Tooltip />

                    <Area
                        type="monotone"
                        dataKey="close"
                        stroke="#089981"
                        strokeWidth={2}
                        fill="url(#yahooChartGradient)"
                        dot={false}
                        activeDot={{ r: 4 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}