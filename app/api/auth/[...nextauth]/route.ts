import NextAuth, { NextAuthOptions, RequestInternal } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" }, // Changed type from "email" to "text"
        password: { label: "Password", type: "password" }, // Type remains "password"
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        const { email, password } = credentials ?? {};
        if (!email || !password) {
          throw new Error("Missing username or password");
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user || !(await compare(password, user.password))) {
          throw new Error("Invalid username or password");
        }
        return user;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
