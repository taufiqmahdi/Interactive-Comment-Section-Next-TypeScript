import { Reply } from "./IReply";
import { User } from "./IUser";

export type Comment = {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: User;
    replies: Reply[];
  };