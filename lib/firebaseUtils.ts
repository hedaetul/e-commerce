import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { firestore } from "./firebase";

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

export default getLatestOrder;
