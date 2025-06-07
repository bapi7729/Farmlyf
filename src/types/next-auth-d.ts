import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id?: string;
      name?: string;
      email?: string;
      admin?: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    _id?: string;
    name?: string;
    email?: string;
    admin?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    name?: string;
    email?: string;
    admin?: boolean;
  }
}
