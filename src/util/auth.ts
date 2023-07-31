import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase";

export async function logout() {
    const auth = getAuth(app);
    return await auth.signOut();
}