import React from "react"
import { Link } from "gatsby"
import PlayIcon from "assets/play.svg"

import "./index.scss"

export default ({ title, date, slug, duration, active }) => (
  <Link
    to={`/${slug}`}
    activeClassName="episode-item active"
    className={active ? "episode-item active" : "episode-item"}
    aria-label="View blog page"
  >
    <div className="icon">
      <PlayIcon height="40px" width="40px" />
    </div>
    <div>
      <h2>{title}</h2>
      <p>
        {duration} | {date}
      </p>
    </div>
  </Link>
)

// const PlayIcon = () => (
//   <svg
//     id="Capa_1"
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 350 350"
//     height="50px"
//     width="50px"
//   >
//     <path d="M175,0C78.343,0,0,78.343,0,175c0,96.656,78.343,175,175,175c96.656,0,175-78.344,175-175C350,78.343,271.656,0,175,0z M258.738,189.05l-104.386,71.812c-2.904,1.989-6.284,3.006-9.673,3.006c-2.728,0-5.436-0.648-7.93-1.951	c-5.605-2.965-9.125-8.777-9.125-15.103V103.188c0-6.326,3.52-12.139,9.125-15.104c5.605-2.94,12.377-2.535,17.603,1.055	l104.386,71.811c4.619,3.18,7.387,8.441,7.387,14.05C266.125,180.609,263.358,185.87,258.738,189.05z" />
//   </svg>
// )
