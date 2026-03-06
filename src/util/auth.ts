import { getAuth, onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { deleteUser } from "firebase/auth";
import { app } from "./firebase";
import SnapStorage from "snap-storage";
import { deleteCurrentUserFamilyData } from "@/util/firestore/account";

const providerNameMap: Record<string, string> = {
    "google.com": "Google",
    "github.com": "GitHub",
    "facebook.com": "Facebook",
    password: "Email/Password",
    "phone": "Phone",
};

export type AuthSnapshot = {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    providerId: string | null;
    providerName: string;
};

function resolveProvider(user: User) {
    const providerIds = [
        ...user.providerData.map((item) => item.providerId).filter(Boolean),
        user.providerId,
    ].filter((id) => id && id !== "firebase");

    const providerId = providerIds.find((id) => providerNameMap[id]) || providerIds[0] || null;
    const providerName = providerId ? providerNameMap[providerId] || providerId : "Not available";

    return { providerId, providerName };
}

export function toAuthSnapshot(user: User | null): AuthSnapshot | null {
    if (!user) return null;

    const { providerId, providerName } = resolveProvider(user);

    return {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        providerId,
        providerName,
    };
}

export async function logout() {
    const auth = getAuth(app);
    SnapStorage.remove('current-user');
    return await auth.signOut();
}

export async function deleteCurrentUserAccount() {
    const auth = getAuth(app);
    const currentUser = auth.currentUser;

    if (!currentUser) {
        throw new Error("No authenticated user found.");
    }

    await deleteCurrentUserFamilyData(currentUser.uid);
    await deleteUser(currentUser);
    SnapStorage.remove("current-user");
}