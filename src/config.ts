import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://geeksblabla.io/", // replace this with your deployed domain
  author: "Geeksblabla Community",
  profile: "https://geeksblabla.io/",
  desc: "Geeksblabla is a community of developers, designers, and entrepreneurs who are passionate about building cool stuff.",
  title: "Geeksblabla",
  ogImage: "geeksblabla-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = {
  github: {
    href: "https://github.com/geeksblabla",
    linkTitle: `${SITE.title} on Github`,
    active: true,
  },
  youtube: {
    href: "https://www.youtube.com/channel/UCW2WV7NKU0WPyuv4YoNSqBA",
    linkTitle: `${SITE.title} on YouTube`,
    active: true,
  },
  linkedin: {
    href: "https://www.linkedin.com/company/geeksblabla",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  facebook: {
    href: "https://www.facebook.com/geeksblabla",
    linkTitle: `${SITE.title} on Facebook`,
    active: true,
  },
  twitter: {
    href: "https://twitter.com/geeksblabla",
    linkTitle: `${SITE.title} on Twitter`,
    active: true,
  },
  instagram: {
    href: "https://www.instagram.com/geeks_blabla",
    linkTitle: `${SITE.title} on Instagram`,
    active: true,
  },
};
