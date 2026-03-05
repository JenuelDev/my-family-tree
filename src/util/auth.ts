import { getAuth, onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { app } from "./firebase";
import SnapStorage from "snap-storage";

export type AuthSnapshot = {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
};

export function toAuthSnapshot(user: User | null): AuthSnapshot | null {
    if (!user) return null;

    return {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
    };
}

export async function logout() {
    const auth = getAuth(app);
    SnapStorage.remove('current-user');
    return await auth.signOut();
}