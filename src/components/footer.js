import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import Link from "./link.js";

export default ({ children }) => (
  <footer class="flex-initial">
    <div class="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
      <nav
        class="-mx-5 -my-2 flex flex-wrap justify-center"
        aria-label="Footer"
      >
        <div class="px-5 py-2">
          <Link
            href="/about"
            class="text-base text-gray-500 hover:text-gray-900"
          >
            About
          </Link>
        </div>

        <div class="px-5 py-2">
          <Link
            href="/uses"
            class="text-base text-gray-500 hover:text-gray-900"
          >
            Uses
          </Link>
        </div>

        <div class="px-5 py-2">
          <Link
            href="/articles"
            class="text-base text-gray-500 hover:text-gray-900"
          >
            Articles
          </Link>
        </div>

        <div class="px-5 py-2">
          <Link
            href="/recipes"
            class="text-base text-gray-500 hover:text-gray-900"
          >
            Recipes
          </Link>
        </div>

        <div class="px-5 py-2">
          <Toggle />
        </div>
      </nav>
      <div class="mt-8 flex justify-center space-x-6">
        <Link
          href="https://twitter.com/jacobbolda"
          class="text-gray-400 hover:text-gray-500"
        >
          <span class="sr-only">Twitter</span>
          <svg
            class="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        </Link>

        <Link
          href="https://github.com/jbolda"
          class="text-gray-400 hover:text-gray-500"
        >
          <span class="sr-only">GitHub</span>
          <svg
            class="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clip-rule="evenodd"
            />
          </svg>
        </Link>
      </div>
      <p class="mt-8 text-center text-base text-gray-400">
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
      window.localStorage.setItem("nightwind-mode", "dark");
      toggleColorMode("dark");
    } else {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem("nightwind-mode", "light");
      toggleColorMode("light");
    }
  };

  return (
    <button
      type="button"
      aria-pressed="false"
      class={
        `relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer ` +
        `transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
          colorMode === "light" ? "bg-gray-200" : "bg-indigo-600"
        }`
      }
      onClick={() => toggleAction()}
    >
      <span class="sr-only">toggle dark mode</span>
      <span
        class={`${
          colorMode === "light" ? "translate-x-0" : "translate-x-5"
        } relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
      >
        <span
          class={`${
            colorMode === "light"
              ? "opacity-100 ease-in duration-200"
              : "opacity-0 ease-out duration-100"
          } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3 text-gray-400"
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
          class={`${
            colorMode === "light"
              ? "opacity-0 ease-out duration-100"
              : "opacity-100 ease-in duration-200"
          } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </span>
      </span>
    </button>
  );
};
