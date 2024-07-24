import { addDoc, collection, DocumentData, DocumentReference, getDocs, query, where, WithFieldValue } from "firebase/firestore";
import "../index";
import { firestore } from "../index";
import { IFilterOpt } from "../../../interfaces/interfaces";

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


  // readonly update = async (data: UpdateOneArgs<M>, options?: Optional<UpdateOneOptions<M>, 'returning'>) => {
  //   return this.DBModel.update(data, { returning: true, individualHooks: false, ...options });
  // };

  // readonly deleteData = async (options: DeleteArgs<M>) => {
  //   return this.DBModel.destroy(options);
  // };

}


