import { addDoc, collection, doc, DocumentData, documentId, DocumentReference, getDocs, query, updateDoc, where, WithFieldValue } from "firebase/firestore";
import "../index";
import { firestore, storage } from "../index";
import { IFilterOpt, IUpdateParams } from "../../../interfaces/interfaces";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export class BaseService {
  public dbName: string;

  constructor(dbName:string){
    this.dbName = dbName;
  }

  public create = async <T extends DocumentData>(data: WithFieldValue<T>): Promise<DocumentReference<T>> => {
    try {
      const docRef = await addDoc(collection(firestore, this.dbName), {...data , createAt : new Date() , updateAt : new Date()});
      return docRef as DocumentReference<T>;
    } catch (error) {
      console.error("error:[create] ", error);
      throw error;
    }
  };
  
  public get = async <T>({ key, opt, value }: IFilterOpt): Promise<T[]> => {
    try {
      const q = query(collection(firestore, this.dbName), where(key, opt, value));
      const querySnapshot = await getDocs(q);

      const dataList = querySnapshot.docs.map((doc) => {
        const data = doc.data() as T; 
        return {
          id: doc.id,
          ...data,
        };
      });

      return dataList as T[]; 
    } catch (error) {
      console.log("error:[get]", error);
      throw error; 
    }
  };

  public getAll = async <T>(): Promise<T[]> => {
    try {
      
      const querySnapshot = await getDocs(collection(firestore, this.dbName));

      const dataList = querySnapshot.docs.map((doc) => {
        const data = doc.data() as T; 
        return {
          id: doc.id,
          ...data,
        };
      });

      return dataList as T[]; 
    } catch (error) {
      console.log("error:[getAll]", error);
      throw error; 
    }
  };

  public update = async ({ id, data }: IUpdateParams): Promise<void> => {
    try {
      const q = query(collection(firestore, this.dbName), where(documentId(), '==', id));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("No matching documents found");
      }

      const docRef = doc(firestore, this.dbName, querySnapshot.docs[0].id);
      return await updateDoc(docRef, data);
      
    } catch (error) {
      console.log("error:[update]", error);
      throw error;
    }
  };

  public upload = async (file: File): Promise<string> => {
    try {

      const storageRef = ref(storage, `profiles/${file.name}`); 
      await uploadBytes(storageRef, file); 
      const downloadURL = await getDownloadURL(storageRef); 
      return downloadURL;

    } catch (error) {
      console.error('Error uploading file:', error);
      throw error; 
    }
  }

}


