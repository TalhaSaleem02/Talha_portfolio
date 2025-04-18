import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";

export default function LoginLayout({ children }) {
  const { data: session, status } = useSession(); 
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (status === "loading") return; // Do nothing while loading

      if (!session && status === "unauthenticated") {
        try {
          // Prevent multiple redirects and handle errors properly
          if (router.pathname !== "/auth/signin") {
            await router.replace("/auth/signin"); // Ensure `replace` completes before proceeding
          }
        } catch (error) {
          console.error("Redirection error:", error);
        }
      } else {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="flex flex-col flex-center wh_100">
        <Loading />
        <h1 className="mt-1">Loading...</h1>
      </div>
    );
  }

  return <div>{children}</div>;
}