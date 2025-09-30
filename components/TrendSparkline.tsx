interface TrendSparklineProps {
  points: number[];
}

export const TrendSparkline: React.FC<TrendSparklineProps> = ({ points }) => {
  if (!points.length) return null;
  const width = 120;
  const height = 40;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const path = points
    .map((value, index) => {
      const x = (index / (points.length - 1 || 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Trend sparkline">
      <path d={path} fill="none" stroke="#2563eb" strokeWidth={2} />
    </svg>
  );
};
