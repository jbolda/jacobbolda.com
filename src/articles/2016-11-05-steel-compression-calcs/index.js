import React from 'react';
import BlogPostChrome from '../../components/BlogPostChrome';

exports.data = {
    title: 'Steel Compression Calculations',
    written: '2016-11-05',
    layoutType: 'post',
    path: '/steel-compression-calculations/',
    category: 'engineering',
    description: 'Putting together some functions to run the compression calculations from the steel manual.'
}

class calculatorPost extends React.Component {

    componentDidMount() {
        window.c = {...this.props.c};
    }

    render() {
      let {frontmatter} = this.props.data.post;

        return (
            <BlogPostChrome {...this.props.data}>
              <h1 className="title is-1">{ frontmatter.title }</h1>
              <div className='content'>
                <p>
                  These functions are written in javascript and embedded into the window.
                  Press F12 (on windows in chrome) to get into the developer console.
                  Click the console tab, and run c.list() in the console.
                </p>
              </div>
            </BlogPostChrome>
        );
    }
}

export default calculatorPost;




let calculator = {};
calculator.E = 29000;
calculator.G = 11200;


calculator.LRFD = (dead, live) => {
  return 1.2 * dead + 1.6 * live;
}

calculator.ASD = (dead, live) => {
  return dead + live;
}

calculator.loads = (dead, live) => {
  console.log('LRFD', calculator.LRFD(dead,live), '|', 'ASD', calculator.ASD(dead, live));
}

calculator.factorLRFD = (nominal) => {
  return 0.9 * nominal;
}

calculator.factorASD = (nominal) => {
  return nominal / 1.67;
}

calculator.factor = (nominal) => {
  console.log('LRFD', calculator.factorLRFD(nominal), '|', 'ASD', calculator.factorASD(nominal));
}

calculator.lamdaR = (limit, Fy, E) => {
  return limit * Math.sqrt(calculator.E / Fy);
}

calculator.r = (I, A) => {
  return Math.sqrt(I / A);
}

calculator.Fe = (Lc_r) => {
  return Math.pow(Math.PI, 2) * calculator.E / Math.pow(Lc_r, 2);
}

calculator.kc = (h, tw) => {
  return 4 / Math.sqrt(h / tw);
}

calculator.I = (arr) => {
  // where [0] is b, [1] is h, and [2] is distance to origin
  let val = 0;
  for (let i in arr) {
    let b = arr[i][0];
    let h = arr[i][1];
    let distanceOrigin = arr[i][2];
    val += b * Math.pow(h, 3) / 12
    val += b * h * Math.pow(distanceOrigin, 2);
  }
  return val;
}

calculator.ybar = (arr) => {
  let summationA = 0;
  let summationAy = 0;
  for (let i in arr) {
    let A = arr[i][0];
    let distanceOrigin = arr[i][1];
    summationAy += A * distanceOrigin;
    summationA += A;
  }
  return summationAy / summationA;
}

calculator.J = (arr) => {
  let val = 0;
  for (let i in arr) {
    let b = arr[i][0];
    let t = arr[i][1];
    val += (b * Math.pow(t, 3) / 3);
  }
  return val;
}

calculator.FcrE3_2 = (Fe, Fy) => {
  return Math.pow(0.658, Fy / Fe) * Fy;
}

calculator.FcrE3_2alt = (Fy_Fe, Fy) => {
  return Math.pow(0.658, Fy_Fe) * Fy;
}

calculator.FcrE3_3 = (Fe) => {
  return 0.877 * Fe;
}

calculator.Fcr = (Fe, Fy) => {
  if ( Fy / Fe <= 2.25 ) {
    return calculator.FcrE3_2(Fe, Fy);
  } else {
    return calculator.FcrE3_3(Fe);
  }
}

calculator.FeE4_2 = (Cw, Lcz, J, Ix, Iy) => {
  let Fe1 = (Math.pow(Math.PI, 2) * calculator.E * Cw) / Math.pow(Lcz, 2);
  let Fe2 = calculator.G * J;
  let Fe3 = (1 / (Ix + Iy));
  return (Fe1 + Fe2) * Fe3;  
}

calculator.FeE4_3 = (Fey, Fez, H) => {
  let Fe1 = (Fey + Fez) / (2 * H);
  let Fe2 = (4 * Fey * Fez * H) / Math.pow(Fey + Fez, 2);
  return Fe1 * (1 - Math.sqrt(1 - Fe2));
}

calculator.Fez = (Cw, Lcz, J, Ag, ro2) => {
  let Fez1 = Math.pow(Math.PI, 2) * calculator.E * Cw / Math.pow(Lcz, 2);
  let Fez2 = calculator.G * J;
  let Fez3 = (1 / (Ag * ro2));
  return (Fez1 + Fez2) * Fez3;
}

calculator.FeE4_7 = calculator.Fez;

calculator.Fel = (c2, lamdaR, lamda, Fy) => {
  return Math.pow(c2 * lamdaR / lamda, 2) * Fy;
}

calculator.FeE7_5 = calculator.Fel;

calculator.be = (b, c1, Fel, Fcr) => {
  return b * (1 - c1 * Math.sqrt(Fel / Fcr)) * Math.sqrt(Fel / Fcr);
}

calculator.beE7_3 = calculator.be;

calculator.list = () => {
  for (let attr in calculator) {
    console.log(attr, calculator[attr]);
  }
  return 'done';
}

calculator.inDegrees = Math.PI / 180;

calculator.inRadians = 180 / Math.PI;

calculatorPost.defaultProps = {
  c: calculator
}


export const pageQuery = graphql`
query steelCompressionCalcs($slug: String!) {
	post: jsFrontmatter(fields: {slug: {eq: $slug}}) {
		...JSBlogPost_data
  }
}
`
