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
  color: #E42D2D;
  font-size: 18px;
  text-align: center;
  padding: 6px;
`;

const startDatetime =moment("2019-08-22T19:00:00Z").utc();
const endDatetime = startDatetime.clone().add(2, "hours");
const duration = moment.duration(endDatetime.diff(startDatetime)).asHours()
const event = {
  description:
    "Freelancing in Morocco",
  duration,
  endDatetime: endDatetime.format("YYYYMMDDTHHmmssZ"),
  location: "The streaming will be on DevC Casablanca Facebook Group",
  startDatetime: startDatetime.format("YYYYMMDDTHHmmssZ"),
  title: "Freelancing in Morocco",
}

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

            {/* <a href={url} target="_blank" className="button outline">
              Add to Calendar
            </a> */}
          </div>
        </div>
      )
    }}
  />
)
