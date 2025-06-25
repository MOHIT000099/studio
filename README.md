# Pandit Connect

This is a Next.js application built with Firebase Studio, designed to connect users with pandits for spiritual ceremonies.

## Getting Started

To run the application locally, first install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Publishing Your App (The Automated Way!)

This project is set up to publish automatically to Firebase App Hosting every time you make a change. To enable this, you need to complete a **one-time setup** to securely connect GitHub to your Firebase project.

### Step 1: Get Your Firebase Service Account Key

A service account key allows GitHub to securely act on your behalf to deploy the app.

1.  Go to the [Firebase Console](https://console.firebase.google.com/) and select your project.
2.  Click the **gear icon (⚙️)** next to "Project Overview" in the top-left, then select **Project settings**.
3.  Go to the **Service accounts** tab.
4.  Click the **Generate new private key** button. A warning will appear; click **Generate key** to confirm.
5.  A JSON file will download to your device. Keep this file safe and private. You'll need its contents for the next step.

### Step 2: Add Secrets to GitHub

You need to add the contents of the key file and your project ID as secrets in your GitHub repository.

1.  Go to your app's repository on [GitHub](https://github.com/).
2.  Click the **Settings** tab.
3.  In the left sidebar, navigate to **Secrets and variables > Actions**.
4.  Click the **New repository secret** button to add the first secret:
    *   **Name:** `FIREBASE_SERVICE_ACCOUNT_PANDIT_CONNECT`
    *   **Secret:** Open the JSON file you downloaded in Step 1, copy its **entire contents**, and paste them into this box.
5.  Click **Add secret**.
6.  Click **New repository secret** again to add the second secret:
    *   **Name:** `FIREBASE_PROJECT_ID`
    *   **Secret:** Go back to your Firebase Project Settings (from Step 1.2) and copy your **Project ID** from the "General" tab. Paste it here.
7.  Click **Add secret**.

### Step 3: Set the Admin Password

Your app's admin section is protected by a password. Since setting secrets in the Firebase console requires a paid plan, we'll set the password directly in your app's configuration file, which works on the free plan.

**Important Security Note:** This method stores your password in your source code. **Ensure your GitHub repository is set to "Private"** to protect it.

1.  Open the `apphosting.yaml` file in the project's main directory.
2.  Find the `env` section at the bottom of the file.
3.  Change the placeholder password from `'changeme'` to the password you want to use for the admin panel.

    ```yaml
    env:
      - variable: ADMIN_PASSWORD
        value: 'your-secret-password-here' # <-- Change this line
    ```
4.  Save the `apphosting.yaml` file and commit the change.

### You're All Set!

That's it! Now, every time you commit a change to your app, GitHub Actions will automatically deploy the latest version to Firebase App Hosting. You'll see the URL for your live site in the Firebase console. Congratulations!
