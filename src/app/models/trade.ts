import {Book} from "./book";
import {User} from "./user";

export interface Trade {
  _id: string,
  book: Book,
  requester: User,
  status: string
}
