# HobbyHub - Connect Through Shared Passions

![HobbyHub Screenshot](https://i.ibb.co/RzT3f6W/HobbyHub-Screenshot.png) 
*(Replace with an actual screenshot of your deployed app)*

## 🚀 Live Demo

Explore the application live: [https://hobby-hub-authentication.web.app](https://hobby-hub-authentication.web.app)

## ✨ Features

HobbyHub is a platform designed to help individuals discover and connect with others who share similar hobbies and interests.

* **User Authentication (Firebase)**: Secure user registration and login using email/password.
* **Google Authentication**: Convenient one-click login/registration using Google accounts.
* **Persistent Login**: Users stay logged in across sessions (unless they explicitly log out).
* **Password Reset**: Option to reset forgotten passwords via email.
* **Dynamic Theme Toggle**: Switch between Light and Dark modes with preference persistence using `localStorage`.
* **Responsive Navbar**: Adapts to different screen sizes for seamless navigation.
* **Interactive Homepage**:
    * **Lottie Animations**: Engaging JSON-based animations for a lively user experience.
    * **React Simple Typewriter**: Dynamic text typing effect for captivating headlines.
    * **React Awesome Reveal**: Scroll-triggered animations that bring content to life as it enters the viewport.
* **Toast Notifications (React Toastify)**: Provides friendly and informative feedback for user actions (e.g., successful login, errors).
* **Group Management (Placeholder)**: (Based on `Create Group` and `Available Groups` routes, assuming future implementation)
    * Browse available hobby groups.
    * Create new hobby groups.
* **Global Loading Spinner**: Visual feedback during authentication checks and other asynchronous operations.
* **Clean and Modern UI**: Built with Tailwind CSS for a sleek and customizable design.
* **React Router DOM**: Smooth and efficient client-side routing.

## 🛠 Technologies Used

**Frontend:**

* **React.js**: A JavaScript library for building user interfaces.
* **Vite**: A fast build tool for modern web projects.
* **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
* **React Router DOM**: Declarative routing for React.
* **Lottie React**: React component for rendering Lottie animations.
* **React Simple Typewriter**: For dynamic text typing effects.
* **React Awesome Reveal**: For scroll-triggered reveal animations.
* **React Toastify**: For beautiful and responsive toast notifications.
* **React Tooltip**: For interactive tooltips (already in use).

**Backend/Authentication:**

* **Firebase Authentication**: For secure user registration, login, and Google sign-in.
* **Firebase Hosting**: For deploying the web application.

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

* Node.js (LTS version recommended)
* npm (or Yarn)
* Firebase CLI (installed globally: `npm install -g firebase-tools`)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YourGitHubUsername/hobby-hub-client.git](https://github.com/YourGitHubUsername/hobby-hub-client.git)
    cd hobby-hub-client
    ```
    *(Replace `YourGitHubUsername/hobby-hub-client.git` with your actual repository URL)*

2.  **Install dependencies:**
    ```bash
    npm install
    # OR
    yarn install
    ```

3.  **Set up Firebase:**
    * Create a new Firebase project in the [Firebase Console](https://console.firebase.google.com/).
    * Enable **Email/Password** and **Google** authentication methods in the Firebase Console (Authentication > Sign-in method).
    * **Get your Firebase project configuration:** Go to Project settings (`⚙️` icon) > Your apps > Web app. Copy the `firebaseConfig` object.
    * Create a file `src/firebase/firebase.config.js` (if it doesn't exist) and paste your configuration:
        ```javascript
        // src/firebase/firebase.config.js
        import { initializeApp } from "firebase/app";
        import { getAuth } from "firebase/auth";
        // import { getFirestore } from "firebase/firestore"; // Uncomment if using Firestore

        const firebaseConfig = {
          apiKey: "YOUR_API_KEY",
          authDomain: "YOUR_AUTH_DOMAIN",
          projectId: "YOUR_PROJECT_ID",
          storageBucket: "YOUR_STORAGE_BUCKET",
          messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
          appId: "YOUR_APP_ID"
        };

        const app = initializeApp(firebaseConfig);
        export const auth = getAuth(app);
        // export const db = getFirestore(app); // Uncomment if using Firestore
        ```
    * **Initialize Firebase in your project directory:**
        ```bash
        firebase init
        ```
        Follow the prompts:
        * Choose your Firebase project.
        * Select `Hosting` (and `Firestore` if you plan to use it for data).
        * For the public directory, enter `dist` (since you are using Vite, this is where your built files will go).
        * Configure as a single-page app: `Yes`.
        * Set up automatic deploys with GitHub: `No` (or `Yes` if you want to integrate).

### Running the Project

1.  **Start the development server:**
    ```bash
    npm run dev
    # OR
    yarn dev
    ```
    This will open the application in your browser, usually at `http://localhost:5173`.

### Building for Production

To create a production-ready build of your application:

```bash
npm run build
# OR
yarn build