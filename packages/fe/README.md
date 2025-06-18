# Todo

Todo frontend part. Created with `bun create vite`. VanillaJS project with React and Redux. Original version was made with Create React App on React 18 but switched to Vite on React 19 without modifications.

## Scripts

- `dev`: Run app in dev mode. It has proxy setting on `packages\fe\vite.config.js` to resolve `/api` requests to `http://localhost:3001`, the backend server `packages/be`.
- `build`: Build app. Output is created in `dist` folder.
- `lint`: Run ESLint
- `preview`: Serve `dist` folder to preview the app
