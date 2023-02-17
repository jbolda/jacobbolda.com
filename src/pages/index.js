import { h, Fragment } from "preact";
import { useEffect } from "preact/hooks";
import { SocialButton } from "./../components/social-button/index.js";
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
      <Social />
      <Articles textHeading="Curated" textSubheading="For the best consumption">
        {props.articlesCurated.map((article) => (
          <ArticleWrap article={article} />
        ))}
      </Articles>
      <Articles textHeading="Recent" textSubheading="These are top of mind">
        {props.articlesRecent.map((article) => (
          <ArticleWrap article={article} />
        ))}
      </Articles>
      <Engagements />
    </>
  );
};

const Hero = (props) => (
  <div class="relative mx-auto max-w-7xl">
    <div class="lg:float-right md:absolute md:inset-y-0 md:right-0 md:w-1/2">
      <Img
        class="mx-auto rounded-full h-48 lg:rounded-none lg:object-contain lg:h-96 lg:w-full"
        src="/avatar.png"
        avif="./avatar.avif"
        alt="An image of Jacob Bolda trying to look decent."
      />
    </div>
    <div class="md:max-w-7xl">
      <div class="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
        <main class="mt-10 max-w-7xl px-4 sm:mt-12 sm:px-3 md:mt-16 lg:mt-20 lg:px-10 xl:mt-28">
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

const Social = (props) => (
  <section class="md:max-w-7xl mx-auto">
    <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-4 place-content-center">
        {[
          {
            name: "twitter",
            href: "https://www.twitter.com/jacobbolda",
            content: "jacobbolda",
          },
          {
            name: "youtube",
            href: "https://www.youtube.com/jacobbolda",
            content: "jacobbolda",
          },
          {
            name: "mastodon",
            href: "https://www.hachyderm.io/@jacobbolda",
            content: "jacobbolda",
          },
          {
            name: "github",
            href: "https://www.github.com/jbolda",
            content: "jbolda",
          },
        ].map((link) => (
          <SocialButton
            key={link.name}
            icon={link.name}
            href={link.href}
            content={link.content}
          />
        ))}
      </div>
    </div>
  </section>
);

const Articles = ({ children, textHeading, textSubheading }) => (
  <div className="relative mx-auto max-w-7xl">
    <div className="relative pt-16 pb-20 px-2 sm:px-1 lg:pt-24 lg:pb-28 lg:px-8 divide-y-2 divide-gray-200">
      <div className="px-2 mb-8">
        <Heading as="h2">{textHeading}</Heading>
        <Text>{textSubheading}</Text>
      </div>
      <div className="max-w-lg grid gap-5 lg:grid-cols-3 lg:max-w-none pt-4 rounded-md">
        {children.map((child) => (
          <div className="p-2 flex flex-col">{child}</div>
        ))}
      </div>
    </div>
  </div>
);
