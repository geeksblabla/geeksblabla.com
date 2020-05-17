// import { ToggleMode } from "components/Mode"
import React from "react"
import ThemeToggle from "components/Theme/ThemeToggle"
import { Link } from "gatsby"
import Spotify from "assets/spotify.svg"
import ApplePodcast from "assets/apple-podcast.svg"
import GooglePodcast from "assets/google-podcast.svg"

export default ({ id }) => (
  <>
    <Link
      to="/"
      activeClassName="active"
      aria-label="View Home page"
      className="item"
    >
      Home
    </Link>
    <Link
      to="/blablas"
      activeClassName="active"
      className="item"
      aria-label="View Blabla page"
    >
      Blablas
    </Link>
    <Link
      to="/suggest-new-episode"
      activeClassName="active"
      className="item"
      aria-label="Suggest New Episode"
    >
      Suggest Blabla
    </Link>
    <Link
      to="/about"
      activeClassName="active"
      className="item"
      aria-label="View About page"
    >
      About
    </Link>

    <a
      href="https://open.spotify.com/show/0UlTBXh7iH6x0HO6FgYzAD"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Spotify className="spotify podcast-icon" alt="spotify" />
    </a>
    <a
      href="https://podcasts.google.com/?feed=aHR0cHM6Ly9hbmNob3IuZm0vcy84OGUzMDQ4L3BvZGNhc3QvcnNz"
      target="_blank"
      rel="noopener noreferrer"
    >
      <GooglePodcast
        className="google-podcast podcast-icon"
        alt="google-podcast"
      />
    </a>
    <a
      href="https://podcasts.apple.com/us/podcast/geeksblabla/id1449493227"
      target="_blank"
      rel="noopener noreferrer"
    >
      <ApplePodcast
        className="apple-podcast podcast-icon"
        alt="apple-podcast"
      />
    </a>
    {/* <ToggleMode id={id} /> */}
    <ThemeToggle />
  </>
)
