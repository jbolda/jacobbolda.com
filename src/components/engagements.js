import { h } from "preact";
import Heading from "./heading.js";
import Text from "./text.js";
import Link from "./link.js";

const Engagements = ({ children }) => (
  <div className="relative pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
    <div className="relative max-w-7xl mx-auto">
      <div className="text-center">
        <Heading as="h2">Professional Engagements</Heading>
        <Text>Or things done in public</Text>
      </div>
      <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
        {children.map((child) => (
          <div className="p-4 flex flex-col">{child}</div>
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
  <Link href="/STEMonFire/" flair="none">
    <Heading as="h3">STEM on Fire Guest</Heading>
    <Text>
      A guest on the podcast representing the AEC industry. The podcast hosts
      practicing professionals, college professors and college students.
    </Text>
  </Link>
);

const AECC = () => (
  <Link href="/aeccollective/" flair="none">
    <Heading as="h3">AEC Collective</Heading>
    <Text>
      I run a discord based community which is a community for the Architecture,
      Engineering, and Construction. We look to help mentor those just starting
      in the industry, and provide a great place for networking with your peers
      around the world.
    </Text>
  </Link>
);

const Masters = () => (
  <Link href="/masters-thesis/" flair="none">
    <Heading as="h3">Master's Degree Thesis</Heading>
    <Text>
      My degree is in Structural Buildings, and my thesis dealt with concrete.
    </Text>
  </Link>
);

const Programming = () => (
  <Link href="/programming/" flair="none">
    <Heading as="h3">Programming</Heading>
    <Text>
      My background is in building engineering, but I stepped into programming
      since high school.
    </Text>
  </Link>
);

const EWB = () => (
  <Link href="/engineers-without-borders/" flair="none">
    <Heading as="h3">Engineers Without Borders (EWB)</Heading>
    <Text>
      A lovely experience with this org building bridges in the Joyabaj region
      of Guatemala.
    </Text>
  </Link>
);

const MitchellLofts = () => (
  <Link href="/mitchell-street-market-lofts/" flair="none">
    <Heading as="h3">Mitchell Street Market Lofts</Heading>
    <Text>
      This is affordable housing development that was built from my initial
      designs.
    </Text>
  </Link>
);

const REU = () => (
  <Link href="/reu-program/" flair="none">
    <Heading as="h3">Research Experience for Undergraduates</Heading>
    <Text>
      A research program where I explored the feasibility of performing energy
      analyses with building model programs and 3D printing.
    </Text>
  </Link>
);
