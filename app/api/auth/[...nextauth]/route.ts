import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifySiweMessage, type MiniAppWalletAuthSuccessPayload } from "@worldcoin/minikit-js";
import { cookies } from "next/headers";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Ethereum (SIWE)",
      credentials: {
        payload: { label: "Payload", type: "text" },
        nonce: { label: "Nonce", type: "text" },
      },
      async authorize(credentials) {
        try {
          if (!credentials) return null;
          const { payload, nonce } = credentials;
          const parsed = JSON.parse(payload) as MiniAppWalletAuthSuccessPayload;

          const cookieNonce = cookies().get("siwe_nonce")?.value ?? "";
          if (nonce !== cookieNonce) return null;

          const { isValid } = await verifySiweMessage(parsed, nonce);
          if (!isValid) return null;

          cookies().delete("siwe_nonce");

          return {
            id: parsed.address,
            name: parsed.address,
            address: parsed.address,
          } as any;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
    {
      id: "worldcoin",
      name: "Worldcoin",
      type: "oauth",
      wellKnown: "https://id.worldcoin.org/.well-known/openid-configuration",
      authorization: { params: { scope: "openid" } },
      clientId: process.env.WLD_CLIENT_ID,
      clientSecret: process.env.WLD_CLIENT_SECRET,
      idToken: true,
      checks: ["state", "nonce", "pkce"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.sub,
          verificationLevel:
            profile["https://id.worldcoin.org/v1"].verification_level,
        };
      },
    },
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user = { ...session.user, address: token.sub };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user && (user as any).address) {
        token.sub = (user as any).address;
      }
      return token;
    },
    async signIn({ user }) {
      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
