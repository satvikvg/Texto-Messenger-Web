import firebase from "firebase";

export function getReference(
  path: string
): firebase.firestore.DocumentReference<any> {
  const firestore = firebase.app().firestore();
  return firestore.doc(path);
}

export function getFirestoreData<T>(
  ref: firebase.firestore.DocumentReference<any>
): T | null {
  let data: T | null | undefined = undefined;

  ref
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        data = snapshot.data() as T;
      } else {
        data = null;
      }
    })
    .catch((error) => {
      console.error(error);
      data = null;
    })
    .finally(() => {
      return data ? data : null;
    });

  // TODO: This is TEMPORARY solution [CAUTION!], Please find better alternative solution.
  do {} while (data === undefined);
  return data;
}

export function createMandatoryPropertyMissingException(
  missingParameters: string[],
  modalClass: string
) {
  const error = new Error(
    `One or more of ${missingParameters} property elements are missing, but required to construct type '${modalClass}'`
  );
  console.error(error);
  return error;
}

export function generateUID(collectionPath: string): string {
  const firestore = firebase.app().firestore();
  return firestore.collection(collectionPath).doc().id;
}
