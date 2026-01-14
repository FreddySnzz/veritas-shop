import { db } from "../firebase/config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import UserModel from "../models/User.model";
import { Collections } from "../types/collections.enum";

export class UserServiceError extends Error {
  status: number;
  constructor(
    message: string, 
    status = 400
  ) {
    super(message);
    this.status = status;
  };
};

export async function getUserByEmail(
  email: string
): Promise<UserModel[] | null> {
  const q = query(collection(
    db, 
    Collections.USERS_COLLECTION
  ), where("email", "==", email));

  const snapshot = await getDocs(q);

  return snapshot.docs.map(
    (doc) => ({ 
      id: doc.id, 
      ...doc.data() 
    } as UserModel)
  );
};

export async function getUserById(
  id: string
): Promise<UserModel | null> {
  const docSnap = await getDoc(
    doc(db, Collections.USERS_COLLECTION, id)
  );
  
  const data = docSnap.exists() ? (
    docSnap.data() as UserModel
  ) : null;
  
  if (data === null) throw new UserServiceError(
    "User not exists", 404
  );

  return data;
};