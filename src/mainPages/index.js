import React from "react";
import { Link, graphql } from "gatsby";
import sortBy from "lodash/sortBy";
import HeroLayoutBridge from "../utils/HeroLayoutBridge";
import ProfessionalEngagements from "./_professional-engagements";
import Img from "gatsby-image";

export const frontmatter = { path: "/" };

class SiteIndex extends React.Component {
  findPhoto(slug) {
    let retPhoto;
    this.props.data.allHero.edges.forEach(edge => {
      if (slug === `/${edge.node.relativeDirectory}/`) {
        retPhoto = (
          <Img
            className="image"
            Tag="figure"
            fluid={edge.node.childImageSharp.fluid}
          />
        );
      }
    });
    if (!retPhoto) {
      this.props.data.allScreenshots.edges.forEach(edge => {
        if (slug === edge.node.slug) {
          retPhoto = (
            <Img
              className="image"
              Tag="figure"
              fluid={
                edge.node.childScreenshot.screenshotFile.childImageSharp.fluid
              }
            />
          );
        }
      });
    }
    return retPhoto;
  }

  render() {
    const { siteMetadata } = this.props.data.site;
    const pageLinks = [];
    let iteratorKey = 0;
    let pageRaw = [
      ...this.props.data.allMarkdownRemark.edges,
      ...this.props.data.allJavascriptFrontmatter.edges
    ];
    let pageArray = [];

    pageRaw.forEach(page => {
      if (typeof page.node.frontmatter === `object`) {
        if (typeof page.node.frontmatter.written != `undefined`) {
          pageArray.push({ ...page.node.frontmatter, ...page.node.fields });
        }
      } else if (typeof page.node.data === `object`) {
        if (
          typeof page.node.data.written != `undefined` &&
          page.node.data.written != ``
        ) {
          pageArray.push({ ...page.node.data, ...page.node.fields });
        }
      } else {
        let restrNode = { ...page.node, ...page.node.description };
        pageArray.push(restrNode);
      }
    });

    const sortedPages = sortBy(
      pageArray,
      page => page.updated || page.written
    ).reverse();
    sortedPages.forEach(page => {
      let frontmatter = page;

      if (frontmatter.layoutType == `post`) {
        iteratorKey += 1;
        pageLinks.push(
          <div className="column is-one-third" key={iteratorKey}>
            <div className="card">
              <div className="card-image">{this.findPhoto(page.slug)}</div>
              <div className="card-content">
                <div className="heading">
                  <div className="level">
                    <h4 className="level-left">
                      <time
                        className="subtitle is-6"
                        dateTime={
                          frontmatter.updatedPretty || frontmatter.writtenPretty
                        }
                      >
                        {frontmatter.updatedPretty || frontmatter.writtenPretty}
                      </time>
                    </h4>
                    <h5 className="tag is-thirdary is-6 level-right">
                      {frontmatter.category}
                    </h5>
                  </div>
                  <h1 className="title">
                    <Link to={frontmatter.path}>{frontmatter.title}</Link>
                  </h1>
                </div>
                <div className="content">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: frontmatter.description
                    }}
                  />
                </div>
                <nav className="level">
                  <div className="level-left">
                    <span className="level-item">
                      <Link to={frontmatter.path}>Read</Link>
                    </span>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        );
      }
    });

    return (
      <HeroLayoutBridge {...this.props}>
        <section className="section is-fourthary edge--top">
          <h1 className="title">Professional Engagements</h1>
          <h2 className="subtitle">In View of the Public</h2>
          <hr />
          <div className="columns is-multiline">
            <ProfessionalEngagements />
          </div>
        </section>
        <section className="section is-fifthary edge--top--reverse">
          <h1 className="title">Articles</h1>
          <h2 className="subtitle">Sometimes I write, the most recent</h2>
          <hr />
          <div className="columns is-multiline">{pageLinks}</div>
        </section>
        <section className="section is-fourthary edge--top">
          <h1 className="title">
            <Link to="/recipes/">Recipes</Link>
          </h1>
          <h2 className="subtitle">
            We enjoy cooking. These are a few of our favorites eaten recently.
          </h2>
          <hr />
          <div className="columns is-multiline">
            {recipeList(this.props.data.allAirtable.edges)}
          </div>
        </section>
      </HeroLayoutBridge>
    );
  }
}

export default SiteIndex;

