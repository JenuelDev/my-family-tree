import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase";

export const isAlreadyLoggedIn = ({
    state
}: { state: (data: false | any) => void }) => {
    const auth = getAuth(app);
    return onAuthStateChanged(auth, (user) => {
        if (user) state(user);
        else state(false);
    });
}

export async function logout() {
    const auth = getAuth(app);
    return await auth.signOut();
}