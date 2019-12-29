import React from "react"
import { navigate } from "gatsby"

const episodes = [
  {
    title: "Women In Tech",
    description:
      "In this episode of GeeksBlabla, our guests discuss how we can empower women in moroccan.",
    url: "/",
  },
  {
    title: "Women In Tech",
    description:
      "In this episode of GeeksBlabla, our guests discuss how we can empower women in moroccan.",
    url: "/",
  },
  {
    title: "Women In Tech",
    description:
      "In this episode of GeeksBlabla, our guests discuss how we can empower women in moroccan.",
    url: "/",
  },
]

const colors = [
  ["#A109D5", "#D9147D"],
  ["#9a0ecf", "#6146BD"],
  ["#09D0AF", "#4695BD"],
]

export default () => {
  return (
    <div className="container top-episodes">
      <h2>Top episodes</h2>
      <div className="episodes">
        {episodes.map((e, i) => (
          <EpisodeCard {...e} key={`episode${i}`} item={i} />
        ))}
      </div>
    </div>
  )
}

const EpisodeCard = ({ title, description, url, item }) => (
  <div className={`item item-${item + 1}`} onClick={() => navigate(url)}>
    <PlayIcon item={item} />
    <h3> {title} </h3>
    <p>{description}</p>
  </div>
)

const PlayIcon = ({ item }) => {
  const stop1 = colors[item][0]
  const stop2 = colors[item][1]
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="62"
      height="62"
      fill="none"
      viewBox="0 0 62 62"
    >
      <rect
        width="62"
        height="62"
        fill={`url(#paint${item}_linear)`}
        rx="31"
      ></rect>
      <path
        fill="#fff"
        d="M40.441 31.866a1 1 0 000-1.732L27.03 22.391a1 1 0 00-1.5.866v15.486a1 1 0 001.5.866l13.412-7.743z"
      ></path>
      <defs>
        <linearGradient
          id={`paint${item}_linear`}
          x1="0"
          x2="62"
          y1="31"
          y2="31"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={stop1}></stop>
          <stop offset="1" stopColor={stop2}></stop>
        </linearGradient>
      </defs>
    </svg>
  )
}
