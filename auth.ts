import NextAuth from "next-auth";
import { Account } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./models/User";
import connectDB from "./lib/db";
import { JWT } from "next-auth/jwt";
import type { Provider } from "next-auth/providers";
import { randomBytes } from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

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
  isVerified?: boolean;
  verificationToken?: string;
}

async function sendVerificationEmail(email: string, token: string) {
  const verificationLink = `${process.env.NEXTAUTH_URL}/verify?token=${token}`;

  try {
    await resend.emails.send({
      from: "Your App <onboarding@resend.dev>",
      to: email,
      subject: "Verify your email address",
      html: `
        <h2>Email Verification</h2>
        <p>Please click the link below to verify your email address:</p>
        <a href="${verificationLink}" style="background-color: #4CAF50; color: white; padding: 14px 20px; text-decoration: none; border-radius: 4px;">
          Verify Email
        </a>
        <p>If you didn't request this email, you can safely ignore it.</p>
      `,
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
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
      if (!user.isVerified) {
        const verificationToken = randomBytes(32).toString("hex");
        await User.findByIdAndUpdate(user._id, { verificationToken });
        await sendVerificationEmail(user.email, verificationToken);
        throw new Error(
          "Please verify your email address. A new verification email has been sent."
        );
      }

      const userData = {
        name: user.name,
        email: user.email,
        id: user._id.toString(),
        role: user.role,
        isVerified: user.isVerified,
      };

      return userData;
    },
  }),
];

export const authConfig = {
  providers,
  pages: {
    signIn: "/login",
    verifyRequest: "/verify-request",
  },
  callbacks: {
    async session({ session, token }: { session: DefaultSession; token: JWT }) {
      if (token?.sub && token?.role) {
        if (session.user) {
          session.user.id = token.sub;
          session.user.role = token.role as string;
          session.user.isVerified = token.isVerified as boolean;
        }
      }

      return session;
    },

    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.role = user.role;
        token.isVerified = user.isVerified;
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

export async function verifyEmail(token: string) {
  await connectDB();

  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    throw new Error("Invalid verification token");
  }

  await User.findByIdAndUpdate(user._id, {
    isVerified: true,
    verificationToken: null,
  });

  return true;
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
