export function verifyFirebaseId(id: string) {
  const firestoreIdRegex = /^[a-zA-Z0-9]{20}$/;
  const isFirestoreId = firestoreIdRegex.test(id);

  return isFirestoreId;
};