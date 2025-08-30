import YouTubeLogo from "~icons/simple-icons/youtube";
import BlueskyLogo from "~icons/simple-icons/bluesky";
import MastodonLogo from "~icons/simple-icons/mastodon";
import GitHubLogo from "~icons/simple-icons/github";

const socialIcons = {
  youtube: YouTubeLogo,
  bluesky: BlueskyLogo,
  mastodon: MastodonLogo,
  github: GitHubLogo,
};

const SocialButton = ({ href, icon, content, slim }) => {
  const Icon = socialIcons[icon];
  return (
    <a rel="me" href={href} className="hover:opacity-80 place-items-center">
      <div className="flex place-items-center">
        <div className="px-2 min-w-fit max-w-s min-h-fit">
          <Icon height="35" width="35" />
        </div>
        {slim ? null : (
          <span className="grow text-3xl font-bold tracking-tight">
            {content}
          </span>
        )}
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
  <section className={`md:max-w-7xl mx-auto ${props.className}`}>
    <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap gap-12 place-content-center">
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
  <section className={`md:max-w-7xl mx-auto ${props.className}`}>
    <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap gap-12 place-content-center">
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
