/**
 * This file is used to generate the redirects for the Astro redirects plugin.
 * example
 * /linkedin -> geeksblabla linkedin page
 * /contribute -> how to contribute article
 * ...
 *
 * to add a new redirect, make sure to add in the config by updating the FORMS_SUBMISSIONS array or socials object
 */

import { SOCIALS, FORMS_SUBMISSIONS } from "./config";

interface Redirect {
  name: string;
  path: string;
  link: string;
}

const socialRedirects: Redirect[] = Object.entries(SOCIALS).map(
  ([key, value]) => {
    return {
      name: key,
      path: `/${key}`,
      link: value.href,
    };
  }
);

const formsRedirects: Redirect[] = FORMS_SUBMISSIONS.filter(
  form => form.redirect
).map(form => {
  return {
    name: form.name,
    path: `/${form.redirect}`,
    link: form.url,
  };
});

type AstroRedirects = {
  [key: string]: string;
};

export const getAstroRedirects = () => {
  const redirects = {} as AstroRedirects;
  socialRedirects.forEach(redirect => {
    redirects[redirect.path] = redirect.link;
  });
  formsRedirects.forEach(redirect => {
    redirects[redirect.path] = redirect.link;
  });
  return redirects;
};
