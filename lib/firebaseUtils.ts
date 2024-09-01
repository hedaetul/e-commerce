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

export interface Order {
  orderId: string;
  date: string ;
  subtotal: number;
  totalAmount: number;
  shippingCharge: number;
  paymentMethod: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  tax: number;
  discount: number;
  addFormData?: object; // Add other fields as needed
}


const getLatestOrder = async (userId: string) => {
  try {
    const ordersRef = collection(firestore, "users", userId, "orders");
    const q = query(ordersRef, orderBy("date", "desc"), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("No orders found!");
    }

    const orderDoc = querySnapshot.docs[0];
    return {
      orderId: orderDoc.id,
      ...orderDoc.data(),
    } as Order;
  } catch (error) {
    console.error("Error fetching the latest order:", error);
    throw error;
  }
};

const getPersonalDetails = async () => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const detailsRef = doc(firestore, "users", userId);
    const detailsSnap = await getDoc(detailsRef);

    if (!detailsSnap.exists()) {
      throw new Error("No personal details found for user");
    }

    const personalDetails = detailsSnap.data()?.personalInformation;
    if (!personalDetails) {
      throw new Error("Personal details are missing or undefined");
    }

    return personalDetails;
  } catch (error) {
    console.error("Error fetching personal details:", error);
    throw error;
  }
};

const fetchOrdersAndCount = async (): Promise<{ numberOfOrders: number; orders: Order[] }> => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const ordersRef = collection(firestore, "users", userId, "orders");
    const querySnapshot = await getDocs(ordersRef);

    const orders: Order[] = querySnapshot.docs.map((doc) => ({
      orderId: doc.id,
      ...doc.data(),
    })) as Order[];

    return {
      numberOfOrders: orders.length,
      orders,
    };
  } catch (error) {
    console.error("Error fetching orders and counting:", error);
    return { numberOfOrders: 0, orders: [] };
  }
};


export { fetchOrdersAndCount, getLatestOrder, getPersonalDetails };
