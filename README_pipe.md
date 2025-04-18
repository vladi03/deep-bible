# README_pipe.md

This document explains how to configure the GitHub Actions pipeline for deploying a Single Page Application (SPA) to Firebase Hosting. It covers the required secrets and parameters, and shows how to set them up in your repository.

---

## 🔒 Configuring Secrets

All sensitive values should be stored as **Repository secrets** under **Settings → Secrets and variables → Actions**. To add a new secret:

1. In your GitHub repo, go to **Settings**.
2. Select **Secrets and variables** → **Actions**.
3. Click **New repository secret**.
4. Enter the **Name** and **Value** for your secret.
5. Click **Add secret**.

| Secret Name              | Description                                                                                           |
|--------------------------|-------------------------------------------------------------------------------------------------------|
| `FIREBASE_TOKEN`         | CI token generated via `firebase login:ci`. Grants deploy permission to your Firebase project.         |
| `FIREBASE_PROJECT_ID`    | Your Firebase project ID (e.g. `my-app-prod`).                                                         |
| `FIREBASE_TARGET` (opt.) | Hosting target from `firebase.json`. Use if you defined [`hosting.targets`](https://firebase.google.com/docs/hosting/manage-hosting-resources). |

---

## ⚙️ Configuring Parameters

Non-sensitive configuration can be set either as **Secrets** or plain `env:` variables in your workflow. Below are the parameters you can override:

| Env Variable    | Default    | Description                                       |
|-----------------|------------|---------------------------------------------------|
| `NODE_VERSION`  | `16`       | Major Node.js version for CI (`actions/setup-node`). |
| `BUILD_COMMAND` | `npm run build` | Command to build your SPA (`npm` or `yarn` based). |
| `PUBLIC_DIR`    | `build`    | Output directory for static files (e.g. `build`, `dist`). |

Set these under the `env:` section in your workflow file, for example:

```yaml
env:
  NODE_VERSION: ${{ secrets.NODE_VERSION || '16' }}
  BUILD_COMMAND: ${{ secrets.BUILD_COMMAND || 'npm run build' }}
  PUBLIC_DIR: ${{ secrets.PUBLIC_DIR || 'build' }}
  FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
  FIREBASE_TARGET: ${{ secrets.FIREBASE_TARGET || '' }}
```

---

## 🚀 Example Workflow Snippet

```yaml
name: Deploy SPA to Firebase

on:
  push:
    branches: [ main, staging ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    env:
      NODE_VERSION: ${{ secrets.NODE_VERSION || '16' }}
      BUILD_COMMAND: ${{ secrets.BUILD_COMMAND || 'npm run build' }}
      PUBLIC_DIR: ${{ secrets.PUBLIC_DIR || 'build' }}
      FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
      FIREBASE_TARGET: ${{ secrets.FIREBASE_TARGET || '' }}

    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: ${{ env.BUILD_COMMAND }}
      - name: Deploy to Firebase
        uses: w9jds/firebase-action@v1.5.0
        with:
          args: >
            deploy --project ${{ env.FIREBASE_PROJECT_ID }} \
            ${{ env.FIREBASE_TARGET && format('--only hosting:%s', env.FIREBASE_TARGET) }} \
            --public ${{ env.PUBLIC_DIR }}
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

---

## 📖 Further Reading

- [Firebase Hosting documentation](https://firebase.google.com/docs/hosting)
- [GitHub Actions Secrets](https://docs.github.com/actions/security-guides/encrypted-secrets)

