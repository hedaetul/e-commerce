import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, firestore } from "./firebase";

const getLatestOrder = async (userId: string) => {
  try {
    const ordersRef = collection(firestore, "users", userId, "orders");
    const q = query(ordersRef, orderBy("date", "desc"), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("No orders found!");
    }

    const orderDoc = querySnapshot.docs[0];
    return { id: orderDoc.id, ...orderDoc.data() };
  } catch (error) {
    console.error("Error fetching the latest order:", error);
    throw error;
  }
};

const getPersonalDetails = async () => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.error("User not authenticated");
      throw new Error("User not authenticated");
    }

    const detailsRef = doc(firestore, "users", userId);
    const detailsSnap = await getDoc(detailsRef);

    if (!detailsSnap.exists()) {
      console.error("No personal details found for user:", userId);
      throw new Error("No personal details found!");
    }

    const personalDetails = detailsSnap.data()?.personalInformation;
    if (!personalDetails) {
      console.error("Personal details are missing or undefined");
      throw new Error("Personal details are missing!");
    }

    console.log("Fetched personal details:", personalDetails);
    return personalDetails;
  } catch (error) {
    console.error("Error fetching personal details:", error);
    throw error;
  }
};

const countOrders = async () => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User not authenticated");

    const ordersRef = collection(firestore, "users", userId, "orders");
    const querySnapshot = await getDocs(ordersRef);

    const numberOfOrders = querySnapshot.size;
    return numberOfOrders;
  } catch (error) {
    console.error("Error counting orders:", error);
    throw error;
  }
};

export { countOrders, getLatestOrder, getPersonalDetails };
