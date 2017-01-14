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
      let initialLoans = {
        payment: Big(1200),
        wallet: Big(0),
        chest: Big(7),
        loans: [{
            name: 'loan1',
            balance: Big(30000),
            intRate: Big(5.00),
            payment: Big(320),
            accumulatedInterest: Big(0),
            months: Big(0),
            years: Big(0)
          }]
      };
      this.state = processLoans(initialLoans);
    }

    addAnother(event) {
      this.setState({loans: [...this.state.loans, {
                name: '',
                balance: Big(100),
                intRate: Big(1.00),
                payment: Big(10),
                accumulatedInterest: Big(0),
                months: Big(0),
                years: Big(0)
              }]})
    }

    handleChange(index, event) {
      let loanGroup = {...this.state};
      let loan = loanGroup.loans[index];
      if (event.target.type === 'number') {
          loan[event.target.name] = Big(event.target.value);
      } else {
          loan[event.target.name] = event.target.value;
      }
      let setLoans = processLoans(loanGroup);
      this.setState(setLoans);
    }

    handlePayment(event) {
      let original = {...this.state};
      original.payment = Big(event.target.value);
      let setLoans = processLoans(original);
      this.setState(setLoans);
    }

    handleDelete(index, event) {
      let loanGroup = {...this.state};
      loanGroup.loans.splice(index, 1);
      let setLoans = processLoans(loanGroup);
      this.setState(setLoans);
    }

    handleShift(index, event) {
      let loanGroup = {...this.state};
      let loan = loanGroup.loans[index];
      loanGroup.loans.splice(index, 1);
      loanGroup.loans.splice(index - 1, 0, loan);
      let setLoans = processLoans(loanGroup);
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

          if (index === 0) {
            var upArrow = (
              <span></span>
              );
          } else {
            var upArrow = (
              <button
                className='button is-info'
                onClick={this.handleShift.bind(this, index)}>
                ^
              </button>
              );
          }

          return (
                <div key={index} className='tile is-parent'>
                  <div className='tile is-child is-1'>
                    <button
                      className='button is-danger'
                      onClick={this.handleDelete.bind(this, index)}>
                      x
                    </button>
                    { upArrow }
                  </div>
                  <div className='tile is-child is-3'>
                    <input
                      name='name'
                      type='text'
                      value={loan.name}
                      onChange={this.handleChange.bind(this, index)}/>
                  </div>
                  <div className='tile is-child is-2'>
                    <input
                      name='balance'
                      type='number'
                      step='100'
                      value={loan.balance.toFixed(2)}
                      onChange={this.handleChange.bind(this, index)} />
                  </div>
                  <div className='tile is-child is-1'>
                    <input
                      name='intRate'
                      type='number'
                      step='0.01'
                      value={loan.intRate.toFixed(2)}
                      onChange={this.handleChange.bind(this, index)} />
                  </div>
                  <div className='tile is-child is-2'>
                    <input
                      name='payment'
                      type='number'
                      step='5'
                      value={loan.payment.toFixed(2)}
                      onChange={this.handleChange.bind(this, index)} />
                  </div>
                  <div className='tile is-child is-1'>
                    <span>${loan.accumulatedInterest.round(2).toString()}</span>
                  </div>
                  <div className='tile is-child is-1'>
                    <span>{loan.months.round(2).toString()}m</span>
                  </div>
                  <div className='tile is-child is-1'>
                    <span>{loan.years.round(2).toString()}y</span>
                  </div>
                </div>
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
                          step='10'
                          value={this.state.payment.toFixed(2)}
                          onChange={this.handlePayment.bind(this)} />
                      </div>
                      <div className='tile is-ancestor is-vertical'>
                        <div className='tile is-parent is-hidden-mobile'>
                          <div className='tile is-child is-1'></div>
                          <div className='tile is-child is-3'>Name</div>
                          <div className='tile is-child is-2'>Balance</div>
                          <div className='tile is-child is-1'>Rate</div>
                          <div className='tile is-child is-2'>Payment</div>
                          <div className='tile is-child is-1'>Interest</div>
                          <div className='tile is-child is-1'>Months</div>
                          <div className='tile is-child is-1'>Years</div>
                        </div>
                        { loanInputs }
                      </div>
                      <button
                        className='button is-success'
                        onClick={this.addAnother.bind(this)}>
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
  loan.months = Big(0);
  loan.ratio = Big(loan.balance).div(loan.payment);
  loan.accumulatedInterest = Big(0);
  return loan;
}

let remainingMonths = (loanGroup) => {
  let months = Big(1);
  do {
    loanGroup.wallet = loanGroup.payment;
    loanGroup.chest = Big(0);
    for (let i = 0; i < loanGroup.loans.length; i++) {
      let loan = loanGroup.loans[i];
      loan.chest = months.eq(1) ? loan.balance : loan.chest; // chest is the emphereal version of balance
      if (loan.chest.gt(0)) {
        loan.months = loan.months.plus(1);
        loan.interest = Big(loan.chest).times(loan.intRate).div(100).div(12);
        loan.chest = Big(loan.chest).minus(loan.payment).plus(loan.interest);
        loanGroup.wallet = Big(loanGroup.wallet).minus(loan.payment); // the emphereal version of payment for everything
        loanGroup.chest = Big(loanGroup.chest).plus(loan.chest);
        loan.accumulatedInterest = loan.accumulatedInterest.plus(loan.interest);
      }
    }

    for (let i = 0; i < loanGroup.loans.length; i++) {
      if (loanGroup.loans[i].chest.gt(0)) {
        loanGroup.loans[i].chest = loanGroup.loans[i].chest.minus(loanGroup.wallet);
        loanGroup.wallet = Big(0);
      }
      if (loanGroup.loans[i].chest.lt(0)) {
        loanGroup.wallet = loanGroup.wallet.minus(loanGroup.loans[i].chest);
        loanGroup.loans[i].chest = Big(0);
        loanGroup.loans[i].total = loanGroup.loans[i].balance.plus(loanGroup.loans[i].accumulatedInterest);
        loanGroup.total = loanGroup.loans[i].total;
      }
    }

    months = months.plus(1);
  } while (loanGroup.chest.gt(0) && months.lt(721))
  return loanGroup;
}

let cleanNumbers = (loans) => {
  loans.forEach((loan) => {
      loan.accumulatedInterest = Big(loan.accumulatedInterest)
      loan.years = Big(loan.months).div(12) 
    }
  )
};
