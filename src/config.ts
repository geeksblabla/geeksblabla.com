import type { FormsSubmissions, Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://geeksblabla.community/", // replace this with your deployed domain
  author: "Geeksblabla Community",
  profile: "https://geeksblabla.community/",
  desc: "Geeksblabla is a community of developers, designers, and entrepreneurs who are passionate about building cool stuff.",
  title: "Geeksblabla Community",
  ogImage: "community.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 10,
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
    href: "https://www.youtube.com/@GeeksBlaBla01",
    linkTitle: `${SITE.title} on YouTube`,
    active: true,
  },
  linkedin: {
    href: "https://www.linkedin.com/company/geeksblabla-community",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  facebook: {
    href: "https://www.facebook.com/geeksblabla",
    linkTitle: `${SITE.title} on Facebook`,
    active: true,
  },
  x: {
    href: "https://twitter.com/geeksblabla",
    linkTitle: `${SITE.title} on Twitter`,
    active: true,
  },
  instagram: {
    href: "https://www.instagram.com/geeksblabla",
    linkTitle: `${SITE.title} on Instagram`,
    active: true,
  },
  spotify: {
    href: "https://open.spotify.com/show/0UlTBXh7iH6x0HO6FgYzAD",
    linkTitle: `${SITE.title} on Spotify`,
    active: true,
  },
};

export const FORMS_SUBMISSIONS: FormsSubmissions[] = [
  {
    name: "Join the core team",
    url: "https://tally.so/r/meqj6E",
    redirect: "join",
  },
  {
    name: "Contribute to the community",
    url: "/blog/contribute-to-geeksblabla",
    redirect: "contribute",
  },
  {
    name: "Suggest an episode or guests",
    url: "/podcast/planning",
  },
  {
    name: "Feedback & suggestions",
    url: "/feedback",
    redirect: "feedback",
  },
];
