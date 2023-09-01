import { User } from "./IUser";

export interface Reply {
    id: number;
    content: string;
    score: number;
    user: User;
    createdAt: string;
    replyingTo: string;
  }