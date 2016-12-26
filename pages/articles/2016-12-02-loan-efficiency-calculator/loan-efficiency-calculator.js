import React from 'react';
import DocumentTitle from 'react-document-title';
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import moment from 'moment'
import { RouteHandler, Link } from 'react-router'
import ReadNext from '../../../components/ReadNext';
import './style.css';
import '../../../static/css/highlight.css';

exports.data = {
    title: 'Loan Efficiency Calculator',
    written: '',
    path: '/loan-efficiency-calculator',
    category: 'finance',
    description: 'Loan efficiency calculator.'
}

class loanEfficiencyCalculator extends React.Component {
    constructor(props) {
      super(props);
      this.state = {loans: [{name: 'loan1', balance: 0, intRate: 0, payment: 0}]};

      // this.handleChange = this.handleChange.bind(this);
//      this.handleSubmit = this.handleSubmit.bind(this);
    }

    addAnother(event) {
      console.log(event)
      this.setState({loans: [...this.state.loans, {name: '', balance: 0, intRate: 0, payment: 0}]})
    }

    handleChange(index, event) {
      let loanArray = [...this.state.loans];
      let loan = loanArray[index];
      if (event.target.type === 'number') {
          loan[event.target.name] = Number.parseFloat(event.target.value);
      } else {
          loan[event.target.name] = event.target.value;
      }
      let procLoans = loanSet(loanArray);
      procLoans.payment = 1200;
      procLoans.wallet = 0;
      procLoans.chest = 7;
      let setLoans = remainingMonths(procLoans);
      cleanNumbers(setLoans.loans);
      this.setState(setLoans);
    }

    componentDidMount() {
      // let testloans = fakeLoan(3);
      // let loans = Object.assign({}, testloans);
      // loans.payment = 1200;
      // loans.loans.sort((a, b) => b.intRate - a.intRate);

      // loans = remainingMonths(loans);
      // console.log('sort by interest rate', loans);

      // let loans2 = Object.assign({}, testloans);
      // loans2.payment = 1200;
      // loans2.loans.sort((a, b) => a.ratio - b.ratio);

      // loans2 = remainingMonths(loans2);
      // console.log('sort by ratio', loans2);

      // let realloans = loanSet([{
      //                   balance: 18000,
      //                   intRate: 0.054,
      //                   payment: 788.12  
      //                   }, {
      //                   balance: 4000,
      //                   intRate: 0.058,
      //                   payment: 65  
      //                   }, {
      //                   balance: 3000,
      //                   intRate: 0.034,
      //                   payment: 32  
      //                   }]);
      // let loans3 = Object.assign({}, realloans);
      // loans3.payment = 1200;
      // loans3.loans.sort((a, b) => b.intRate - a.intRate);

      // loans3 = remainingMonths(loans3);
      // console.log('sort by interest rate', loans3);

      // let loans4 = Object.assign({}, realloans);
      // loans4.payment = 1200;
      // loans4.loans.sort((a, b) => a.ratio - b.ratio);

      // loans4 = remainingMonths(loans4);
      // console.log('sort by ratio', loans4);

      // this.state = {}

    }

    render() {
        const {route} = this.props;
        const post = route.page.data

        let layout, template

        const home = (
          <div>
            <Link className='gohome' to={ prefixLink('/') }> All Articles
            </Link>
          </div>
        );

        if (post.updated === undefined) {
          var published = (
            <div className='date-published'>
              <p><em>published { moment(post.written).format('D MMM YYYY') }</em></p>
            </div>
          );
        } else {
          var published = (
            <div className='date-published'>
              <p><em>originally published { moment(post.written).format('D MMM YYYY') } and updated { moment(post.updated).format('D MMM YYYY') }</em></p>
            </div>
          );
        }

        layout = post.layout

        const loanInputs = this.state.loans.map((loan, index) => {
          return (
                <tbody key={index}><tr
                key={index}
                className='input-group'>
                  <td>
                    <input
                      name='name'
                      type='text'
                      value={loan.name}
                      onChange={this.handleChange.bind(this, index)}/>
                  </td>
                  <td>
                    <input
                      name='balance'
                      type='number'
                      value={loan.balance}
                      onChange={this.handleChange.bind(this, index)} />
                  </td>
                  <td>
                    <input
                      name='intRate'
                      type='number'
                      value={loan.intRate}
                      onChange={this.handleChange.bind(this, index)} />
                  </td>
                  <td>
                    <input
                      name='payment'
                      type='number'
                      value={loan.payment}
                      onChange={this.handleChange.bind(this, index)} />
                  </td>
                  <td>
                    <span>{loan.accumulatedInterest}||</span>
                  </td>
                  <td><span>{loan.months}d|{loan.months / 12}y</span></td>
                </tr></tbody>
          );
        });

        return (
          <DocumentTitle title={ `${post.title} - ${config.siteTitle}` }>
            <div>
              { home }
              <div className='blog-single'>
                <div className='text'>
                  <h1>{ post.title }</h1>
                  <div className='postBody'>
                    <p>
                      We do some fancy stuff here. Trust us.
                    </p>
                    <div>
                      <table>
                        <thead><tr>
                          <th>Name</th>
                          <th>Balance</th>
                          <th>Interest Rate</th>
                          <th>Payment</th>
                          <th>Interest</th>
                          <th>Months</th>
                        </tr></thead>
                        { loanInputs }
                      </table>
                      <button onClick={this.addAnother.bind(this)}>
                        add another
                      </button>
                    </div>
                  </div>
                  { published }
                </div>
                <div className='footer'>
                  <ReadNext post={ post } {...this.props}/>
                  <hr></hr>
                  <p>
                    { config.siteDescr }
                    <a href={ config.siteTwitterUrl }>
                      <br></br> <strong>{ config.siteAuthor }</strong> on Twitter</a>
                  </p>
                </div>
              </div>
            </div>
          </DocumentTitle>
        );
    }
}

