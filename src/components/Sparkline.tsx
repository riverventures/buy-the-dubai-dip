'use client'

interface SparklineProps {
  data: number[]
  width?: number
  height?: number
  color?: string
}

export default function Sparkline({ data, width = 80, height = 24, color }: SparklineProps) {
  if (data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  // Dynamic color: green if price went up over the period, red if down
  const dynamicColor = color ?? (data[data.length - 1] >= data[0] ? '#10b981' : '#ef4444')

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((val - min) / range) * (height - 4) - 2
    return `${x},${y}`
  })

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="inline-block">
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={dynamicColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
