import YouTubeLogo from "~icons/simple-icons/youtube";
import BlueskyLogo from "~icons/simple-icons/bluesky";
import MastodonLogo from "~icons/simple-icons/mastodon";
import GitHubLogo from "~icons/simple-icons/github";
import styles from "./social.module.css";

const socialIcons = {
  youtube: YouTubeLogo,
  bluesky: BlueskyLogo,
  mastodon: MastodonLogo,
  github: GitHubLogo,
};

const SocialButton = ({ href, icon, content, slim }) => {
  const Icon = socialIcons[icon];
  return (
    <a rel="me" href={href} className={styles.socialLink}>
      <div className={styles.socialIconWrap}>
        <Icon height="35" width="35" />
        {slim ? null : <span className={styles.socialLabel}>{content}</span>}
      </div>
    </a>
  );
};

const socials = [
  {
    name: "youtube",
    href: "https://www.youtube.com/jacobbolda",
    content: "jacobbolda",
  },
  {
    name: "bluesky",
    href: "https://bsky.app/profile/jacobbolda.com",
    content: "jacobbolda",
  },
  {
    name: "github",
    href: "https://www.github.com/jbolda",
    content: "jbolda",
  },
  {
    name: "mastodon",
    href: "https://hachyderm.io/@jacobbolda",
    content: "jacobbolda",
  },
];

export const Social = (props) => (
  <section
    className={[styles.section, props.className].filter(Boolean).join(" ")}
  >
    <div className={styles.sectionInner}>
      <div className={styles.socialGrid}>
        {socials.map((link) => (
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

export const SocialSlim = (props) => (
  <section
    className={[styles.section, props.className].filter(Boolean).join(" ")}
  >
    <div className={styles.sectionInner}>
      <div className={styles.socialGrid}>
        {socials.map((link) => (
          <SocialButton
            key={link.name}
            icon={link.name}
            href={link.href}
            content={link.content}
            slim={true}
          />
        ))}
      </div>
    </div>
  </section>
);
