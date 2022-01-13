// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVRFfMdZe4lDLbdInNtb5D4Weu8uBu5G8",
  authDomain: "react-fire-a49de.firebaseapp.com",
  projectId: "react-fire-a49de",
  storageBucket: "react-fire-a49de.appspot.com",
  messagingSenderId: "468250167782",
  appId: "1:468250167782:web:8c82e3580116dc50a4ee27",
  measurementId: "G-49N71Z1S4M",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth();

export { firebaseApp,auth };
