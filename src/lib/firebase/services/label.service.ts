import { BaseService } from "./base.service";

class LabelService extends BaseService {
  constructor() {
    super("labels");
  }

}

export default new LabelService();
