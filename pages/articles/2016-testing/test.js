import React from 'react';

class calculatorPost extends React.Component {

    componentDidMount() {
        window.c = {...this.props.c};
    }

    render() {
        const {route} = this.props;

        return (
            <div>
              stuff
            </div>
            );
    }
}

calculatorPost.propTypes = {
    c: React.PropTypes.object,
    post: React.PropTypes.object,
    pages: React.PropTypes.array,
}

export default calculatorPost;




let calculator = {};
calculator.E = 29000;
calculator.G = 11200;


calculator.LRFD = (dead, live) => {
  return 1.2 * dead + 1.6 * live + 5000;
}

calculator.ASD = (dead, live) => {
  return dead + live;
}

calculator.loads = (dead, live) => {
  console.log('LRFD', calculator.LRFD(dead,live), '|', 'ASD', calculator.ASD(dead, live));
}

calculator.lamdaR = (limit, Fy, E) => {
  return limit * Math.sqrt(calculator.E / Fy);
}

calculator.Fe = (Lc_r) => {
  return Math.pow(Math.PI, 2) * calculator.E / Math.pow(Lc_r, 2);
}

calculator.kc = (h, tw) => {
  return 4 / Math.sqrt(h / tw);
}

calculator.I = (b, h) => {
  return 'fuck';
}

calculator.J = (arr) => {
  let val = 0;
  for (let i in arr) {
    val += (arr[i][0] * Math.pow(arr[i][1], 3) / 3);
  }
  return val;
}

calculator.FcrE3_2 = (Fe, Fy) => {
  return Math.pow(0.658, Fy / Fe) * Fy;
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

calculator.FeE4_3 = (Fey, Fez, H) => {
  let Fe1 = (Fey + Fez) / (2 * H);
  let Fe2 = (4 * Fey * Fez * H) / Math.pow(Fey + Fez, 2);
  return Fe1 * (1 - Math.sqrt(1 - Fe2));
}

calculator.Fez = (Cw, Lcz, J, Ag, ro2) => {
  let Fez1 = Math.pow(Math.PI, 2) * calculator.E * Cw / Math.pow(Lcz, 2);
  let Fez2 = calculator.G * J;
  let Fez3 = (1 / (Ag * ro2));
  console.log(Fez1,Fez2,Fez3);
  return (Fez1 + Fez2) * Fez3;
}

calculatorPost.defaultProps = {
  c: calculator
}