import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; // Correct import
import { compare } from "bcryptjs";
import dbConnect from "../../../../lib/middleware/db";
import User from "../../../../lib/model/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jhon@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: {
        email: string;
        password: string;
      }): Promise<any> {
        await dbConnect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (!user) throw new Error("No user found");
          if (!user.isVerified) throw new Error("Account not verified");
          const ifPasswordMatch = await compare(
            credentials.password,
            user.password
          );
          if (!ifPasswordMatch) throw new Error("Incorrect Credentials");
          return user;
        } catch (error: any) {
          throw new Error(
            error.message || "An error occurred during authorization"
          );
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    signOut: "/auth/signout",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
