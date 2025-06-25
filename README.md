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

## Publishing Your App

This app is designed to be deployed with **Firebase App Hosting**. Follow these steps to publish it:

### 1. Install Firebase CLI

If you don't have it already, install the Firebase Command Line Interface (CLI) on your computer.

```bash
npm install -g firebase-tools
```

### 2. Log in to Firebase

Log in to your Google account using the CLI.

```bash
firebase login
```

### 3. Initialize App Hosting

In your project's root directory, run the initialization command. This will connect your local code to your Firebase project.

```bash
firebase init apphosting
```

You will be prompted to select a Firebase project. Make sure to choose the one you want to deploy to.

### 4. Set the Admin Password

Your app's admin section is protected by a password. You must set this as a secret in Firebase. Run the following command and enter your desired password when prompted.

```bash
firebase apphosting:secrets:set ADMIN_PASSWORD
```

### 5. Deploy!

You're ready to go live. Run the deploy command:

```bash
firebase deploy --only apphosting
```

After the command finishes, Firebase will give you the URL where your live application can be accessed. Congratulations!
