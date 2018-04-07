import React from "react"
import Link from "gatsby-link"
import Img from 'gatsby-image'
import SimpleNav from "../../gatsby-theme-bulma-layout/Simple/SimpleNav"

class InsetLayout extends React.Component {
  render() {
    const {siteMetadata} = this.props.data.site

    return (
      <SimpleNav sitemetadata={siteMetadata} location={this.props.location}>
        <section className="hero is-large is-secondary is-bold">
          <div className="hero-body">
            <div className="container">
              <h3 className="subtitle">
                Hi, I am
              </h3>
              <h1 className="title">
                <Link to={`/`}>
                  Jacob Bolda
                </Link>
              </h1>
              <h2 className="subtitle">
                Structural Engineer
              </h2>
            </div>
          </div>
        </section>
        <section className="hero is-thirdary is-medium">
          <div className="hero-body">
            <div className="columns">
              <div className="column is-one-third">
                <Img className="image box" Tag="figure" sizes={this.props.data.file.childImageSharp.sizes} />
              </div>
              <div className="column">
                <div className="content">
                  <h3>Nostaglia Feels Good</h3>
                  <p>
                    I spent my formative years in small town Minnesota before moving to small town Wisconsin. I made my way through high school doing well but never feeling satisfactorily engaged. I want a challenge! I made the leap to college at Milwaukee School of Engineer (MSOE) in ***big city*** Milwaukee, Wisconsin earning my Master's in Structural Engineer, Bachelor's in Architectural Engineering and a minor in management. From there I began to exponentially expand my horizons through learning and travel, both domestic and abroad.
                  </p>
                  <h3>Stepping Up The Stairs</h3>
                  <p>
                    I was never directly introduced to Entrepreneurship as a life pursuit. The climb began when I read *Rich Dad, Poor Dad*. My neighbor handed me the book, and I never would have guessed the influence on my life path. This little ember started in my high school days. I was hooked. My viewpoint was pretty strictly traditional finance though. The "you can't make money without money" mentality. I spent loads of time learning and understanding what I would need to do after I have money.
                  </p>
                  <h3>Noteables</h3>
                  <p>
                    <a src="http://stackoverflow.com/questions/14614923/excel-formula-identifying-number-of-date-ranges-within-a-range/14616697#14616697">The Occasional Excel Wizardry</a>
                  </p>
                  <p>
                    <a src="http://www.impactseven.org/portfolio-items/mitchell-street-market-lofts/">Preliminary Designs for Mitchell Street Market Lofts</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section is-thirdary">
          {this.props.children}
        </section>
      </SimpleNav>
    )
  }
}

export default InsetLayout
