"use client";

import { useId, useMemo } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  YAxis,
} from "recharts";

type SparklineProps = {
  positive: boolean;
  points?: number[];
};

type ChartPoint = {
  value: number;
};

const positiveFallback = [
  40, 38, 42, 39, 43, 41, 46, 44, 48, 52, 50, 55,
  58, 56, 60, 62, 59, 64, 67, 65, 70, 68, 72, 75,
  73, 78, 76, 80, 84, 81, 86, 89, 87, 91, 88, 86,
  90, 87, 89, 84, 82, 85, 80, 83, 81, 79, 82, 84,
];

const negativeFallback = [...positiveFallback].reverse();

export default function Sparkline({
  positive,
  points,
}: SparklineProps) {
  const id = useId();
  const gradientId = `sparkline-${id.replace(/:/g, "")}`;

  const chartData = useMemo<ChartPoint[]>(() => {
    const validPoints =
      points?.filter((point) => Number.isFinite(point)) ?? [];

    const values =
      validPoints.length > 1
        ? validPoints
        : positive
          ? positiveFallback
          : negativeFallback;

    return values.map((value) => ({
      value,
    }));
  }, [points, positive]);

  const values = chartData.map((item) => item.value);

  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const range = maximum - minimum || 1;
  const padding = range * 0.08;

  const color = positive ? "#089981" : "#f23645";

  return (
    <div className="sparkline-wrapper">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{
            top: 6,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={color}
                stopOpacity={0.28}
              />

              <stop
                offset="55%"
                stopColor={color}
                stopOpacity={0.12}
              />

              <stop
                offset="100%"
                stopColor={color}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <YAxis
            hide
            domain={[
              minimum - padding,
              maximum + padding,
            ]}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            fillOpacity={1}
            baseValue="dataMin"
            dot={false}
            activeDot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}