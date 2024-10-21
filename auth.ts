import NextAuth from "next-auth";
import { Account } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"; // Fixed import typo
import User from "./models/User";
import connectDB from "./lib/db";
import { JWT } from "next-auth/jwt";
import type { Provider } from "next-auth/providers";
export interface DefaultSession {
  user?: User;
  expires: string;
}
export interface User {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
}
const providers: Provider[] = [
  Credentials({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (credentials) => {
      const email = credentials?.email;
      const password = credentials?.password;

      if (!email || !password) {
        throw new Error("Please fill in all fields");
      }

      await connectDB();

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        throw new Error("Invalid credentials");
      }

      if (!user.password || typeof user.password !== "string") {
        console.log(
          "Password field is not a string or undefined:",
          user.password
        );
        throw new Error("Invalid credentials");
      }

      const passwordsMatch = await bcrypt.compare(
        password as string,
        user.password
      );

      if (!passwordsMatch) {
        throw new Error("Invalid credentials");
      }

      const userData = {
        name: user.name,
        email: user.email,
        id: user._id.toString(),
        role: user.role,
      };

      return userData;
    },
  }),
];

export const authConfig = {
  providers,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }: { session: DefaultSession; token: JWT }) {
      if (token?.sub && token?.role) {
        if (session.user) {
          session.user.id = token.sub;
          session.user.role = token.role as string;
        }
      }

      return session;
    },

    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    signIn: async ({ account }: { account: Account | null }) => {
      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
