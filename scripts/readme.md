## Upload new episode to podcast

We are using anchor to host our podcast. Anchor is a free service that allows you to record and host your podcast. Anchor will distribute your podcast for you so it can be heard on Spotify, Apple Podcasts and many more.

To automate the process we worked on building a simple script that will do the following:

1. The script will run as part of github actions workflow and should be triggered when even there is a new update that change the content of `blablas` file, check `.github/workflows/upload_episode.yaml` file for more details.

2. The script will read the content of `blablas` file and and compare it with podcast rss feed to find if there is any missing episode.

3. If there is a missing episode, the script will download the episode from youtube as m4a file and put it in `podcast` folder as well as convert the episode markdown file to html to make it ready for anchor.

4. We wrote a puppeteer script to automate the process of uploading the episode to anchor, check `scripts/puppeteer_episode.js` file for more details. The script is mainly an end to end simulation of the process of uploading the episode to anchor as anchor doesn't provide any API to automate the process.

## How to test the process locally

The simplest way to test the process locally is to select the function you want to test locally and work with right test file for that function.

For example, if you want to test the process of uploading the episode to anchor, which the script that need maintenance the most you can use `test-puppeteer-upload` script:

```bash
cd scripts
yarn install

ANCHOR_EMAIL=your-anchor-email@gmail.com ANCHOR_PASSWORD=your-anchor-password   yarn test-upload-to-anchor

```
