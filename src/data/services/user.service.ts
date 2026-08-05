import { db } from "../firebase/config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import UserModel from "../models/User.model";
import { Collections } from "../types/collections.enum";
import { unstable_cache } from "next/cache";
import { createPasswordHashed } from "@/lib/password";
import { CreateUserRequest, CreateUserWithGoogleRequest } from "../types/auth";
import { RolesEnum } from "../types/enums/roles.enum";

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
  id?: string
): Promise<boolean> {
  if (!email && !phone && !id) return false;
  
  const userRef = collection(db, Collections.USERS_COLLECTION);

  if (id) {
    const docRef = doc(db, Collections.USERS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return true; 
  };

  const queriesToRun = [];

  if (email) {
    const emailQuery = query(userRef, where("email", "==", email), limit(1));
    queriesToRun.push(getDocs(emailQuery).then(snap => !snap.empty));
  };

  if (phone) {
    const phoneQuery = query(userRef, where("phone", "==", phone), limit(1));
    queriesToRun.push(getDocs(phoneQuery).then(snap => !snap.empty));
  };

  if (queriesToRun.length === 0) return false;

  const results = await Promise.all(queriesToRun);

  return results.some(exists => exists === true);
};

export async function createUser(
  data: CreateUserRequest
): Promise<Partial<UserModel>> {
  const verifyUserExists = await userExists(data?.phone, data?.email, );

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

export async function createUserWithGoogle(
  data: CreateUserWithGoogleRequest
): Promise<Partial<UserModel> | undefined> {
  if (!data.uid) return;

  const verifyUserExists = await userExists(data.email, data.phone, data.uid);

  if (verifyUserExists) {
    return new UserServiceError("User already exists", 400);
  };

  const userRef = doc(db, Collections.USERS_COLLECTION, data.uid);
  
  await setDoc(userRef, {
    name: data.displayName,
    email: data.email,
    phone: data.phone || null,
    password: null,
    role: RolesEnum.USER,
    updated_at: new Date(),
  }, { merge: true });
  
  return data;
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

  if (data.password) {
    const hashedPassword = await createPasswordHashed(data.password);
    updatedData.password = hashedPassword;
  }

  if (data.phone) {
    updatedData.phone = data.phone.length === 11 ? "55" + data.phone : data.phone;
  }

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