import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "./../firebase/firebase"; // Your Firebase config initialization

const db = getFirestore(app);
const auth = getAuth(app);

/**
 * Registers a user based on role and stores their details in Firestore.
 * @param userData User form data
 */
export const registerUser = async (userData: {
  name?: string;
  email: string;
  phone?: string;
  password: string;
  role: string;
  shopName?: string;
  shopLocation?: string;
  companyName?: string;
  branchLocation?: string;
  companyLocation?: string;
}) => {
  try {
    // Create user in Firebase Auth
    const { email, password } = userData;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    // Prepare Firestore data
    const userDoc: any = {
      email: userData.email,
      phone: userData.phone || "",
      role: userData.role,
      createdAt: new Date().toISOString(),
      userId, // Reference to the Firebase Auth user ID
    };

    // Include role-specific fields
    if (userData.role === "sales_rep") {
      userDoc.name = userData.name || "";
      userDoc.companyName = userData.companyName || "";
      userDoc.branchLocation = userData.branchLocation || "";
    }

    if (userData.role === "shop_owner") {
      userDoc.name = userData.name || "";
      userDoc.shopName = userData.shopName || "";
      userDoc.shopLocation = userData.shopLocation || "";
    }

    if (userData.role === "company") {
      userDoc.companyName = userData.companyName || "";
      userDoc.companyLocation = userData.companyLocation || "";
      
    }

    // Use the correct Firestore collection based on the role
    const collectionName = userData.role === "sales_rep" ? "sales-rep" : userData.role === "shop_owner" ? "shop_owner" : "company";
    const docRef = await addDoc(collection(db, collectionName), userDoc);

    return { success: true, docId: docRef.id };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
