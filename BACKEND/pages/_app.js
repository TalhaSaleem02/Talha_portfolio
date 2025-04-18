import ParentComponent from "@/components/ParentComponent";
import "@/styles/globals.css";
import Loading from "@/components/Loading"; // Ensure Loading component is imported
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import LoginLayout from "@/components/LoginLayout";

export default function App({ Component,pageProps: { session, ...pageProps }}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    // Check if the route is already complete when the component mounts
    if (router.isReady) {
      setLoading(false);
    }

    // Subscribe to Next.js route change events
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    // Cleanup function to remove event listeners
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.isReady]);

  const [asideOpen, setAsideOpen] = useState(false);

  const AsideClickOpen = () => {
    setAsideOpen(!asideOpen);
  };

  return (
     <SessionProvider session={session}>
    <>
      {loading ? (
        // Loading while data is being fetched
        <div className="flex flex-col flex-center wh_100">
          <Loading />
          <h1 className="mt-1">Loading...</h1>
        </div>
      ) : (
        <>
          <ParentComponent appOpen={asideOpen} appAsideOpen={AsideClickOpen} />
          <main>
            <div className={asideOpen ? "container" : "container active"}>
              <Component {...pageProps} />
            </div>
          </main>
        </>
      )}
    </>
    </SessionProvider>
  );
  
}