import { db } from "../firebase/config";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import UserModel from "../models/User.model";

const USERS_COLLECTION = "users";

// TODO: Fazer logica para encriptar senha

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

async function userExists(
  email: string,
): Promise<boolean> {
  const usersRef = collection(db, USERS_COLLECTION);

  const emailQuery = query(
    usersRef, where("email", "==", email)
  );
  const emailSnap = await getDocs(emailQuery);

  if (emailSnap.empty) return false;

  return true;
};

export async function createUser(
  user: Omit<UserModel, "id">
): Promise<UserModel | undefined> {
  const exists = await userExists(
    user.email
  );

  if (exists) throw new UserServiceError(
    "User with same email or tag already exists", 409
  );

  const userRef = await addDoc(
    collection(
      db, USERS_COLLECTION
    ), user
  );

  return { id: userRef.id, ...user };
};

export async function getUsers(): Promise<UserModel[]> {
  const snapshot = await getDocs(
    collection(db, USERS_COLLECTION)
  );

  return snapshot.docs.map(
    (d) => ({ 
      id: d.id, 
      ...d.data() 
    } as UserModel)
  );
};

export async function getUserById(
  id: string
): Promise<UserModel | null> {
  const docSnap = await getDoc(
    doc(db, USERS_COLLECTION, id)
  );
  
  const data = docSnap.exists() ? (
    docSnap.data() as UserModel
  ) : null;
  
  if (data === null) throw new UserServiceError(
    "User not exists", 404
  );

  return data;
};

export async function updateUser(
  id: string, 
  data: Partial<UserModel>
) {
  const getUser = await getUserById(id);

  if (!getUser) throw new UserServiceError(
    "User not exists", 400
  );

  return await updateDoc(
    doc(db, USERS_COLLECTION, id),
    data
  );
};

export async function deleteUser(id: string) {
  await getUserById(id);

  await deleteDoc(
    doc(db, USERS_COLLECTION, id)
  );

  return {
    success: true, 
    message: "User deleted successfully!" 
  };
};