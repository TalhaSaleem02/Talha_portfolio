import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoMoonSharp } from "react-icons/io5";
import { LuSun, LuSunMoon } from "react-icons/lu";

export default function Header() {
  const router = useRouter();

  // Navigation active state
  const [clicked, setClicked] = useState(false);
  const [activeLink, setActiveLink] = useState('/');

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setClicked(false);
  };

  useEffect(() => {
    setActiveLink(router.pathname);
  }, [router.pathname]);

  // Dark mode toggle
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", true);
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", false);
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const [mobile, setMobile] = useState(false);

  const handleMobileOpen = () => setMobile(true);
  const handleMobileClose = () => setMobile(false);

  return (
    <header>
      <nav className="container flex flex-sb">
        <div className="logo flex gap-2">
          <Link href="/">
            <img src="/img/logo1.png" alt="logo" />
          </Link>
          <h2>sayyed_talha@outlook.com</h2>
        </div>

        <div className="navlist flex gap-1">
          <ul className="flex gap-1">
          <li>
                          <Link href="/" onClick={() => handleLinkClick('/')} className={activeLink === '/' ? 'active' : ''}>Home</Link>
                      </li>
                     
                      <li>
                          <Link href="/gallery" onClick={() => handleLinkClick('/')} className={activeLink === '/gallery' ? 'active' : ''}>Classroom</Link>
                      </li>
                      <li>
                          <Link href="/services" onClick={() => handleLinkClick('/')} className={activeLink === '/services' ? 'active' : ''}>Services</Link>
                      </li>
                      <li>
                          <Link href="/projects" onClick={() => handleLinkClick('/')} className={activeLink === '/projects' ? 'active' : ''}>Projects</Link>
                      </li>
                      <li>
                          <Link href="/blogs" onClick={() => handleLinkClick('/')} className={activeLink === '/blogs' ? 'active' : ''}>Blogs</Link>
                      </li>
                      <li>
                          <Link href="/shop" onClick={() => handleLinkClick('/')} className={activeLink === '/shop' ? 'active' : ''}>Certificates</Link>
                      </li>
                      <li>
                          <Link href="/contact" onClick={() => handleLinkClick('/')} className={activeLink === '/contact' ? 'active' : ''}>Contact</Link>
                      </li>
                      <li>
                          <Link href="/youtube" onClick={() => handleLinkClick('/')} className={activeLink === '/youtube' ? 'active' : ''}>Youtube</Link>
                      </li>
          </ul>

          <div className="darkmodetoggle" onClick={toggleDarkMode}>
            {darkMode ? <IoMoonSharp /> : <LuSun />}
          </div>

          <button>
          <Link href="/contact" onClick={() => handleLinkClick('/')} className={activeLink === '/contact' ? 'active' : ''}>Consultation</Link>
          </button>

          <div className="mobiletogglesvg" onClick={handleMobileOpen}>
            <HiMiniBars3BottomRight />
          </div>
        </div>

        <div className={mobile ? "mobilenavlist active" : "mobilenavlist"}>
          <span onClick={handleMobileClose} className={mobile ? "mobile active" : ""}></span>
          <div className="mobilelogo">
            <img src="/img/logo1.png" alt="logo" />
            <h2>Talha Saleem</h2>
          </div>

          <ul>
                      <li>
                          <Link href="/" onClick={() => handleLinkClick('/')} className={activeLink === '/' ? 'active' : ''}>Home</Link>
                      </li>
                      
                      <li>
                          <Link href="/gallery" onClick={() => handleLinkClick('/')} className={activeLink === '/gallery' ? 'active' : ''}>Classroom</Link>
                      </li>
                      <li>
                          <Link href="/services" onClick={() => handleLinkClick('/')} className={activeLink === '/services' ? 'active' : ''}>Services</Link>
                      </li>
                      <li>
                          <Link href="/projects" onClick={() => handleLinkClick('/')} className={activeLink === '/projects' ? 'active' : ''}>Projects</Link>
                      </li>
                      <li>
                          <Link href="/blogs" onClick={() => handleLinkClick('/')} className={activeLink === '/blogs' ? 'active' : ''}>Blogs</Link>
                      </li>
                      <li>
                          <Link href="/shop" onClick={() => handleLinkClick('/')} className={activeLink === '/shop' ? 'active' : ''}>Certificates</Link>
                      </li>
                      <li>
                          <Link href="/contact" onClick={() => handleLinkClick('/')} className={activeLink === '/contact' ? 'active' : ''}>Contact</Link>
                      </li>
                      <li>
                          <Link href="/youtube" onClick={() => handleLinkClick('/')} className={activeLink === '/youtube' ? 'active' : ''}>Youtube</Link>
                      </li>
                  </ul>
                  <p>© 2023 Talha. All rights reserved.</p>



        </div>
      </nav>
    </header>
  );
}
