import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS
import gsap from "gsap";

export default function App({ Component, pageProps }) {


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };

    // Simulate a loading delay 
    const timeoutId = setTimeout(handleComplete, 2000);

    return () => {
      clearTimeout(timeoutId);
    };


  }, []);

  useEffect(() => {
    AOS.init({
      // Global settings
      disable: false,
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
  
      // Element-specific settings
      offset: 100,
      delay: 0,
      duration: 900,
      easing: 'ease',
      once: false,
      mirror: false,
      anchorPlacement: 'top-bottom',
    });
  
    // Refresh AOS to make sure it catches dynamically loaded content
    AOS.refresh();
  }, []);

    return (
      <>
      <Preloader isLoading={isLoading} ></Preloader>
      <Header />
      {/* {!isLoading && ( */}
        <main id="site-wrapper">
          <Component {...pageProps} />
        </main>
      
      <Footer />
    </>
    );
  }