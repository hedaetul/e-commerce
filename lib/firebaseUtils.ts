import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { auth, firestore } from "./firebase";

export interface Order {
  orderId: string;
  date: string;
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

const getPersonalInformation = async () => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const informationRef = doc(firestore, "users", userId);
    const informationSnap = await getDoc(informationRef);

    if (!informationSnap.exists()) {
      throw new Error("No personal details found for user");
    }

    const personalInformation = informationSnap.data()?.personalInformation;
    if (!personalInformation) {
      throw new Error("Personal details are missing or undefined");
    }

    return personalInformation;
  } catch (error) {
    console.error("Error fetching personal details:", error);
    throw error;
  }
};

const fetchOrdersAndCount = async (): Promise<{
  numberOfOrders: number;
  orders: Order[];
}> => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const ordersRef = collection(firestore, "users", userId, "orders");
    const querySnapshot = await getDocs(ordersRef);

    const orders: Order[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const orderDate = (data.date as Timestamp).toDate();
      const formattedDate = orderDate.toLocaleString();

      return {
        orderId: doc.id,
        date: formattedDate, 
        subtotal: data.subtotal,
        totalAmount: data.totalAmount,
        shippingCharge: data.shippingCharge,
        paymentMethod: data.paymentMethod,
        items: data.items,
        tax: data.tax,
        discount: data.discount,
        addFormData: data.addFormData,
      } as Order;
    });

    return {
      numberOfOrders: orders.length,
      orders,
    };
  } catch (error) {
    console.error("Error fetching orders and counting:", error);
    return { numberOfOrders: 0, orders: [] };
  }
};

export { fetchOrdersAndCount, getLatestOrder, getPersonalInformation };
