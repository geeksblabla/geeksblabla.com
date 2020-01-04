import React from "react"
import { Link } from "gatsby"

import Contact from "assets/contact.svg"
import Send from "assets/send.svg"

export default () => {
  return (
    <div className="notification">
      <Contact className="notif" />
      <div className="content container ">
        <h1> Contact us</h1>
        <p> We love to hear from you, reach out to us </p>
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          className="contact-form"
        >
          <input placeholder="Name" type="text" name="name" />
          <input placeholder="Email" type="email" name="email" />
          <textarea
            placeholder="Your Message"
            rows="5"
            name="message"
          ></textarea>
          <div className="actions">
            <button type="submit" className="button">
              <Send width="20" /> Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
