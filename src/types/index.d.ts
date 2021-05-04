import { User } from '../models/user/User';

declare global {
  namespace Express {
    export interface Request {
      currentUser: User;
    }
  }
}
