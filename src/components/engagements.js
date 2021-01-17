import { h } from "preact";
import Heading from "./heading.js";
import Text from "./text.js";

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
          <div className="p-4 text-gray-900 flex flex-col rounded-lg shadow-lg overflow-hidden">
            {child}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ({ children }) => (
  <Engagements>
    <STEMonFire />
    <AECC />
    <Masters />
    <Programming />
    <EWB />
    <MitchellLofts />
    <REU />
  </Engagements>
);

const STEMonFire = () => (
  <a href="/STEMonFire/">
    <Heading as="h3">STEM on Fire Guest</Heading>
    <Text>
      A guest on the podcast representing the AEC industry. The podcast hosts
      practicing professionals, college professors and college students.
    </Text>
  </a>
);

const AECC = () => (
  <a href="/aeccollective/">
    <Heading as="h3">AEC Collective</Heading>
    <Text>
      I run a discord based community which is a community for the Architecture,
      Engineering, and Construction. We look to help mentor those just starting
      in the industry, and provide a great place for networking with your peers
      around the world.
    </Text>
  </a>
);

const Masters = () => (
  <a href="/masters-thesis/">
    <Heading as="h3">Master's Degree Thesis</Heading>
    <Text>
      My degree is in Structural Buildings, and my thesis dealt with concrete.
    </Text>
  </a>
);

const Programming = () => (
  <a href="/programming/">
    <Heading as="h3">Programming</Heading>
    <Text>
      My background is in building engineering, but I stepped into programming
      since high school.
    </Text>
  </a>
);

const EWB = () => (
  <a href="/engineers-without-borders/">
    <Heading as="h3">Engineers Without Borders (EWB)</Heading>
    <Text>
      A lovely experience with this org building bridges in the Joyabaj region
      of Guatemala.
    </Text>
  </a>
);

const MitchellLofts = () => (
  <a href="/mitchell-street-market-lofts/">
    <Heading as="h3">Mitchell Street Market Lofts</Heading>
    <Text>
      This is affordable housing development that was built from my initial
      designs.
    </Text>
  </a>
);

const REU = () => (
  <a href="/reu-program/">
    <Heading as="h3">Research Experience for Undergraduates</Heading>
    <Text>
      A research program where I explored the feasibility of performing energy
      analyses with building model programs and 3D printing.
    </Text>
  </a>
);
