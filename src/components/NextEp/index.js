import React from "react"
import { StaticQuery, graphql } from "gatsby"
import "./index.scss"
import { css } from "emotion"

import AddToCalendarHOC from "react-add-to-calendar-hoc"
import CalendarModal from "../Calendar/Modal"
import Button from "../Calendar/Button"
import moment from "moment-timezone"

const linkStyles = css`
  text-decoration: none;
  display: block;
  color: #e42d2d;
  font-size: 18px;
  text-align: center;
  padding: 6px;
`

export default () => (
  <StaticQuery
    query={graphql`
      {
        allMdx(
          filter: {
            frontmatter: { published: { eq: true }, isNext: { eq: true } }
          }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              id
              fields {
                title
                slug
                date(formatString: "MMMM DD, YYYY")
                duration
                url
                video
              }
            }
          }
        }
      }
    `}
    render={({ allMdx }) => {
      if (allMdx.edges.length === 0) return null

      const { title, date } = allMdx.edges[0].node.fields
      const AddToCalendarModal = AddToCalendarHOC(Button, CalendarModal)

      // calendar options
      const startDatetime = moment(date + ", 8:00:00 pm").utc()
      const endDatetime = startDatetime.clone().add(1, "hours")
      const duration = moment
        .duration(endDatetime.diff(startDatetime))
        .asHours()
      const event = {
        description: title,
        duration,
        endDatetime: endDatetime.format("YYYYMMDDTHHmmssZ"),
        location: "The streaming will be on DevC Casablanca Facebook Group",
        startDatetime: startDatetime.format("YYYYMMDDTHHmmssZ"),
        title: title,
      }

      return (
        <div className="next-ep">
          <div className="item">
            <h4 className="next"> Next episode </h4>
            <h1 className="title"> {title} </h1>
          </div>
          <div className="item">
            <h2 className="time"> {date} </h2>
            <p className="place">
              The streaming will be on{" "}
              <a
                target="_blank"
                href="https://www.facebook.com/groups/DevC.Casablanca/"
                rel="noopener noreferrer"
              >
                DevC Casablanca Facebook Group{" "}
              </a>
            </p>
          </div>
          <div className="item">
            <AddToCalendarModal
              linkProps={{
                className: linkStyles,
              }}
              event={event}
            />
          </div>
        </div>
      )
    }}
  />
)
