## Workflow

- Check missed Episode ( usually should be One or Zero) : using the anchor geeksBalaba rss

- Generate a Json file for missed Episode and Save it under Fixture folder (git ignored). to make it ready for cypress workflow

```json
{
  "title": "Episode Title",
  "video": "facebook video url",
  "description": " Html Format (Maybe)"
}
```

- Download Audio file from facebook using youtube-dl

- Upload Audio File using cypress
