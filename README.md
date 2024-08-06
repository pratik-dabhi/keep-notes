# Notes App

A simple notes application built using Vite, React, and Tailwind CSS. The app uses Firebase for storing notes and Firestore for storing images.

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Setup](#setup)

## Features

- Create, update, and delete notes
- Store notes in Firebase
- Upload and display images using Firestore
- Responsive design with Tailwind CSS

## Screenshots

### Register
<img src="https://firebasestorage.googleapis.com/v0/b/keep-notes-4a6ba.appspot.com/o/docs%2FREGISTER.png?alt=media&token=6ad065b3-6670-48d7-bd8f-cc9ca99a068c" alt="Notes App Screenshot" width="100%">

### Login
<img src="https://firebasestorage.googleapis.com/v0/b/keep-notes-4a6ba.appspot.com/o/docs%2FLOGIN.png?alt=media&token=09eb90ea-fc2d-46d0-b743-ce56a524bbbc" alt="Notes App Screenshot" width="100%">

### Notes
<img src="https://firebasestorage.googleapis.com/v0/b/keep-notes-4a6ba.appspot.com/o/docs%2FNOTES.png?alt=media&token=aaa744ce-80e9-4e3c-9937-3a1aeba5cbff" alt="Notes App Screenshot" width="100%">

### Create Note
<img src="https://firebasestorage.googleapis.com/v0/b/keep-notes-4a6ba.appspot.com/o/docs%2FCREATE_NOTE.png?alt=media&token=f994716b-08ac-417f-80ba-ee190d6984fd" alt="Notes App Screenshot" width="100%">

### Create Label
<img src="https://firebasestorage.googleapis.com/v0/b/keep-notes-4a6ba.appspot.com/o/docs%2FCREATE_LABEL.png?alt=media&token=def2ca7b-af29-4c35-8cf2-3ff0e3b528fe" alt="Notes App Screenshot" width="100%">

### Profile
<img src="https://firebasestorage.googleapis.com/v0/b/keep-notes-4a6ba.appspot.com/o/docs%2FPROFILE.png?alt=media&token=b6acd000-c191-4adc-9f0b-e206126afb89" alt="Notes App Screenshot" width="100%">

## Setup

To get started with the project, follow these steps:

### Prerequisites

- Node.js (>=20.x)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/pratik-dabhi/notes-app.git
   cd notes-app

2. **Install dependencies:**
   ```sh
   npm install

3. **Set up Firebase:**

    - Go to the Firebase Console.
    - Create a new project.
    - Add a web app to your project.
    - Copy the Firebase configuration and create a .env file in the root directory of your project with the following variables:
        ```sh
        VITE_FIREBASE_API_KEY=your_api_key
        VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
        VITE_FIREBASE_PROJECT_ID=your_project_id
        VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
        VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
        VITE_FIREBASE_APP_ID=your_app_id
        VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

4. **Run the development server:**
    ```sh
    npm run dev