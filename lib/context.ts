import { createContext, Context } from "react";
import { User } from "firebase/auth";

export type AuthUser = { user?: User; username?: string };

export const UserContext: Context<AuthUser> = createContext({
  user: null,
  username: null,
} as unknown as AuthUser);