loanEfficiencyCalculator.propTypes = {
    post: React.PropTypes.object,
    pages: React.PropTypes.array,
}

export default loanEfficiencyCalculator;

let fakeLoan = (createLoans) => {
  let loanArray = [];
  for (let i = 1; i <= createLoans; i++) {
    let newLoan = {};
    newLoan.balance = Math.round(40000 * Math.random() * 100) / 100;
    newLoan.intRate = Math.max(0.01, Math.round(0.15 * Math.random() * 1000) / 1000);
    newLoan.payment = Math.min(newLoan.balance, Math.round(1000 * Math.random() * 100) / 100);
    loanArray.push(newLoan);
  }
  return loanSet(loanArray);
}

let loanSet = (loanArray) => {
  let loanGroup = {}
  loanGroup.loans = [];
  loanGroup.balance = 0;
  for (let i = 0; i < loanArray.length; i++) {
    let newLoan = loanCalcProcess(loanArray[i]);
    loanGroup.loans.push(newLoan);
    loanGroup.balance += newLoan.balance;
  }
  return loanGroup
}

let loanCalcProcess = (loan) => {
  loan.months = 0;
  loan.ratio = Math.round((loan.balance / loan.payment) * 10) / 10;
  loan.accumulatedInterest = 0;
  return loan;
}

let remainingMonths = (loanGroup) => {
  let months = 1;
  do {
    loanGroup.wallet = loanGroup.payment;
    loanGroup.chest = 0;
    // console.log('loanGroup', loanGroup)
    for (let i = 0; i < loanGroup.loans.length; i++) {
      let loan = loanGroup.loans[i];
      loan.chest = months === 1 ? loan.balance : loan.chest; // chest is the emphereal version of balance
      // console.log('i', i, 'months', loan.months, 'chest', loan.chest, loanGroup.chest, 'payment', loan.payment, 'accumulatedInterest', loan.accumulatedInterest)
      if (loan.chest > 0) {
        loan.months += 1;
        loan.interest = (loan.chest * loan.intRate / 12);
        loan.chest = loan.chest - loan.payment + loan.interest;
        loanGroup.wallet = loanGroup.wallet - loan.payment; // the emphereal version of payment for everything
        loanGroup.chest = loanGroup.chest + loan.chest;
        loan.accumulatedInterest += loan.interest;
        // if (i === 2) console.log(JSON.stringify(loanGroup))
      }
    }

    for (let i = 0; i < loanGroup.loans.length; i++) {
      if (loanGroup.loans[i].chest > 0) {
        loanGroup.loans[i].chest -= loanGroup.wallet;
        loanGroup.wallet = 0;
      }
      if (loanGroup.loans[i].chest < 0) {
        // console.log('loans dropped below zero')
        loanGroup.wallet -= loanGroup.loans[i].chest;
        loanGroup.loans[i].chest = 0;
        loanGroup.loans[i].total = loanGroup.loans[i].balance + loanGroup.loans[i].accumulatedInterest;
        loanGroup.total = loanGroup.loans[i].total;
      }
    }

    months += 1;
  } while (loanGroup.chest > 0 && months < 721)
  return loanGroup;
}

let cleanNumbers = (loans) => {
  loans.forEach((loan) => {
      loan.accumulatedInterest = Math.round(loan.accumulatedInterest, 2)
    }
  )
};
