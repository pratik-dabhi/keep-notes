import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import "./index";
import { firestore } from "./index";

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

export const getByEmail = async (email: string, dbName: string) => {
  try {
    const q = query(collection(firestore, dbName), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    const dataList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return dataList ? dataList[0] : null;

  } catch (error) {
    console.error("Error fetching documents: ", error);
    throw error;
  }
};
