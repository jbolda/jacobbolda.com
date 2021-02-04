import { h } from "preact";
import Link from "./link.js";

export default (props) => (
  <div class="relative flex-initial">
    <div class="flex justify-between items-center px-4 py-6">
      <div class="flex justify-start lg:w-0 lg:flex-1">
        <a href="/">
          <span class="sr-only">Jacob Bolda</span>
          <svg
            class="h-8 w-auto sm:h-10 text-primary-900"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </a>
      </div>
      <nav class="space-x-10">
        <Link href="/about">About</Link>
        <Link href="/uses">Uses</Link>
        <Link href="/articles">Articles</Link>
        <Link href="/recipes">Recipes</Link>
      </nav>
    </div>
  </div>
);
