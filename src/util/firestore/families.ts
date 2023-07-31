import { addDoc, collection, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app, db } from "../firebase";
import SnapStorage from "snap-storage";
const cName = "families"; // collection name

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
                    city: "America"
                }
            ]
        });
}


export const getFamilies = async () => {
    const user = SnapStorage.get('current-user');
    const uid = user.uid;
    if (uid) {
        const q = query(collection(db, uid, "data", cName));
        return await getDocs(q);
    } else {
        throw "Their is a problem Getting family List."
    }
};

export const getFamily = async (id: string) => new Promise(async (resolve, reject) => {
    const user = SnapStorage.get('current-user');
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

export const setFamily = async (id: string, data: any) => {
    const user = SnapStorage.get('current-user');
    const uid = user.uid;

    if (uid) await setDoc(doc(db, uid, "data", cName, id), data);
};