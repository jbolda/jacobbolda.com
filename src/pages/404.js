import { h, Fragment } from "preact";
import Heading from "../components/heading.js";
import Text from "../components/text.js";
import { Social } from "../components/social.js";

export default (props) => {
  return (
    <>
      <div class="relative mx-auto max-w-7xl">
        <div class="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main class="mt-10 max-w-7xl px-4 sm:mt-12 sm:px-3 md:mt-16 lg:mt-20 lg:px-10 xl:mt-28 justify-items-center">
            <div class="sm:text-center lg:text-left">
              <Heading as="h1">Oh no, this page doesn't exist</Heading>

              <Text>
                I would be extremely appreciative if you let me know about this
                missing page. Hit up my socials.
              </Text>
            </div>
          </main>
        </div>
      </div>
      <Social />
    </>
  );
};