const recipeList = recipes =>
  recipes.map(recipe => (
    <div className="column is-one-third" key={recipe.node.id}>
      <div className="card">
        {recipe.node.data.Attachments &&
        recipe.node.data.Attachments.localFiles != 0 ? (
          <div className="card-image">
            <figure className="image">
              <Img
                fluid={
                  recipe.node.data.Attachments.localFiles[0].childImageSharp
                    .fluid
                }
              />
            </figure>
          </div>
        ) : (
          <div className="card-image">
            <figure className="image is-5by4">
              <img src={this.props.data.placeholder.publicURL} />
            </figure>
          </div>
        )}
        <div className="card-content">
          <Link to={recipe.node.fields.slug}>
            <h2 className="title has-text-centered">{recipe.node.data.Name}</h2>
          </Link>
          <div className="level is-mobile">
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Rating</p>
                <p className="">
                  {checkBlank(recipe.node.data.Rating)}
                  {`\u2606`}
                  /10
                </p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Last Made</p>
                <p className="">{checkBlank(recipe.node.data.Last_Made)}</p>
              </div>
            </div>
          </div>
          <div className="level">
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Prep Time</p>
                <p className="">{`Prep: ${checkBlankTime(
                  recipe.node.data.Preparation_Time
                )}`}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Cook Time</p>
                <p className="">{`Cooking: ${checkBlankTime(
                  recipe.node.data.Cooking_Time
                )}`}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Total Time</p>
                <p className="">{`Total: ${checkBlankTime(
                  recipe.node.data.Total_Time
                )}`}</p>
              </div>
            </div>
          </div>
        </div>
        {recipe.node.data.URL ? (
          <footer className="card-footer">
            <a
              href={recipe.node.data.URL}
              className="card-footer-item"
              target="_blank"
            >
              Recipe Link
            </a>
          </footer>
        ) : null}
      </div>
    </div>
  ));

export const pageQuery = graphql`
  query allPosts {
    allJavascriptFrontmatter(
      filter: { frontmatter: { layoutType: { eq: "post" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            path
            title
            written
            writtenPretty: written(formatString: "MMMM D, YYYY")
            updated
            updatePretty: updated(formatString: "MMMM D, YYYY")
            layoutType
            category
            description
          }
        }
      }
    }
    allMarkdownRemark(filter: { frontmatter: { layoutType: { eq: "post" } } }) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            path
            layoutType
            written
            writtenPretty: written(formatString: "MMMM D, YYYY")
            updated
            updatePretty: updated(formatString: "MMMM D, YYYY")
            category
            description
          }
          timeToRead
        }
      }
    }
    allAirtable(
      filter: { table: { eq: "Recipes" }, data: { Last_Made: { ne: null } } }
      sort: { fields: [data___Last_Made], order: DESC }
      limit: 3
    ) {
      edges {
        node {
          id
          data {
            Name
            Directions
            URL
            Cooking_Time
            Preparation_Time
            Total_Time
            Last_Made
            Rating
            Ingredients
            Attachments {
              localFiles {
                childImageSharp {
                  fluid(
                    maxWidth: 600
                    maxHeight: 480
                    quality: 100
                    cropFocus: ENTROPY
                  ) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
    site {
      siteMetadata {
        siteTitle
        siteDescription
        siteAuthor
        siteEmailUrl
        siteEmailPretty
        siteTwitterUrl
        siteTwitterPretty
        siteLinkedInUrl
        siteLinkedInPretty
        siteGithubUrl
        siteGithubPretty
        siteKeybaseUrl
        siteKeybasePretty
        siteAngelListUrl
        siteAngelListPretty
        sitePhotoUrl
        sitePhotoPretty
      }
    }
    file(relativePath: { eq: "profile.png" }) {
      childImageSharp {
        fluid(
          maxWidth: 500
          maxHeight: 500
          quality: 90
          duotone: { highlight: "#bdc4bf", shadow: "#192C3B" }
        ) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allHero: allFile(
      filter: { sourceInstanceName: { eq: "articles" }, name: { eq: "hero" } }
    ) {
      edges {
        node {
          relativeDirectory
          childImageSharp {
            fluid(
              maxWidth: 600
              maxHeight: 350
              quality: 100
              cropFocus: ATTENTION
            ) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
    allScreenshots: allSitesYaml {
      edges {
        node {
          slug
          childScreenshot {
            screenshotFile {
              childImageSharp {
                fluid(
                  maxWidth: 600
                  maxHeight: 350
                  quality: 100
                  cropFocus: NORTH
                ) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
    about: file(relativePath: { eq: "_about.md" }) {
      childMarkdownRemark {
        html
      }
    }
    placeholder: file(relativePath: { eq: "placeholder.png" }) {
      publicURL
    }
  }
`;

let checkBlank = value => (value ? value : `--`);
let checkBlankTime = value => (value ? `${value}m` : `--`);
