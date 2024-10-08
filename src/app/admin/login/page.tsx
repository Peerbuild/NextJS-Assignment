import { Button } from "@/components/ui/button";
import BackgroundLayout from "@/components/layouts/BackGround";
import { signIn, auth } from "../../../../auth";
import { redirect } from "next/navigation";

export default async function WelcomePage() {
  const session = await auth();
  if (session?.user) {
    if (session.user.isAdmin) {
      redirect("/admin/header");
    } else {
      redirect("/");
    }
  }

  return (
    <BackgroundLayout>
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="w-full max-w-md p-6 space-y-6  ">
          <h1 className="text-3xl font-bold text-start">Welcome, Sam!</h1>
          <p className="text-start text-muted-foreground">
            Log in to your dashboard to change the contents in your site
          </p>
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <Button
              className="relative w-full bg-[#062826] hover:bg-[#183d3b] text-[#ecf3f3] z-10 font-semibold border-[#183d3b] rounded-lg transition duration-300 ease-in-out flex  gap-2 items-center justify-center"
              type="submit"
              variant="default"
            >
              Login with Google
              <svg
                className="mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
              </svg>
            </Button>
          </form>
        </div>
      </div>
    </BackgroundLayout>
  );
}
