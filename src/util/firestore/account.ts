import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "@/util/firebase";

const FAMILY_COLLECTION = "families";

export async function deleteCurrentUserFamilyData(uid: string) {
    const familiesRef = collection(db, uid, "data", FAMILY_COLLECTION);
    const snapshot = await getDocs(familiesRef);

    await Promise.all(snapshot.docs.map((item) => deleteDoc(doc(db, uid, "data", FAMILY_COLLECTION, item.id))));
}
