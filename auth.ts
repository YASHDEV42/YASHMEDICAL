import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"; // Fixed import typo
import Patient from "./models/Patient";
import connectDB from "./lib/db";
import { JWT } from "next-auth/jwt";
import type { Provider } from "next-auth/providers";

const providers: Provider[] = [
  CredentialsProvider({
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

      const user = await Patient.findOne({ email }).select("+password");

      if (!user || !user.password) {
        throw new Error("Invalid credentials");
      }

      const passwordsMatch = await bcrypt.compare(password, user.password);

      if (!passwordsMatch) {
        throw new Error("Invalid credentials");
      }

      const userData = {
        name: user.name,
        email: user.email,
        id: user._id.toString(),
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
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.sub && token?.role) {
        if (session.user) {
          session.user.id = token.sub;
        } else {
          console.error("session.user is undefined");
        }
      }
      return session;
    },

    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    signIn: async ({ account }: { account: any }) => {
      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
