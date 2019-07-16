import React from "react"

export const LikeIcon = props => (
  <svg width="1.5em" height="1.5em" viewBox="0 0 18 18" fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.336 3.387a4.443 4.443 0 0 1 6.449 0L9 3.61l.215-.223a4.443 4.443 0 0 1 6.45 0c1.78 1.848 1.78 4.846 0 6.695L9 17l-6.664-6.918c-1.781-1.85-1.781-4.847 0-6.695z"
      fill="url(#prefix__paint0_linear)"
    />
    <defs>
      <linearGradient
        id="prefix__paint0_linear"
        x1={1}
        y1={9.5}
        x2={17}
        y2={9.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#A109D5" />
        <stop offset={1} stopColor="#D9147D" />
      </linearGradient>
    </defs>
  </svg>
)
export const DisLikeIcon = props => (
  <svg width="1.5em" height="1.5em" viewBox="0 0 18 18" fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.336 3.387a4.443 4.443 0 0 1 6.449 0L9 3.61l.215-.223a4.443 4.443 0 0 1 6.45 0c1.78 1.848 1.78 4.846 0 6.695L9 17l-6.664-6.918c-1.781-1.85-1.781-4.847 0-6.695z"
      fill="#fff"
    />
  </svg>
)
