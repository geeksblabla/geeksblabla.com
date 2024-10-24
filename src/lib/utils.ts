import { SITE } from "@/config";
import type { CollectionEntry } from "astro:content";
import { type ClassValue, clsx } from "clsx";
import { slug as slugger } from "github-slugger";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const slugify = (str: string) => slugger(str);

export const transformDateToLocaleString = (date: string | Date) => {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return dateObj.toLocaleDateString("en-US", options);
};

export const getYoutubeThumbnail = (youtubeUrl?: string) => {
  if (!youtubeUrl) return ""; // TODO: add default image in case of no thumbnail
  const videoId = youtubeUrl.split("v=")[1];
  if (!videoId) return ""; // TODO: add default image in case of no thumbnail
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

// Blog utils

export const getPageNumbers = (numberOfPosts: number) => {
  const numberOfPages = numberOfPosts / Number(SITE.postPerPage);

  let pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
    pageNumbers = [...pageNumbers, i];
  }

  return pageNumbers;
};

export const getSortedArticles = (articles: CollectionEntry<"blog">[]) =>
  articles
    .filter(({ data }) => !data.draft)
    .sort(
      (a, b) =>
        Math.floor(new Date(b.data.pubDatetime).getTime() / 1000) -
        Math.floor(new Date(a.data.pubDatetime).getTime() / 1000)
    );
