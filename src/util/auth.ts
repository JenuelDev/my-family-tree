import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase";
import SnapStorage from "snap-storage";

export async function logout() {
    const auth = getAuth(app);
    SnapStorage.remove('current-user');
    return await auth.signOut();
}