import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import "./index";
import { firestore } from "./index";
import { IFirebaseUser } from "../../interfaces/interfaces";

export const create = async (data: object, dbName: string) => {
  const docRef = await addDoc(collection(firestore, dbName), {
    ...data,
  });

  return docRef;
};

export const fetchAll = async (dbName: string) => {
  try {
    const querySnapshot = await getDocs(collection(firestore, dbName));
    const resultSet: object[] = [];

    querySnapshot.forEach((doc) => {
      resultSet.push(doc.data());
    });

    return resultSet;
  } catch (error) {
    console.log("error [fetchAll]", error);
  }
};

export const getByEmail = async (email: string, dbName: string): Promise<IFirebaseUser | null> => {
  try {
    const q = query(collection(firestore, dbName), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    const dataList = querySnapshot.docs.map((doc) => {
      const data = doc.data() as Omit<IFirebaseUser, 'id'>;  
      return {
        id: doc.id,
        ...data,
      } as IFirebaseUser;  
    });

    return dataList.length > 0 ? dataList[0] : null;

  } catch (error) {
    console.error("Error fetching documents: ", error);
    throw error;
  }
};
