<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-40-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<p align="center">
  <a href="https://www.geeksblabla.com">
    <img alt="Gatsby" src="https://raw.githubusercontent.com/DevC-Casa/geeksblabla.com/master/static/images/logo.png" width="200" />
  </a>
</p>
<h1 align="center">
  GeeksBlabla Website
</h1>

Geeksblabla is a webinar where we meet to share and learn about awesome topics from the best.

We Invite knowledgable and interesting people who are not always known to the public so that they can share their experiences.

We talk about the hottest new topics and explain it to the community in a way that is simple and approachable.

The website is built using [Gatsbyjs](http://gatsbyjs.org)

## 🚀 Quick start

1.  **Fork and clone the project**

    ```sh
    git clone git@github.com:your-username/geeksblabla.com.git
    ```

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```sh
    cd geeksblabla.com/
    npm install
    gatsby develop
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

## 🧐 Want to contribute ?

If you want to contribute check out the [help wanted](https://github.com/devC-Casa/geeksblabla.com/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22+sort%3Aupdated-desc) issues for things that need fixing, or suggest some new features by opening new issues.

## Add New Episode ?

1.  **Follow the Quick start 👆**
2.  **Create a new episode folder**

    - Duplicate an existing episode folder and rename it with the correct episode number `epX`

    - open `index.md` and Make sure to update the following info :

      - Episode date, time, duration
      - Episode Title : Facebook live stream episode title.
      - Tags : At least 1. You should stick to the following approach:
        - For abbrevations: all lowercase i.e: "dev"
        - For acronyms: all uppercase i.e: "MSS", "UX", "UI", "JS".
        - For single and composite words: all lowercase i.e: "software engineering", "mobile dev", "career".
      - category: one of the following: "MSS", "AMA", "career", "dev".
      - isNext : always `false`. `true` means the episode is the next one and should appear on the footer.
      - video : Facebook video id
      - featured : default `false`, `true` will show the episode in the TOP EPISODE home page Section

```
date: 2019-03-28
time: 20h
duration: "01:09:00"
title: "Open Source with Yassine Elouafi"
tags: ["open source", "dev"]
category: "dev"
isNext: false
video: "2254365704624093"
youtube: https://www.youtube.com/watch?v=kzYammaow-M
published: true
featured: false
audio:

```

3 . **Add Episode Notes && Links**

Episode Notes should contain three sections:

#### Description :

A simple description of the episode like the following:

```
In this episode of GeeksBlabla, Geeksblabla team (and guest name in case  ) talk about the Web fundamental, new js Frameworks and some best practices you need to follow as a web developer.
```

### Guests

```
- [guest name 1](https://example.com)
- [guest name 1](https://example2.com)
- ....
```

#### Notes :

In the Notes section, you need to collect the most important part of the episode and try to find the right title for it using this format : `h:min - title`

```
0:00:00 - Intro

0:03:00 - The history of web and W3C?

	...

1:57:00 - when you can find trending web technologies?

```

> make sure to add a line break between titles

#### Links :

```
- [W3C](https://www.w3.org/)
- [Reactjs](https://reactjs.org)
-....
```

#### Prepared and Presented by

```
- [name](https://example1.com)
- [name 2](https://example2.com)
```

In the end, the episode markdown file should look like : 👇

```
---
date: 2019-03-21
time: 20h
duration: "1:09"
title: "Introduction to Open Source"
tags: ["open source", "dev"]
category: "dev"
isNext: false
youtube: https://www.youtube.com/watch?v=kzYammaow-M
published: true
video: "2244351238958873"
url:
audio:
---

In this episode of GeeksBlabla, Geeksblabla team (and guest name in case  ) talk about the Web fundamental, new js Frameworks and some best practices you need to follow as a web developer.

## Guests
- [guest name 1](https://example.com)
- [guest name 1](https://example2.com)

## Notes
h:min - title
0:00:00 - Intro

0:03:00 - The history of web and W3C?

	...

1:57:00 - when you can find trending web technologies?

## Links

- [W3C](https://www.w3.org/)
- [Reactjs](https://reactjs.org)
-....

## Prepared and Presented by
- [name](https://example1.com)
- [name 2](https://example2.com)


```

4.**Open the source code and start editing!**

Navigate to `http://localhost:8000/blablas` and Make sure the episode page works as expected

## Licensing

The code in this project is licensed under MIT license.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="20%"><a href="https://elazizi.com"><img src="https://avatars0.githubusercontent.com/u/11137944?v=4?s=180" width="180px;" alt="Youssouf EL AZIZI"/><br /><sub><b>Youssouf EL AZIZI</b></sub></a><br /><a href="https://github.com/geeksblabla/geeksblabla.com/commits?author=yjose" title="Code">💻</a> <a href="https://github.com/geeksblabla/geeksblabla.com/commits?author=yjose" title="Documentation">📖</a> <a href="#content-yjose" title="Content">🖋</a> <a href="https://github.com/geeksblabla/geeksblabla.com/pulls?q=is%3Apr+reviewed-by%3Ayjose" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="20%"><a href="https://hakkou.me"><img src="https://avatars1.githubusercontent.com/u/6276978?v=4?s=180" width="180px;" alt="Amine Hakkou"/><br /><sub><b>Amine Hakkou</b></sub></a><br /><a href="https://github.com/geeksblabla/geeksblabla.com/commits?author=Amine-H" title="Code">💻</a> <a href="#content-Amine-H" title="Content">🖋</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/souffanda"><img src="https://avatars2.githubusercontent.com/u/24813026?v=4?s=180" width="180px;" alt="Soufian El "/><br /><sub><b>Soufian El </b></sub></a><br /><a href="https://github.com/geeksblabla/geeksblabla.com/commits?author=souffanda" title="Code">💻</a> <a href="https://github.com/geeksblabla/geeksblabla.com/commits?author=souffanda" title="Documentation">📖</a> <a href="#content-souffanda" title="Content">🖋</a> <a href="#ideas-souffanda" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="20%"><a href="http://aboullaite.me"><img src="https://avatars0.githubusercontent.com/u/2836850?v=4?s=180" width="180px;" alt="Aboullaite Mohammed"/><br /><sub><b>Aboullaite Mohammed</b></sub></a><br /><a href="#content-aboullaite" title="Content">🖋</a> <a href="#ideas-aboullaite" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/ismailElazizi"><img src="https://avatars1.githubusercontent.com/u/22155037?v=4?s=180" width="180px;" alt="Ismail El Azizi"/><br /><sub><b>Ismail El Azizi</b></sub></a><br /><a href="#design-ismailElazizi" title="Design">🎨</a> <a href="#content-ismailElazizi" title="Content">🖋</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="20%"><a href="https://github.com/HyadOussama"><img src="https://avatars0.githubusercontent.com/u/26727605?v=4?s=180" width="180px;" alt="Oussama Hyad"/><br /><sub><b>Oussama Hyad</b></sub></a><br /><a href="#design-HyadOussama" title="Design">🎨</a></td>
      <td align="center" valign="top" width="20%"><a href="https://packagist.org/packages/soubai"><img src="https://avatars0.githubusercontent.com/u/11523791?v=4?s=180" width="180px;" alt="soubai"/><br /><sub><b>soubai</b></sub></a><br /><a href="#content-AbderrahimSoubaiElidrissi" title="Content">🖋</a></td>
      <td align="center" valign="top" width="20%"><a href="https://www.github.com/midrissi"><img src="https://avatars0.githubusercontent.com/u/3237344?v=4?s=180" width="180px;" alt="IDRISSI Mohamed"/><br /><sub><b>IDRISSI Mohamed</b></sub></a><br /><a href="#content-midrissi" title="Content">🖋</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/Iduoad"><img src="https://avatars0.githubusercontent.com/u/25715906?v=4?s=180" width="180px;" alt="Iduoad"/><br /><sub><b>Iduoad</b></sub></a><br /><a href="#content-Iduoad" title="Content">🖋</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/Ismailtlem"><img src="https://avatars1.githubusercontent.com/u/34961373?v=4?s=180" width="180px;" alt="Ismail Tlemçani"/><br /><sub><b>Ismail Tlemçani</b></sub></a><br /><a href="#content-Ismailtlem" title="Content">🖋</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="20%"><a href="https://mouyiz.me"><img src="https://avatars1.githubusercontent.com/u/23297439?v=4?s=180" width="180px;" alt="Mohamed Ouyizme"/><br /><sub><b>Mohamed Ouyizme</b></sub></a><br /><a href="#content-mohouyizme" title="Content">🖋</a></td>
      <td align="center" valign="top" width="20%"><a href="https://melbarch.com"><img src="https://avatars0.githubusercontent.com/u/12951727?v=4?s=180" width="180px;" alt="Mohamed ELBARCHANY"/><br /><sub><b>Mohamed ELBARCHANY</b></sub></a><br /><a href="#content-melbarch" title="Content">🖋</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/kelmag"><img src="https://avatars0.githubusercontent.com/u/29312717?v=4?s=180" width="180px;" alt="Khalil El Maghraoui"/><br /><sub><b>Khalil El Maghraoui</b></sub></a><br /><a href="#content-kelmag" title="Content">🖋</a></td>
      <td align="center" valign="top" width="20%"><a href="https://pingfrommorocco.blogspot.com"><img src="https://avatars2.githubusercontent.com/u/1638227?v=4?s=180" width="180px;" alt="Azi Hassan"/><br /><sub><b>Azi Hassan</b></sub></a><br /><a href="#content-azihassan" title="Content">🖋</a></td>
      <td align="center" valign="top" width="20%"><a href="http://pixelhint.com"><img src="https://avatars3.githubusercontent.com/u/13198653?v=4?s=180" width="180px;" alt="ijja"/><br /><sub><b>ijja</b></sub></a><br /><a href="https://github.com/geeksblabla/geeksblabla.com/commits?author=ijja" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="20%"><a href="https://github.com/bondif"><img src="https://avatars2.githubusercontent.com/u/24433897?v=4?s=180" width="180px;" alt="Mohamed BOUKHLIF"/><br /><sub><b>Mohamed BOUKHLIF</b></sub></a><br /><a href="#content-bondif" title="Content">🖋</a> <a href="https://github.com/geeksblabla/geeksblabla.com/commits?author=bondif" title="Code">💻</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/boredabdel"><img src="https://avatars1.githubusercontent.com/u/1208914?v=4?s=180" width="180px;" alt="Abdel SGHIOUAR"/><br /><sub><b>Abdel SGHIOUAR</b></sub></a><br /><a href="#content-boredabdel" title="Content">🖋</a></td>
      <td align="center" valign="top" width="20%"><a href="http://mouradaouinat.me"><img src="https://avatars1.githubusercontent.com/u/34982954?v=4?s=180" width="180px;" alt="Mourad Aouinat"/><br /><sub><b>Mourad Aouinat</b></sub></a><br /><a href="#content-mouradaouinat" title="Content">🖋</a> <a href="https://github.com/geeksblabla/geeksblabla.com/commits?author=mouradaouinat" title="Code">💻</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/iMeriem"><img src="https://avatars1.githubusercontent.com/u/11720929?v=4?s=180" width="180px;" alt="Meriem Zaid"/><br /><sub><b>Meriem Zaid</b></sub></a><br /><a href="#content-iMeriem" title="Content">🖋</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/ylizma"><img src="https://avatars2.githubusercontent.com/u/47286539?v=4?s=180" width="180px;" alt="Youssef Amzil"/><br /><sub><b>Youssef Amzil</b></sub></a><br /><a href="#content-ylizma" title="Content">🖋</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="20%"><a href="https://aymanemx.github.io/"><img src="https://avatars1.githubusercontent.com/u/30264095?v=4?s=180" width="180px;" alt="aymaneMx"/><br /><sub><b>aymaneMx</b></sub></a><br /><a href="#content-aymaneMx" title="Content">🖋</a></td>
      <td align="center" valign="top" width="20%"><a href="http://kafil.xyz"><img src="https://avatars1.githubusercontent.com/u/15774583?v=4?s=180" width="180px;" alt="Kafil"/><br /><sub><b>Kafil</b></sub></a><br /><a href="#content-Kafiil" title="Content">🖋</a> <a href="https://github.com/geeksblabla/geeksblabla.com/commits?author=Kafiil" title="Code">💻</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/zakariaelas"><img src="https://avatars1.githubusercontent.com/u/33696020?v=4?s=180" width="180px;" alt="Zakaria El Asri"/><br /><sub><b>Zakaria El Asri</b></sub></a><br /><a href="#content-zakariaelas" title="Content">🖋</a> <a href="https://github.com/geeksblabla/geeksblabla.com/commits?author=zakariaelas" title="Code">💻</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/nfaihi"><img src="https://avatars2.githubusercontent.com/u/36778362?v=4?s=180" width="180px;" alt="Ahmed NFAIHI"/><br /><sub><b>Ahmed NFAIHI</b></sub></a><br /><a href="#content-nfaihi" title="Content">🖋</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/arsokay90"><img src="https://avatars3.githubusercontent.com/u/12202186?v=4?s=180" width="180px;" alt="arsokay90"/><br /><sub><b>arsokay90</b></sub></a><br /><a href="#content-arsokay90" title="Content">🖋</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="20%"><a href="https://mohamedelbahja.com"><img src="https://avatars2.githubusercontent.com/u/8259014?v=4?s=180" width="180px;" alt="Mohamed El Bahja"/><br /><sub><b>Mohamed El Bahja</b></sub></a><br /><a href="https://github.com/geeksblabla/geeksblabla.com/commits?author=melbahja" title="Code">💻</a></td>
      <td align="center" valign="top" width="20%"><a href="https://www.linkedin.com/in/mohamedaitbouaaza/"><img src="https://avatars0.githubusercontent.com/u/33040162?v=4?s=180" width="180px;" alt="Mohamed Ait Bouaaza"/><br /><sub><b>Mohamed Ait Bouaaza</b></sub></a><br /><a href="#content-mohamedaitbouaaza" title="Content">🖋</a></td>
      <td align="center" valign="top" width="20%"><a href="https://www.linkedin.com/in/anas-temouden-232888188/"><img src="https://avatars1.githubusercontent.com/u/47893532?v=4?s=180" width="180px;" alt="Anas Temouden"/><br /><sub><b>Anas Temouden</b></sub></a><br /><a href="#content-Temo27anas" title="Content">🖋</a></td>
      <td align="center" valign="top" width="20%"><a href="https://www.makraz.com"><img src="https://avatars1.githubusercontent.com/u/19323431?v=4?s=180" width="180px;" alt="Hamza Makraz"/><br /><sub><b>Hamza Makraz</b></sub></a><br /><a href="#content-makraz" title="Content">🖋</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/moussaidOualid"><img src="https://avatars2.githubusercontent.com/u/52301484?v=4?s=180" width="180px;" alt="Oualid MOUSSAID"/><br /><sub><b>Oualid MOUSSAID</b></sub></a><br /><a href="#content-moussaidOualid" title="Content">🖋</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="20%"><a href="https://about.me/er-rafaiy"><img src="https://avatars0.githubusercontent.com/u/11611370?v=4?s=180" width="180px;" alt="Abdelhakim Er-rafaiy"/><br /><sub><b>Abdelhakim Er-rafaiy</b></sub></a><br /><a href="#content-errafaiy" title="Content">🖋</a></td>
      <td align="center" valign="top" width="20%"><a href="http://moghwan.me"><img src="https://avatars2.githubusercontent.com/u/2495180?v=4?s=180" width="180px;" alt="Marwane Chaoui"/><br /><sub><b>Marwane Chaoui</b></sub></a><br /><a href="https://github.com/geeksblabla/geeksblabla.com/commits?author=moghwan" title="Code">💻</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/nainiayoub"><img src="https://avatars2.githubusercontent.com/u/50157142?v=4?s=180" width="180px;" alt="Ayoub NAINIA"/><br /><sub><b>Ayoub NAINIA</b></sub></a><br /><a href="#content-nainiayoub" title="Content">🖋</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/outama-othmane"><img src="https://avatars2.githubusercontent.com/u/42810975?v=4?s=180" width="180px;" alt="Outama Othmane"/><br /><sub><b>Outama Othmane</b></sub></a><br /><a href="#content-outama-othmane" title="Content">🖋</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/sroui"><img src="https://avatars.githubusercontent.com/u/26446917?v=4?s=180" width="180px;" alt="Soufiane Roui"/><br /><sub><b>Soufiane Roui</b></sub></a><br /><a href="#content-sroui" title="Content">🖋</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="20%"><a href="https://github.com/otmos"><img src="https://avatars.githubusercontent.com/u/43470049?v=4?s=180" width="180px;" alt="otmos"/><br /><sub><b>otmos</b></sub></a><br /><a href="#content-otmos" title="Content">🖋</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/faissaloux"><img src="https://avatars.githubusercontent.com/u/60013703?v=4?s=180" width="180px;" alt="Faissal Wahabali"/><br /><sub><b>Faissal Wahabali</b></sub></a><br /><a href="https://github.com/geeksblabla/geeksblabla.com/commits?author=faissaloux" title="Code">💻</a></td>
      <td align="center" valign="top" width="20%"><a href="https://www.instagram.com/zakarialaoui10/"><img src="https://avatars.githubusercontent.com/u/63521765?v=4?s=180" width="180px;" alt="ZAKARIA ELALAOUI"/><br /><sub><b>ZAKARIA ELALAOUI</b></sub></a><br /><a href="#content-zakarialaoui10" title="Content">🖋</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/deleusec"><img src="https://avatars.githubusercontent.com/u/59571508?v=4?s=180" width="180px;" alt="Corentin Deleuse"/><br /><sub><b>Corentin Deleuse</b></sub></a><br /><a href="https://github.com/geeksblabla/geeksblabla.com/commits?author=deleusec" title="Code">💻</a></td>
      <td align="center" valign="top" width="20%"><a href="https://stackoverflow.com/users/6242698/elasri"><img src="https://avatars.githubusercontent.com/u/17480866?v=4?s=180" width="180px;" alt="Elasri Abdelati"/><br /><sub><b>Elasri Abdelati</b></sub></a><br /><a href="#content-kaizendae" title="Content">🖋</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
