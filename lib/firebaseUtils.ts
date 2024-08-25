// lib/firestoreUtils.ts

import { firestore } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const fetchOrderData = async (userId: string, orderId: string) => {
  try {
    const docRef = doc(firestore, "users", userId, "orders", orderId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("No such document!");
    }
  } catch (error) {
    console.error("Error fetching order data:", error);
    throw new Error("Error fetching order data");
  }
};
