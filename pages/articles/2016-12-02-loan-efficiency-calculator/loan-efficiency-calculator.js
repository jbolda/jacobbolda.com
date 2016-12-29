import React from 'react';
import DocumentTitle from 'react-document-title';
import { prefixLink } from 'gatsby-helpers';
import { config } from 'config';
import moment from 'moment';
import { RouteHandler, Link } from 'react-router';
import ReadNext from '../../../components/ReadNext';
//import { Big, plus, minus, div } from 'big.js';
var Big = require('big.js');
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
      this.state = {
        payment: 1200,
        wallet: 0,
        chest: 7,
        loans: [{name: 'loan1', balance: 30000, intRate: 0.05, payment: 320}]
      };

      // this.handleChange = this.handleChange.bind(this);
//      this.handleSubmit = this.handleSubmit.bind(this);
    }

    addAnother(event) {
      console.log(event)
      this.setState({loans: [...this.state.loans, {name: '', balance: 0, intRate: 0, payment: 0}]})
    }

    handleChange(index, event) {
      let loanGroup = {...this.state};
      let loan = loanGroup.loans[index];
      if (event.target.type === 'number') {
          loan[event.target.name] = Big(event.target.value);
      } else {
          loan[event.target.name] = event.target.value;
      }
      console.log(loanGroup)
      let setLoans = processLoans(procLoans);
      this.setState(setLoans);
    }

    handlePayment(event) {
      let original = {...this.state};
      original.payment = Number.parseFloat(event.target.value);
      console.log(original)
      let setLoans = processLoans(original);
      this.setState(setLoans);
    }

    componentDidMount() {
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
                  <td><span>{loan.months || 0}m|{loan.years || 0}y</span></td>
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
                      <div>
                        Total Payment: 
                        <input
                          name='maxpayment'
                          type='number'
                          value={this.state.payment}
                          onChange={this.handlePayment.bind(this)} />
                      </div>
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

let processLoans = (loanGroup) => {
  let newLoanGroup = {...loanGroup};
  newLoanGroup.loans = [];
  newLoanGroup.balance = Big(0);
  for (let i = 0; i < loanGroup.loans.length; i++) {
    let newLoan = loanStats(loanGroup.loans[i]);
    newLoanGroup.loans.push(newLoan);
    newLoanGroup.balance.plus(newLoan.balance);
  }
  let setLoans = remainingMonths(newLoanGroup);
  cleanNumbers(setLoans.loans);
  return setLoans;
}

let loanStats = (loan) => {
  loan.months = 0;
  loan.ratio = Big(loan.balance).div(loan.payment);
  loan.accumulatedInterest = Big(0);
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
        loan.interest = Big(loan.chest).times(loan.intRate).div(12);
        loan.chest = Big(loan.chest).minus(loan.payment).plus(loan.interest);
        loanGroup.wallet = Big(loanGroup.wallet).minus(loan.payment); // the emphereal version of payment for everything
        loanGroup.chest = Big(loanGroup.chest).plus(loan.chest);
        loan.accumulatedInterest.plus(loan.interest);
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
      loan.years = Math.round(loan.months / 12, -2) 
    }
  )
};
