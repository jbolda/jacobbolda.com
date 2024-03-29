import { useState } from "react";
import Link from "./link.jsx";

export default (props) => {
  const [hamburgerActive, setHamburgerMenu] = useState(false);
  const toggleHamburgerMenu = () => setHamburgerMenu(!hamburgerActive);

  return (
    <div className="relative flex-initial bg-primary-50 dark:bg-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center px-4 py-6">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Logo />
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <OpenMenu toggle={toggleHamburgerMenu} />
          </div>

          <nav className="hidden md:flex space-x-10">
            <Items />
          </nav>
        </div>
      </div>
      {!hamburgerActive ? null : (
        <div className="z-50 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring ring-primary-300 ring-opacity-5 bg-primary-50 dark:bg-primary-900 divide-y-2 divide-gray-50">
            <div className="pt-3 sm:pt-4 pb-4 px-6 sm:px-8">
              <div className="flex items-center justify-between">
                <Logo />
                <div className="-mr-2">
                  <CloseMenu toggle={toggleHamburgerMenu} />
                </div>
              </div>
              <div className="py-6 px-5 space-y-6">
                <nav className="grid grid-cols-2 gap-y-4 gap-x-8">
                  <Items />
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const OpenMenu = ({ toggle }) => (
  <button
    type="button"
    className="bg-primary-50 dark:bg-primary-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
    onClick={toggle}
  >
    <span className="sr-only">Open menu</span>
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>
);

const CloseMenu = ({ toggle }) => (
  <button
    type="button"
    className="bg-primary-50 dark:bg-primary-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
    onClick={toggle}
  >
    <span className="sr-only">Close menu</span>
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
);

const Logo = () => (
  <a href="/">
    <span className="sr-only">Jacob Bolda</span>
    <svg
      className="h-8 w-auto sm:h-10 text-primary-900 dark:text-primary-50"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="{2}"
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  </a>
);

const Items = () => (
  <>
    <Link href="/about">About</Link>
    <Link href="/uses">Uses</Link>
    <Link href="/articles">Articles</Link>
    <Link href="/recipes">Recipes</Link>
  </>
);
