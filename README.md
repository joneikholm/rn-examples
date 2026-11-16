# This project requires pnpm in order to run on Expo

  *Nov 12, 2026 · @Jon*

  ## Why pnpm

  pnpm keeps every package in **one global store** on the Mac and hard-links it into each project. A package version is
  downloaded once and takes up disk space once, no matter how many projects use it.

  > **Example:** Install Firebase 11 in ten projects: it is downloaded and stored **one time**. A new version is downloaded
  once too, and only the files that changed are stored.

  Each project still has its own `node_modules` folder, so Expo and Metro work as usual.

  ## One-time setup

  ```bash
  npm install -g pnpm
  pnpm config set node-linker hoisted
  ```

  The second line gives every project a flat `node_modules` layout, which Expo works best with.

  ## Create a new Expo project

  ```bash
  pnpm create expo-app TestApp --template expo-template-blank@58
  cd TestApp
  npx expo start
  ```

  Without the global setting, do it in steps instead:

  ```bash
  npx create-expo-app@latest TestApp --template expo-template-blank@58 --no-install
  cd TestApp
  echo "node-linker=hoisted" > .npmrc
  pnpm install
  ```

  ## Daily commands

  | Instead of            | Use                                                                          |
  | --------------------- | ---------------------------------------------------------------------------- |
  | `npm install`         | `pnpm install`                                                               |
  | `npm install <pkg>`   | `npx expo install <pkg>` (picks the version matching the Expo SDK) or `pnpm add <pkg>` |
  | `npm uninstall <pkg>` | `pnpm remove <pkg>`                                                          |
  | `npm uninstall <pkg>` | `pnpm remove <pkg>`                                                          |
  | `npm run <script>`    | `pnpm <script>`                                                              |

  ## Opening an older project

  The projects in `worklokal/ReactNative` have been converted: `node_modules` is removed and `pnpm-lock.yaml` keeps the same
  versions as before. Open the folder and run:

  ```bash
  pnpm install
  ```

  To convert more projects later, run this from the `ReactNative` folder:

  ```bash
  ./convert-to-pnpm.sh <folder>
  ```

  ## Good to know

  - **Don't mix npm and pnpm** in the same project. A `package-lock.json` next to `pnpm-lock.yaml` means npm was used by
  mistake.
  - **Free up space** from versions no longer used by any project:
    ```bash
    pnpm store prune
    ```
  - **Yarn Berry projects** (with `__metadata` at the top of `yarn.lock`) can't be converted directly. Delete `yarn.lock` and
  run `pnpm install` to start fresh.
