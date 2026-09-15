# GitHub Pages

The academic homepage supports a static GitHub Pages build. It requires no server, database, or Sites account for hosting.

## Intended address

For the GitHub username in the supplied CV, the user-site repository is `qiaoyuan667.github.io`, and the expected address is `https://qiaoyuan667.github.io/`. Confirm the account before publishing.

## Preview and build

- Local editing: `npm run dev`
- GitHub Pages export: `npm run build:pages`
- The static website is generated in `out/`.

## Publish when ready

1. Use the `qiaoyuan667.github.io` repository in the intended GitHub account. Inspect existing contents before uploading anything.
2. Push this project to its `main` branch.
3. In Settings → Pages, select **GitHub Actions** as the build source.
4. The included `.github/workflows/pages.yml` builds and deploys the exported site.

This configuration targets a user-site root, not a project subpath such as `/personal-site/`.

## Edit content

- Biography, papers, experience: `app/page.tsx`
- Typography and layout: `app/globals.css`
- Page title: `app/layout.tsx`
- Downloadable CV: `public/Qiaoyuan-Zheng-CV.pdf`
- Portrait: `public/portrait.png`

The current layout is inspired by Jon Barron's academic website: https://github.com/jonbarron/jonbarron.github.io. The footer credits the reference. It is implemented in the existing React project.

The downloadable CV remains the original supplied file. Update its placeholder personal website and malformed LinkedIn URL before the final public launch.
