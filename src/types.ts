export type Site = {
  website: string;
  author: string;
  profile: string;
  desc: string;
  title: string;
  ogImage: string;
  lightAndDarkMode: boolean;
  postPerIndex: number;
  postPerPage: number;
  scheduledPostMargin: number;
};

export type SocialObjects = {
  [key: string]: {
    href: string;
    linkTitle: string;
    active: boolean;
  };
};

export type FormsSubmissions = {
  name: string;
  url: string;
};
