"use client"

import { useMemo } from "react"

type Props = {
  value: number // 0-100
  size?: number
  stroke?: number
  trackColor?: string
  progressColor?: string
  label?: string
}

export function RadialGauge({
  value,
  size = 44,
  stroke = 6,
  trackColor = "var(--border)",
  progressColor = "var(--color-primary)",
  label,
}: Props) {
  const radius = useMemo(() => (size - stroke) / 2, [size, stroke])
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius])
  const offset = useMemo(
    () => circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference,
    [circumference, value],
  )

  return (
    <div
      className="relative grid place-items-center"
      style={{ width: size, height: size }}
      aria-label={label ?? "probability gauge"}
      role="img"
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={stroke}
          strokeLinecap="round"
          opacity={0.5}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={progressColor}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 300ms ease" }}
        />
      </svg>
      <div className="pointer-events-none absolute text-[11px] font-semibold text-foreground">{Math.round(value)}%</div>
    </div>
  )
}
