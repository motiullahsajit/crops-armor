// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoYaMzUNL9gRq169YjQeXe2xiK3yJODmw",
  authDomain: "green-armor-35663.firebaseapp.com",
  projectId: "green-armor-35663",
  storageBucket: "green-armor-35663.appspot.com",
  messagingSenderId: "331628398300",
  appId: "1:331628398300:web:b371de77116d7f48eed619"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app