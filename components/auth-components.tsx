import { signIn, signOut } from "@/auth";
import { Button } from "../components/ui/button";

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
        window.location.href =
          "https://rushil-ecommerce-store.vercel.app/api/auth/signin?callbackUrl=https%3A%2F%2Frushil-ecommerce-store.vercel.app%2F";
      }}
    >
      <Button {...props}>Sign In</Button>
    </form>
  );
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="w-full"
    >
      <Button className="w-full p-0" {...props}>
        Sign Out
      </Button>
    </form>
  );
}
