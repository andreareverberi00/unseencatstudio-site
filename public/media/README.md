# Media setup

Put your files inside `public/media/` and reference them in `src/lib/data.ts`.

## Suggested folders

- `public/media/current-project/`
- `public/media/projects/<project-id>/`
- `public/media/team/`

## Data fields you can edit

- `mainGame.thumbnailImage`
- `mainGame.media` (supports `{ type: "image" }` and `{ type: "video" }`)
- `projects[].thumbnailImage`
- `projects[].media`
- `team[].avatarImage`

## Example media items

```ts
media: [
  { type: "image", src: "/media/current-project/screenshot-01.jpg", alt: "Bedroom scene" },
  {
    type: "video",
    src: "/media/current-project/trailer.mp4",
    poster: "/media/current-project/trailer-poster.jpg",
    alt: "Trailer preview",
  },
]
```
