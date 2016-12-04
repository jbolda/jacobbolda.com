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
    written: '2016-12-02',
    path: '/loan-efficiency-calculator',
    category: 'finance',
    description: 'Loan efficiency calculator.'
}

class loanEfficiencyCalculator extends React.Component {

    componentDidMount() {
      let loans = fakeLoan(1);
      loans.payment = 1200;
      loans.loans.sort((a, b) => b.intRate - a.intRate);

      loans = remainingMonths(loans);
      console.log('loans', loans);

      let loans2 = fakeLoan(3);
      loans2.payment = 1200;
      loans2.loans.sort((a, b) => a.ratio - b.ratio);

      loans2 = remainingMonths(loans2);
      console.log('loans2', loans2);
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
    c: React.PropTypes.object,
    post: React.PropTypes.object,
    pages: React.PropTypes.array,
}

export default loanEfficiencyCalculator;

let fakeLoan = (createLoans) => {
  let loanGroup = {}
  loanGroup.loans = [];
  loanGroup.balance = 0;
  for (let i = 1; i <= createLoans; i++) {
    let newLoan = {};
    newLoan.balance = Math.round(40000 * Math.random() * 100) / 100;
    newLoan.intRate = Math.round(0.1 * Math.random() * 1000) / 1000;
    newLoan.payment = Math.round(1000 * Math.random() * 100) / 100;
    newLoan.months = 0;
    newLoan.ratio = Math.round((newLoan.balance / newLoan.payment) * Math.random() * 10) / 10;
    newLoan.accumulatedInterest = 0;
    loanGroup.loans.push(newLoan);
    loanGroup.balance += newLoan.balance;
  }
  return loanGroup;
}

let remainingMonths = (loanGroup) => {
  loanGroup.chest = 1000000000;
  let months = 1;
  do {
    loanGroup.wallet = loanGroup.payment;
    // console.log('loanGroup', loanGroup)
    for (let i = 0; i < loanGroup.loans.length; i++) {
      let loan = loanGroup.loans[i];
      loan.chest = months === 1 ? loan.balance : loan.chest;
      if (loan.chest > 0) {
        loan.months += 1;
        loan.interest = (loan.chest * loan.intRate / 12);
        loan.chest = loan.chest - loan.payment + loan.interest;
        loanGroup.wallet = loanGroup.wallet - loan.payment;
        loanGroup.chest = (i === 0) ? loan.chest : (loanGroup.chest + loan.chest);
        loan.accumulatedInterest += loan.interest;
      }
      console.log(loanGroup.chest, 'loan'+i, loan.chest)
    }

    for (let i = 0; i < loanGroup.loans.length; i++) {
      if (loanGroup.loans[i].chest > 0) {
        loanGroup.loans[i].chest -= loanGroup.wallet;
        loanGroup.wallet = 0;
      }
      if (loanGroup.loans[i].chest <= 0) {
        loanGroup.wallet -= loanGroup.loans[i].chest;
        loanGroup.loans[i].chest = 0;
      }
    }

    months += 1;
  } while (loanGroup.chest > 0 && months < 144)
  return loanGroup;
}
