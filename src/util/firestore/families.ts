import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app, db } from "../firebase";
import SnapStorage from "snap-storage";
import { useUserStore } from "@/stores/main";
export const cName = "families"; // collection name
export const familyStorageBackupStorageKey = "familyStorageBackup";

export function backupFamilyDataToStorage() {
    const userStore = useUserStore();
    SnapStorage.set(familyStorageBackupStorageKey, userStore.families);
}

export async function addFamily(clanName = "Clan" + new Date().getTime()) {
    const userStore = useUserStore();
    const auth = getAuth(app);
    const uid = auth.currentUser?.uid;
    try {
        if (uid) {
            const DataToInsert = {
                name: clanName,
                data: [
                    {
                        id: 3,
                        gender: "male",
                        photo: "/defaultimage.jpeg",
                        name: "Click Me to Edit",
                        born: "1983-01-13",
                        email: "example@gmail.com",
                        phone: "+639503255473",
                        address: "La Trinidad, Benguet",
                        city: "America",
                    },
                ],
            };
            const data = await addDoc(collection(db, uid, "data", cName), DataToInsert);

            // if everything is good add it to store
            userStore.families.push({
                id: data.id,
                ...DataToInsert,
            });

            backupFamilyDataToStorage();
        }
    } catch (e) {
        throw "Their is an error Adding doc.";
    }
}

export const getFamilies = async () => {
    const user = SnapStorage.get("current-user");
    const uid = user.uid;
    if (uid) {
        const q = query(collection(db, uid, "data", cName));
        return await getDocs(q);
    } else {
        throw "Their is a problem Getting family List.";
    }
};

export const getFamily = async (id: string) =>
    new Promise(async (resolve, reject) => {
        const user = SnapStorage.get("current-user");
        const uid = user.uid;

        if (uid) {
            const docRef = doc(db, uid, "data", cName, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                resolve(docSnap.data());
            } else {
                reject("No Such Document");
            }
        }
    });

export const deleteFamily = async (id: string | number) =>
    new Promise(async (resolve, reject) => {
        const user = SnapStorage.get("current-user");
        const uid = user.uid;
        const userStore = useUserStore();

        if (uid) {
            const docRef = doc(db, uid, "data", cName, id as string);
            deleteDoc(docRef)
                .then(() => {
                    // update data in user store
                    const indexOfFamilyInStore = userStore.families.findIndex((item: { id: string }) => item.id === id);
                    if (indexOfFamilyInStore > -1) userStore.families.splice(indexOfFamilyInStore, 1);

                    resolve("Successfully Deleted Family");
                })
                .catch(() => {
                    reject("Cannot Delete Family Tree.");
                });
        }
    });

export const setFamily = async (id: string, data: { name: string; data: any }) => {
    const userStore = useUserStore();
    const user = SnapStorage.get("current-user");
    const uid = user.uid;

    // update data in user store
    const indexOfFamilyInStore = userStore.families.findIndex((item: { id: string }) => item.id === id);
    if (indexOfFamilyInStore > -1) {
        userStore.families[indexOfFamilyInStore] = {
            id,
            ...data,
        };
    }

    if (uid) await setDoc(doc(db, uid, "data", cName, id), data);
};
