import { useState, useEffect } from "react";
import { SocialSlim } from "./social.jsx";
import Link from "./link.jsx";

export default () => (
  <footer className="flex-initial">
    <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
      <nav
        className="-mx-5 -my-2 flex flex-wrap justify-center"
        aria-label="Footer"
      >
        <div className="px-5 py-2">
          <Link
            href="/about"
            className="text-base text-gray-500 hover:text-gray-900"
          >
            About
          </Link>
        </div>

        <div className="px-5 py-2">
          <Link
            href="/uses"
            className="text-base text-gray-500 hover:text-gray-900"
          >
            Uses
          </Link>
        </div>

        <div className="px-5 py-2">
          <Link
            href="/articles"
            className="text-base text-gray-500 hover:text-gray-900"
          >
            Articles
          </Link>
        </div>

        <div className="px-5 py-2">
          <Link
            href="/recipes"
            className="text-base text-gray-500 hover:text-gray-900"
          >
            Recipes
          </Link>
        </div>

        <div className="px-5 py-2">
          <Toggle />
        </div>
      </nav>
      <SocialSlim className="text-gray-400" />
      <p className="mt-8 text-center text-base text-gray-400">
        &copy; Jacob Bolda. All rights reserved.
      </p>
    </div>
  </footer>
);

const Toggle = (props) => {
  const [colorMode, toggleColorMode] = useState("light");

  useEffect(() => {
    document.documentElement.classList.contains("dark")
      ? toggleColorMode("dark")
      : toggleColorMode("light");
  }, []);

  const toggleAction = () => {
    if (!document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
      toggleColorMode("dark");
    } else {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem("theme", "light");
      toggleColorMode("light");
    }
  };

  return (
    <button
      type="button"
      aria-pressed="false"
      className={
        `relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer ` +
        `transition-colors ease-in-out duration-200 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
          colorMode === "light" ? "bg-gray-200" : "bg-indigo-600"
        }`
      }
      onClick={() => toggleAction()}
    >
      <span className="sr-only">toggle dark mode</span>
      <span
        className={`${
          colorMode === "light" ? "translate-x-0" : "translate-x-5"
        } relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
      >
        <span
          className={`${
            colorMode === "light"
              ? "opacity-100 ease-in duration-200"
              : "opacity-0 ease-out duration-100"
          } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <span
          className={`${
            colorMode === "light"
              ? "opacity-0 ease-out duration-100"
              : "opacity-100 ease-in duration-200"
          } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{2}"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </span>
      </span>
    </button>
  );
};
