import firebase from "firebase";

export function getReference(
  path: string
): firebase.firestore.DocumentReference<any> {
  const firestore = firebase.app().firestore();
  return firestore.doc(path);
}

export async function getFirestoreData<T>(
  ref: firebase.firestore.DocumentReference<any>
): Promise<T> {
  let data: T;

  const snapshot = await ref.get();

  if (snapshot.exists) {
    data = snapshot.data() as T;
  } else {
    throw new Error(
      "getFirestoreData(): No data found for provided reference."
    );
  }
  return data;
}
