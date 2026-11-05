import Heading from "~/components/common/heading.jsx";
import Text from "~/components/common/text.jsx";
import Link from "~/components/common/link.jsx";
import styles from "./home-engagements.module.css";
import sectionStyles from "~/styles/home-section.module.css";
import unstyledLinkStyles from "~/styles/unstyled-link.module.css";

const Engagements = ({ children }) => (
  <div className={sectionStyles.section}>
    <div className={sectionStyles.inner}>
      <div className={sectionStyles.header}>
        <Heading as="h2">Professional Engagements</Heading>
        <Text>Or things done in public</Text>
      </div>
      <div className={sectionStyles.grid}>
        {children.map((child, index) => (
          <div key={index} className={styles.sectionCard}>
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
  <Link href="/STEMonFire/" className={unstyledLinkStyles.link}>
    <Heading as="h3">STEM on Fire Guest</Heading>
    <Text>
      A guest on the podcast representing the AEC industry. The podcast hosts
      practicing professionals, college professors and college students.
    </Text>
  </Link>
);

const AECC = () => (
  <Link href="/aeccollective/" className={unstyledLinkStyles.link}>
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
  <Link href="/masters-thesis/" className={unstyledLinkStyles.link}>
    <Heading as="h3">Master's Degree Thesis</Heading>
    <Text>
      My degree is in Structural Buildings, and my thesis dealt with concrete.
    </Text>
  </Link>
);

const Programming = () => (
  <Link href="/programming/" className={unstyledLinkStyles.link}>
    <Heading as="h3">Programming</Heading>
    <Text>
      My background is in building engineering, but I stepped into programming
      since high school.
    </Text>
  </Link>
);

const EWB = () => (
  <Link href="/engineers-without-borders/" className={unstyledLinkStyles.link}>
    <Heading as="h3">Engineers Without Borders (EWB)</Heading>
    <Text>
      A lovely experience with this org building bridges in the Joyabaj region
      of Guatemala.
    </Text>
  </Link>
);

const MitchellLofts = () => (
  <Link href="/mitchell-street-market-lofts/" className={unstyledLinkStyles.link}>
    <Heading as="h3">Mitchell Street Market Lofts</Heading>
    <Text>
      This is affordable housing development that was built from my initial
      designs.
    </Text>
  </Link>
);

const REU = () => (
  <Link href="/reu-program/" className={unstyledLinkStyles.link}>
    <Heading as="h3">Research Experience for Undergraduates</Heading>
    <Text>
      A research program where I explored the feasibility of performing energy
      analyses with building model programs and 3D printing.
    </Text>
  </Link>
);
