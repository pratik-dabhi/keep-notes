import { BaseService } from "./base.service";

class NotesService extends BaseService {
  constructor() {
    super("notes");
  }

}

export default new NotesService();
