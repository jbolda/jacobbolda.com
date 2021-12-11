import { h, Fragment } from "preact";
import { useEffect } from "preact/hooks";
import Engagements from "./../components/engagements.js";
import Heading from "./../components/heading.js";
import Text from "./../components/text.js";
import Img from "./../components/img.js";

import { ArticleWrap } from "./articles.js";

export default (props) => {
  useEffect(() => {
    console.log("removing old service workers");
    try {
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
          registration.unregister();
        }
      });
    } catch (e) {
      //noop
    }
  }, []);

  return (
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
};

const Hero = (props) => (
  <div class="relative overflow-hidden">
    <div class="lg:float-right md:absolute md:inset-y-0 md:right-0 md:w-1/2">
      <Img
        class="mx-auto rounded-full h-48 lg:rounded-none lg:object-contain lg:h-96 lg:w-full"
        src="/avatar.png"
        avif="./avatar.avif"
        alt="An image of Jacob Bolda trying to look decent."
      />
    </div>
    <div class="md:max-w-7xl mx-auto">
      <div class="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
        <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div class="sm:text-center lg:text-left">
            <Heading as="h3">Hi, I am</Heading>

            <Heading as="h1">Jacob Bolda</Heading>

            <Heading as="h1">Senior Software Engineer</Heading>

            <Text>
              Senior Software Engineer built on the foundation of a classically
              trained Structural Engineer. Masters degree in Structural
              Engineering from the Milwaukee School of Engineering and life long
              tech enthusiast. Expertise in nodejs and windows and avid open
              source-er.
            </Text>
          </div>
        </main>
      </div>
    </div>
  </div>
);

const Articles = ({ children }) => (
  <div className="relative pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
    <div className="relative max-w-7xl mx-auto">
      <div className="">
        <Heading as="h2">Content and Resources</Heading>
        <Text>Curated for best consumption</Text>
      </div>
      <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
        {children.map((child) => (
          <div className="p-2 flex flex-col">{child}</div>
        ))}
      </div>
    </div>
  </div>
);
