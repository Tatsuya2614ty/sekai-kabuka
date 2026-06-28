type SparklineProps = {
  positive: boolean;
  points?: number;
};

export default function Sparkline({
  positive,
  points,
}: SparklineProps) {
  const chartPoints = points
  ? points
      .map((price, index) => {
        const min = Math.min(...points);
        const max = Math.max(...points);

        const x = (index / (points.length - 1)) * 100;
        const y = 50 - ((price - min) / (max - min)) * 50;

        return `${x},${y}`;
      })
      .join(" ")
  : positive
    ? "0,40 20,30 40,35 60,20 80,25 100,10"
    : "0,10 20,20 40,15 60,30 80,25 100,40";

  return (
    <svg
      viewBox="0 0 100 50"
      className="sparkline"
      width="100%"
      height="70"
      preserveAspectRatio="none"
    >
      <polyline
        points={chartPoints}
        fill="none"
        stroke={positive ? "#22c55e" : "#ef4444"}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}