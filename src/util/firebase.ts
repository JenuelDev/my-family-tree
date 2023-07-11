import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { addFamily, getFamilies } from "./firestore/families"
import { isAlreadyLoggedIn } from "./auth";

export const app = initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_apiKey,
    authDomain: import.meta.env.VITE_FIREBASE_authDomain,
    projectId: import.meta.env.VITE_FIREBASE_projectId,
    storageBucket: import.meta.env.VITE_FIREBASE_storageBucket,
    messagingSenderId: import.meta.env.VITE_FIREBASE_messagingSenderId,
    appId: import.meta.env.VITE_FIREBASE_appId,
    measurementId: import.meta.env.VITE_FIREBASE_measurementId
});

export const db = getFirestore(app);

export const isLogged = new Promise((resolve, reject) => {
    isAlreadyLoggedIn({
        state: (data: Object | boolean) => {
            if (!data) reject("User Is Not Logged In.");
            else resolve(data);
        },
    });
});

export {
    addFamily,
    getFamilies
}