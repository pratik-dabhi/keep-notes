import { IFirebaseUser } from "../../../interfaces/interfaces";
import { BaseService } from "./base.service";

class UserService extends BaseService {
  constructor() {
    super("users");
  }

  public getByEmail = async (email: string): Promise<IFirebaseUser | null> => {
    try {
      const dataList = await this.get<IFirebaseUser>({
        key: "email",
        opt: "==",
        value: email,
      });

      return dataList && dataList.length > 0 ? dataList[0] : null;

    } catch (error) {
      console.error("Error : [getByEmail] ", error);
      throw error;
    }
  };
}

export default new UserService();
