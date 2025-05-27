import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <main className="flex  h-full flex-col items-center justify-center ">
        <div className="space-y-6 text-center">
          <h1 className="text-6xl font-bold text-black drop-shadow-md">Next Auth </h1>
          <p className="text-black text-lg">
            This is a simple authentication tutorial using Next.js and NextAuth.js.
          </p>
          <div>
            <LoginButton >
              <Button variant={"outline"} color="dark">
                Sign In
              </Button>
            </LoginButton>
          </div>
        </div>
      </main>
    </>
  );
}
