import { db } from "../firebase/config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import UserModel from "../models/User.model";
import { Collections } from "../types/collections.enum";
import { unstable_cache } from "next/cache";
import { createPasswordHashed } from "@/lib/password";
import { CreateUserRequest } from "../types/auth";
import { RolesEnum } from "../types/roles.enum";

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
  email?: string,
  phone?: string,
): Promise<boolean> {
  const userRef = collection(db, Collections.USERS_COLLECTION);

  const emailQuery = query(
    userRef, where("email", "==", email)
  );

  const phoneQuery = query(
    userRef, where("phone", "==", phone)
  );

  const emailSnap = await getDocs(emailQuery);
  const phoneSnap = await getDocs(phoneQuery);

  if (!emailSnap.empty || !phoneSnap.empty) return true;

  return false;
};

export async function createUser(
  data: CreateUserRequest
): Promise<Partial<UserModel>> {
  const verifyUserExists = await userExists(data.email, data.phone);

  if (verifyUserExists) {
    return new UserServiceError("User already exists", 400);
  };

  const hashedPassword = await createPasswordHashed(data.password!);
  
  const docRef = await addDoc(collection(db, Collections.USERS_COLLECTION), {
    ...data,
    phone: "55" + data.phone,
    password: hashedPassword,
    role: RolesEnum.USER,
    updated_at: new Date(),
  });
  
  return { 
    ...data, 
    id: docRef.id,
    role: RolesEnum.USER,
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

export async function getUserByPhone(
  phone: string
): Promise<UserModel[] | null> {
  const q = query(collection(
    db, 
    Collections.USERS_COLLECTION
  ), where("phone", "==", phone));

  const snapshot = await getDocs(q);

  return snapshot.docs.map(
    (doc) => ({ 
      id: doc.id, 
      ...doc.data() 
    } as UserModel)
  );
};

export async function updateUser(
  id: string, 
  data: UserModel
): Promise<UserModel> {
  const docRef = doc(db, Collections.USERS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    throw new UserServiceError("User not exists", 404);
  };

  const updatedData = {
    ...docSnap.data(),
    ...data,
  };

  await updateDoc(docRef, updatedData);

  return updatedData;
};

export const getCachedAdminInfo = unstable_cache(
  async () => getUserByEmail('root.admin@veritasatelie.com'),
  ['admin_info'],
  {
    revalidate: 86400,
    tags: ['admin_info'],
  }
);