import React from "react";
import PropTypes from "prop-types";
import Envelope from "../static/assets/envelope-o.svg";
import Twitter from "../static/assets/twitter.svg";
import LinkedIn from "../static/assets/linkedin-square.svg";
import Github from "../static/assets/github.svg";
import Keybase from "../static/assets/key.svg";
import Angellist from "../static/assets/angellist.svg";
import Camera from "../static/assets/camera.svg";

class SiteLinks extends React.Component {
  render() {
    const { siteMetadata } = this.props.data.site;

    return (
      <aside className="menu">
        <p className="menu-label">Contact Me</p>
        <ul className="menu-list">
          <li>
            <a href={`mailto:` + siteMetadata.siteEmailUrl}>
              <Icon icon={Envelope} alt="email" />{" "}
              {siteMetadata.siteEmailPretty}
            </a>
          </li>
          <li>
            <a href={siteMetadata.siteTwitterUrl}>
              <Icon icon={Twitter} alt="twitter" />{" "}
              {siteMetadata.siteTwitterPretty}
            </a>
          </li>
          <li>
            <a href={siteMetadata.siteLinkedInUrl}>
              <Icon icon={LinkedIn} alt="linkedin" />{" "}
              {siteMetadata.siteLinkedInPretty}
            </a>
          </li>
          <li>
            <a href={siteMetadata.siteGithubUrl}>
              <Icon icon={Github} alt="github" />{" "}
              {siteMetadata.siteGithubPretty}
            </a>
          </li>
          <li>
            <a href={siteMetadata.siteKeybaseUrl}>
              <Icon icon={Keybase} alt="keybase" />{" "}
              {siteMetadata.siteKeybasePretty}
            </a>
          </li>
          <li>
            <a href={siteMetadata.siteAngelListUrl}>
              <Icon icon={Angellist} alt="angellist" />{" "}
              {siteMetadata.siteAngelListPretty}
            </a>
          </li>
          <li>
            <a href={siteMetadata.sitePhotoUrl}>
              <Icon icon={Camera} alt="camera" /> {siteMetadata.sitePhotoPretty}
            </a>
          </li>
        </ul>
      </aside>
    );
  }
}

export default SiteLinks;

const Icon = ({ icon, alt }) => (
  <span className="icon is-small" style={{ marginBottom: `-8px` }}>
    <img src={icon} alt={alt} />
  </span>
);
