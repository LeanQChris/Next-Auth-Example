import { endpoints } from "@/constants/endpoints";
import axios from "axios";
import { AuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextRequest } from "next/server";

export const authOption: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  // custom page directories
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    session: ({ session, token }:{session:Session,token:JWT}) => {
      console.log(session,token)
      // adding new property to session value and returning it
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          token:"token",
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }:{token:JWT,user:User}) => {
      // adding new property to token value and returning it
      if (user) {
        const u = user as unknown as any;
        console.log(u)
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        username: {
          label: "Username",
          type: "username",
          placeholder: "Username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"username" | "password", string> | undefined
      ):Promise<User|any> {
         const loginFormData = {
          username: credentials?.username,
          password: credentials?.password,
        };
    const response = await axios.post(endpoints.auth.login, loginFormData);
    if (response.data) {
      console.log(response.data)
      return {token:response.data.token,name:"Chris Thapa"};
    }
    return response.data;
      },
    }),
  ],
};

const onlogin = async (loginFormData: any): Promise<any> => {
  try {
    const response = await axios.post(endpoints.auth.login, loginFormData);
    if (response.data) {
      return {user:{token:response.data.token,name:"Chris Thapa"}};
    }
    return null;
  } catch (error: any) {
    throw new Error(error);
  }
};
