"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";

export const SignIn = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session?.user?.name?.slice(0, 10)} <br />
        <Button onClick={() => signOut()} variant="primary" size="lg">Sign out</Button>
      </>
    );
  } else {
    return (
      <>
        Not signed in <br />
        <Button onClick={() => signIn()} variant="primary" size="lg">Sign in</Button>
      </>
    );
  }
};
