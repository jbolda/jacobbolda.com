/* @jsx h */
import { h } from "preact";
import Landing from "./../../an-extra-boop-for-the-homepage/landing.js";
import About from "./../../an-extra-boop-for-the-homepage/about.js";

import STEMonFire from "./../../an-extra-boop-for-the-homepage/ste-mon-fire.js";
import AECC from "./../../an-extra-boop-for-the-homepage/aec-collective.js";
import Masters from "./../../an-extra-boop-for-the-homepage/masters-thesis.js";
import Prog from "./../../an-extra-boop-for-the-homepage/programming.js";
import EWB from "./../../an-extra-boop-for-the-homepage/ewb.js";
import MitchellLofts from "./../../an-extra-boop-for-the-homepage/mitchell-street-market-lofts.js";
import REU from "./../../an-extra-boop-for-the-homepage/reu.js";

import { ArticleWrap } from "./articles.js";

export default (props) => (
  <div>
    <Hero />
    <div class="mx-auto my-auto prose prose">
      <About />
    </div>
    <Engagements>
      <STEMonFire />
      <AECC />
      <Masters />
      <Prog />
      <EWB />
      <MitchellLofts />
      <REU />
    </Engagements>
    <Articles>
      {props.articles.map((article) => (
        <ArticleWrap article={article} />
      ))}
    </Articles>
  </div>
);

const Hero = (props) => (
  <div class="relative bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto">
      <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
        <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div class="prose prose-xl sm:text-center lg:text-left">
            <Landing />
          </div>
        </main>
      </div>
    </div>
    <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <img
        class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
        src="/avatar.png"
        alt
      />
    </div>
  </div>
);

const Engagements = ({ children }) => (
  <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
    <div className="absolute inset-0">
      <div className="bg-white h-1/3 sm:h-2/3" />
    </div>
    <div className="relative max-w-7xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
          Professional Engagements
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Or things done in public
        </p>
      </div>
      <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
        {children.map((child) => (
          <div className="p-2 prose prose flex flex-col rounded-lg shadow-lg overflow-hidden">
            {child}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Articles = ({ children }) => (
  <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
    <div className="absolute inset-0">
      <div className="bg-white h-1/3 sm:h-2/3" />
    </div>
    <div className="relative max-w-7xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
          Articles
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Curated for your reading pleasure
        </p>
      </div>
      <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
        {children.map((child) => (
          <div className="p-2 flex flex-col rounded-lg shadow-lg overflow-hidden">
            {child}
          </div>
        ))}
      </div>
    </div>
  </div>
);
