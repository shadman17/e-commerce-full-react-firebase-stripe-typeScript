import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsGtpWzSLEbbo0S1CDnkCSEAG3Rw0bJRA",
  authDomain: "crwn-clothing-db-34fd2.firebaseapp.com",
  projectId: "crwn-clothing-db-34fd2",
  storageBucket: "crwn-clothing-db-34fd2.appspot.com",
  messagingSenderId: "1070320846174",
  appId: "1:1070320846174:web:a55e5bc773cfa944743bcf",
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("Error Creating the user", error.message);
    }
  }

  return userDocRef;
};
