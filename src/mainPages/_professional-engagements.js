import React from "react"
import Link from "gatsby-link"
import EcotectPhoto from '../static/assets/Ecotect Example.png'

const professionalEngagements = props =>
  <div className="tile is-ancestor">
    <div className="tile is-vertical is-8">
      <div className="tile">
        <div className="tile is-parent is-vertical">
          <ChildTile Child={PodcastTile} />
          <ChildTile Child={REUTile} />
        </div>
        <div className="tile is-parent is-vertical">
          <ChildTile Child={MastersThesis} />
          <ChildTile Child={MitchellLofts} />
          <ChildTile Child={ProgrammingKnowledge} />
        </div>
      </div>
    </div>
    <div className="tile is-parent">
      <ChildTile Child={EngineersWithoutBorders} />
    </div>
  </div>

export default professionalEngagements

const ChildTile = ({props, Child}) =>
  <article className="tile is-child notification is-thirdary">
    <Child />
  </article>

const PodcastTile = props =>
  <div>
    <TileTitle
      text="STEM on Fire Guest"
      url="https://stemonfire.com/43-architectural-and-structural-engineer-jacob-bolda/"
      />
    <TileSub text="Guest Representing the AEC Industry" />
    <div className="content">
      <p>
        The podcast hosts practicing professionals, college professors and college students.
        {' '}The focus is providing insights into STEM professions, what is required to get
        {' '}through the curriculum and additional strategies to guide students towards a successful career.
      </p>
      <p>
        I talk about how the AEC Industry is all connected, and how Structural Engineering fits in.
      </p>
    </div>
  </div>

const MitchellLofts = props =>
  <div>
    <TileTitle
      text="Mitchell Street Market Lofts"
      url="http://www.impactseven.org/portfolio-items/mitchell-street-market-lofts/"
      />
    <TileSub text="New Construction Affordable Housing Development" />
    <figure className="image">
      <img src="http://www.impactseven.org/wp-content/uploads/2015/11/WEB-35-320x202.jpg" />
    </figure>
    <div className="content">
      <p>
        Located in the Muskego Way neighborhood and built on what was once a city-owned vacant brownfield lot,
        {' '}Mitchell Street Market Lofts is a new construction affordable housing development. I created the
        {' '}original design of these lofts during Senior Design. We pitched the design to the eventual developers.
        {' '}After a few small tweaks, we passed off the preliminary design to the Architects and it lead to
        {' '}what you can see now.
      </p>
    </div>
  </div>

const MastersThesis = props =>
  <div>
    <TileTitle
      text="Masters in Structural Engineering"
      url="/masters-in-structural-engineering-thesis/"
      />
    <TileSub text="Thesis Circa 2011" />
    <div className="content">
      <p>
        The purpose of this capstone design project report is to discuss the behavior of a hooked bar in concrete carrying a tension force. The cover and bonded length are varied to observe the effect on the load distribution between the hook portion and the bonded length portion of a hooked bar. Each specimen had 1 or 2 inches of cover. Each specimen had a bonded length of 8, 12, or 16 inches. Straight rebar was also tested to provide a control and comparison to the hooked bars with similar cover and bond length variables.
      </p>
    </div>
  </div>

const ProgrammingKnowledge = props =>
  <div>
    <TileTitle
      text="Programming, Code and Excel"
      url="/gatsby-and-contributing-to-open-source/"
      />
    <TileSub text="Since the '90s" />
    <div className="content">
      <p>
        I have been known to sling some code. My experience crosses a unique set of languages, but all with the common goal of solving a specific problem. Programming and code are tools that have great power when wielded effectively. More recently my interest has been in JavaScript, and I had worked on some open source code (linked).
        I am also an expert in Excel and have crafted some <a href="https://stackoverflow.com/questions/14614923/excel-formula-identifying-number-of-date-ranges-within-a-range/14616697#14616697" target="_blank">involved formulas and code under unique constraints</a>.
      </p>
    </div>
  </div>

