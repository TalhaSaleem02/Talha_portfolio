import Link from 'next/link';
import { IoHome } from 'react-icons/io5';
import { BsPostcard } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GoProject } from "react-icons/go";
import { FaShoppingBasket } from "react-icons/fa";
import { RiGalleryLine } from "react-icons/ri";
import { IoIosContact } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { useSession, signOut } from "next-auth/react";

export default function Aside({ asideOpen, handleAsideOpen }) {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState('/');

  const handleActiveLink = (link) => {
    setActiveLink((prevActive) => (prevActive === link ? null : link)); // Toggle active link
  };

  useEffect(() => {
    setActiveLink(router.pathname); // Update active link when route changes
  }, [router.pathname]);

  const { data: session } = useSession();

  if (session) {
    return (
      <aside className={asideOpen ? "asideleft active" : "asideleft"}>
        <ul>
          {/* Dashboard Link */}
          <Link href="/">
            <li className={activeLink === '/' ? 'navactive' : ''}>
              <IoHome />
              <span> Dashboard </span>
            </li>
          </Link>

          {/* Blogs Link with Submenu blogs*/}
          <li
            className={`flex-col flex-left ${activeLink === '/blogs' ? 'navactive' : ''}`}
            onClick={() => handleActiveLink('/blogs')} // Toggle submenu
          >
            <div className="flex gap-1">
              <BsPostcard />
              <span>Blogs</span>
            </div>

            {/* Submenu */}
            {activeLink === '/blogs' && (
              <ul className="subnav">
                <Link href="/blogs">
                  <li>
                    All Blogs
                  </li>
                </Link>
                <Link href="/blogs/draft">
                  <li>
                    Draft Blogs
                  </li>
                </Link>
                <Link href="/blogs/addblog">
                  <li>
                    Add Blogs
                  </li>
                </Link>
              </ul>
            )}
          </li>

          {/*Submenu Projects*/}
          <li
            className={`flex-col flex-left ${activeLink === '/projects' ? 'navactive' : ''}`}
            onClick={() => handleActiveLink('/projects')} // Toggle submenu
          >
            <div className="flex gap-1">
              <GoProject />
              <span>projects</span>
            </div>

            {/* Submenu */}
            {activeLink === '/projects' && (
              <ul className="subnav">
                <Link href="/projects">
                  <li onClick={() => setActiveLink('/')}>
                    All Projects
                  </li>
                </Link>
                <Link href="/projects/draftprojects">
                  <li onClick={() => setActiveLink('/')}>
                    Draft Projects
                  </li>
                </Link>
                <Link href="/projects/addproject">
                  <li onClick={() => setActiveLink('/')}>
                    Add Projects
                  </li>
                </Link>
              </ul>
            )}
          </li>
          {/* Shops*/}
          <li
            className={`flex-col flex-left ${activeLink === '/shops' ? 'navactive' : ''}`}
            onClick={() => handleActiveLink('/shops')} // Toggle submenu
          >
            <div className="flex gap-1">
              <FaShoppingBasket />
              <span>Certifications</span>
            </div>

            {/* Submenu */}
            {activeLink === '/shops' && (
              <ul className="subnav">
                <Link href="/shops">
                  <li onClick={() => setActiveLink('/')}>
                    All Certifications
                  </li>
                </Link>
                <Link href="/shops/draftshop">
                  <li onClick={() => setActiveLink('/')}>
                    Draft Certifications
                  </li>
                </Link>
                <Link href="/shops/addproduct">
                  <li onClick={() => setActiveLink('/')}>
                    Add Certifications
                  </li>
                </Link>
              </ul>
            )}
          </li>
          {/* Courses*/}
          <li
            className={`flex-col flex-left ${activeLink === '/courses' ? 'navactive' : ''}`}
            onClick={() => handleActiveLink('/courses')} // Toggle submenu
          >
            <div className="flex gap-1">
              <RiGalleryLine />
              <span>Courses</span>
            </div>

            {/* Submenu */}
            {activeLink === '/courses' && (
              <ul className="subnav">
                <Link href="/courses">
                  <li onClick={() => setActiveLink('/')}>
                    All Courses
                  </li>
                </Link>
                <Link href="/courses/draftcourses">
                  <li onClick={() => setActiveLink('/')}>
                    Draft Courses
                  </li>
                </Link>
                <Link href="/courses/addcourses">
                  <li onClick={() => setActiveLink('/')}>
                    Add Courses
                  </li>
                </Link>
              </ul>
            )}
          </li>
          {/* Contact */}
          <Link href="/contacts">
            <li className={activeLink === '/contacts' ? 'navactive' : ''} onClick={() => handleActiveLink('/contacts')} >
              <IoIosContact />
              <span> Contacts </span>
            </li>
          </Link>

          {/* Settings */}
          <Link href="/setting">
            <li className={activeLink === '/setting' ? 'navactive' : ''} onClick={() => handleActiveLink('/setting')} >
              <IoMdSettings />
              <span> Setting </span>
            </li>
          </Link>
        </ul>

        <button onClick={() => signOut()} className='logoutbtn'>Logout</button>
      </aside>
    );
  }

  return null;
}