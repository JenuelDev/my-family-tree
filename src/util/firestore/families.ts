import { addDoc, collection, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app, db, isLogged } from "../firebase";
import { useUserStore } from "@/stores/main";
import router from "@/router";

const cName = "families"; // collection name

async function checkIfLogged() {
    try {
        const data = await isLogged;
        useUserStore().user = data as any;
    } catch (e) {
        await router.push("/");
    }
}

export async function addFamily(clanName = "Clan" + (new Date()).getTime()) {
    const auth = getAuth(app);
    const uid = auth.currentUser?.uid;
    if (uid)
        await addDoc(collection(db, uid, "data", cName), {
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
                    city: "fasdfasdf"
                }
            ]
        });
}


export const getFamilies = async () => {
    await checkIfLogged();
    const auth = getAuth(app);
    const uid = auth.currentUser?.uid;

    if (uid) {
        const q = query(collection(db, uid, "data", cName));
        return await getDocs(q);
    }
};

export const getFamily = async (id: string) => new Promise(async (resolve, reject) => {
    await checkIfLogged();
    const auth = getAuth(app);
    const uid = auth.currentUser?.uid;

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

export const setFamily = async (id: string, data: any) => {
    await checkIfLogged();
    const auth = getAuth(app);
    const uid = auth.currentUser?.uid;

    if (uid) await setDoc(doc(db, uid, "data", cName, id), data)
}