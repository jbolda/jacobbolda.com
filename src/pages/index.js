import { h, Fragment } from "preact";
import Landing from "./../../an-extra-boop-for-the-homepage/landing.js";
import Engagements from "./../components/engagements.js";
import Heading from "./../components/heading.js";
import Text from "./../components/text.js";

import { ArticleWrap } from "./articles.js";

export default (props) => (
  <>
    <Hero />
    <Engagements />
    <Articles>
      {props.articles.map((article) => (
        <ArticleWrap article={article} />
      ))}
    </Articles>
  </>
);

const Hero = (props) => (
  <div class="relative overflow-hidden">
    <div class="lg:float-right md:absolute md:inset-y-0 md:right-0 md:w-1/2">
      <img
        class="mx-auto rounded-full h-48 lg:rounded-none lg:object-contain lg:h-96 lg:w-full"
        src="/avatar.png"
        alt
      />
    </div>
    <div class="md:max-w-7xl mx-auto">
      <div class="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
        <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div class="sm:text-center lg:text-left">
            <Landing />
          </div>
        </main>
      </div>
    </div>
  </div>
);

const Articles = ({ children }) => (
  <div className="relative pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
    <div className="relative max-w-7xl mx-auto">
      <div className="text-center">
        <Heading as="h2">Articles</Heading>
        <Text>Curated for your reading pleasure</Text>
      </div>
      <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
        {children.map((child) => (
          <div className="p-2 flex flex-col">{child}</div>
        ))}
      </div>
    </div>
  </div>
);