const EngineersWithoutBorders = props =>
  <div>
    <TileTitle
      text="Engineers Without Borders"
      url="http://www.ewbmsoe.com/?ref=www.jacobbolda.com"
      />
    <TileSub text="MSOE Student Chapter" />
    <figure className="image is-3by2">
      <iframe
        src="https://www.youtube.com/embed/rtTc8N6SGns"
        style={{position: "absolute", top: 0, left: 0, paddingBottom: "10px", width: "100%", height: "100%"}}
        frameBorder="0"
        allowFullScreen></iframe>
    </figure>
    <div className="content">
      <p>
        In March 2010, a team of EWB-MSOE students and professionals completed a vehicular bridge in the rural village of Tres Cruces, Guatemala. Similar to our other bridges in Joyabaj, this one provides reliable year-round access for about 4,000 people in Tres Cruces and the surrounding countryside to reach the central town of Joyabaj for education, commerce, and healthcare. It should also open the doorway to further development of Tres Cruces and the surrounding region.
      </p>
      <p>
        This project required two implementation trips. The professional partners on the first trip, conducted in January 2010, excavated and poured the bridge foundations and abutments. The second trip, composed of students and professional/faculty mentors, then completed the superstructure and retaining walls on the sides of the bridge. In preparation for these implementation trips, the professionals and students worked over the summer and fall of 2009 to produce a technical design for the bridge and a plan for constructing it with the close help of the municipal government of Joyabaj and the community leadership of Tres Cruces. The members of the local community, having an eagerness to invest in this improvement to their lives, willingly provided much of the labor for both implementation trips, along with on-site housing for EWB personnell. 
      </p>
      <p>
        Special thanks to Doug Stahl, Mike Paddock, Max Schmiege, Rob Merkel, Steve Berg, Brian Sides, Heather Cleveland, Scott Solverson, and Carrie Bristol-Groll for their contributions as professional mentors for this project. We would also like to thank (again) our in-country contact, Mike Shawcross, for providing the link between us and the community of Tres Cruces.
      </p>
    </div>
  </div>

const REUTile = props =>
  <div>
    <TileTitle
      text="Rapid Prototyping: A Sustainable Design Aid"
      url="https://www.nsf.gov/awardsearch/showAward?AWD_ID=0648845"
      />
    <TileSub text="3D Printing Research Back in 2009" />
    <figure className="image">
      <img src={EcotectPhoto} />
    </figure>
    <div className="content">
      <p>
        I research the applicability of creating a Revit model, running daylighting
        analyses and exporting the colored model to be 3D printed in color.
      </p>
      <p>
        The purpose of this research is to explore the feasibility of performing energy analyses early in the design stage of building. Currently, energy analyses are not performed on a building until 80%-90% of the design decisions have been finalized. Once this point has been reached, passive solutions are hard to incorporate and designers depend on active measures to correct deficiencies in design. If energy modeling becomes a higher priority in designing a building, passive design solutions might easily be incorporated. Utilizing computer programs simplifies and expedites the energy modeling process. Energy modeling was examined to determine the ease of use and feasibility of using such a device to help designers understand the priorities behind passive design. This research focuses primarily on illumination with respect to solar energy uses. Values obtained from an energy model making use of daylighting and solar energy to help illuminate the room can then be compared to the same room using primarily electric illumination. A visual, as well as a textual, analysis can be performed and used to help educate not only designers but the client. Using rapid prototyping, a striking visual model can be created to help convey the energy efficiencies as well as the architectural highlights of the building.
      </p>
    </div>
  </div>

const TileTitle = ({text, url}) =>
  <p className="title is-4">
    {url ? <TileLink url={url} text={text} /> : text}
  </p>

const TileLink = ({url, text}) => {
  if (url.charAt(0) === `/`) {
    return <Link to={url}>{text}</Link>
  } else {
    return <a href={url} target="_blank">{text}</a>
  }
}
  
const TileSub = ({text}) =>
  <p className="subtitle">
    {text}
  </p>