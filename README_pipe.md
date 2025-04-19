# 🚀 Build & Deploy to Firebase Hosting – GitHub Actions Pipeline

This GitHub Actions workflow automates the build and deployment process of your frontend application to Firebase Hosting.

## 📄 Workflow File

**Workflow Name:** `Build & Deploy to Firebase Hosting`  
**Trigger Events:**
- On push to the `main` branch
- On manual trigger via `workflow_dispatch`

---

## 🛠️ Configuration

### Environment Variables

| Variable               | Source                     | Default        | Description                                      |
|------------------------|----------------------------|----------------|--------------------------------------------------|
| `NODE_VERSION`         | Hardcoded                  | `22`           | The Node.js version to use                       |
| `BUILD_COMMAND`        | `secrets.BUILD_COMMAND`    | `npm run build`| Build command for the frontend                   |
| `PUBLIC_DIR`           | `secrets.PUBLIC_DIR`       | `dist`         | Directory containing the compiled site           |
| `FIREBASE_PROJECT`     | `vars.FIREBASE_PROJECT_ID` | —              | Firebase project ID                              |
| `FIREBASE_TARGET`      | `secrets.FIREBASE_TARGET`  | `''`           | Optional Firebase hosting target name            |

---

## 🧩 Job: `build-and-deploy`

Runs on the `ubuntu-latest` GitHub-hosted runner.

### Steps

1. **Checkout Repo**
   - Uses `actions/checkout@v3`
   - Clones the latest code from the `main` branch.

2. **Setup Node.js**
   - Uses `actions/setup-node@v4`
   - Installs Node.js `22.x` version.

3. **Verify Node Version**
   - Outputs the Node.js version to confirm setup.

4. **Install Dependencies**
   - Uses `npm ci` for clean install.
   - Runs inside the `frontend` directory.

5. **Build Frontend**
   - Executes the build command from secrets or defaults.
   - Output goes to the directory specified by `PUBLIC_DIR`.

6. **Deploy to Firebase Hosting**
   - Uses `FirebaseExtended/action-hosting-deploy@v0`
   - Deploys the built app to Firebase Hosting:
     - Uses `secrets.FIREBASE_SERVICE_ACCOUNT` for authentication
     - Uses `vars.FIREBASE_PROJECT_ID` for the target project
     - Publishes to the `live` channel

---

## 🔐 Required GitHub Secrets & Variables

### Secrets
- `GITHUB_TOKEN` – Automatically provided by GitHub.
- `FIREBASE_SERVICE_ACCOUNT` – A JSON service account key with deploy permissions.
- `BUILD_COMMAND` *(optional)* – Custom build command (e.g., `yarn build`).
- `PUBLIC_DIR` *(optional)* – Folder to deploy (e.g., `build`, `dist`, etc.).
- `FIREBASE_TARGET` *(optional)* – Hosting target alias if used in `firebase.json`.

### Variables
- `FIREBASE_PROJECT_ID` – The Firebase project ID.

---

## 🔥 `firebase.json` Example

Make sure you include this configuration file in the root of your repository:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "cleanUrls": true,
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

> ✅ **Note:** Update the `"public"` directory if your build output is somewhere other than `dist`.

---

## 🧪 Manual Run

You can manually trigger the deployment by clicking **"Run workflow"** in the GitHub Actions tab.

---

## 🧹 Optional Improvements

- Add caching for `node_modules` to speed up builds.
- Add test steps before deploying.
- Add notifications (Slack, Discord, Email) on success or failure.