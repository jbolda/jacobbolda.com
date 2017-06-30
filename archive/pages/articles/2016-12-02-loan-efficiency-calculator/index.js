import React from 'react';
// import ReadNext from '../../../components/ReadNext';
var Big = require('big.js');
// import './style.scss';
// import 'static/css/highlight.css';

exports.data = {
    title: 'Loan Efficiency Calculator',
    written: '2017-01-22',
    path: 'loan-efficiency-calculator',
    category: 'finance',
    description: 'This calculator assists in running the numbers on loan overpayment and how that affects your interest paid and time to final payment.'
}

class loanEfficiencyCalculator extends React.Component {
    constructor(props) {
      super(props);
      let initialLoans = {
        balance: Big(0),
        totalBalance: Big(0),
        payment: Big(1200),
        wallet: Big(0),
        chest: Big(7),
        interest: Big(0),
        loans: [{
            name: 'First Loan',
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
      let loanGroup = {...this.state};
      loanGroup.loans = [...this.state.loans, {
                name: '',
                balance: Big(100),
                intRate: Big(1.00),
                payment: Big(10),
                accumulatedInterest: Big(0),
                months: Big(0),
                years: Big(0),
                ratio: Big(0)
              }];
      let setLoans = processLoans(loanGroup);
      this.setState(setLoans);
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
        // const {route} = this.props;
        // const post = route.page.data

        // let layout, template

        // layout = post.layout

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
                <div key={index} className='tile is-vertical box'>
                  <div className='tile is-parent is-12'>
                    <div className='tile is-child is-1'>
                      <button
                        className='button is-danger'
                        onClick={this.handleDelete.bind(this, index)}>
                        x
                      </button>
                      { upArrow }
                    </div>
                  </div>
                  <div className='tile is-parent is-12'>
                    <div className='tile is-child is-3'>
                      <div className='container is-fluid'>
                        <label className='label'>
                          Name
                        </label>
                        <p className='control'>
                          <input
                            name='name'
                            type='text'
                            className='input is-expanded'
                            value={loan.name}
                            onChange={this.handleChange.bind(this, index)}/>
                        </p>
                      </div>
                    </div>
                    <div className='tile is-child is-3'>
                      <div className='container is-fluid'>
                        <label className='label'>
                          Balance
                        </label>
                        <p className='control has-addons'>
                          <span className='control button is-disabled'>$</span>
                          <input
                            name='balance'
                            type='number'
                            className='input is-expanded'
                            step='100'
                            value={loan.balance.toFixed(2)}
                            onChange={this.handleChange.bind(this, index)} />
                        </p>
                      </div>
                    </div>
                    <div className='tile is-child is-3'>
                      <div className='container is-fluid'>
                        <label className='label'>
                          Interest Rate
                        </label>
                        <p className='control has-addons'>
                          <input
                            name='intRate'
                            type='number'
                            className='input is-expanded'
                            step='0.01'
                            value={loan.intRate.toFixed(2)}
                            onChange={this.handleChange.bind(this, index)} />
                          <span className='control button is-disabled'>%</span>
                        </p>
                      </div>
                    </div>
                    <div className='tile is-child is-3'>
                      <div className='container is-fluid'>
                        <label className='label'>
                          Minimum Payment
                        </label>
                        <p className='control has-addons'>
                          <span className='control button is-disabled'>$</span>
                          <input
                            name='payment'
                            type='number'
                            className='input is-expanded'
                            step='5'
                            value={loan.payment.toFixed(2)}
                            onChange={this.handleChange.bind(this, index)} />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='tile is-parent is-12'>
                    <div className='tile is-child is-3'>
                      <div className='container is-fluid'>
                        <span>
                          Interest Paid:&nbsp;
                        </span>
                        <span>${loan.accumulatedInterest.round(2).toString()}</span>
                      </div>
                    </div>
                    <div className='tile is-child is-3'>
                      <div className='container is-fluid'>
                        <span>
                          Months:&nbsp;
                        </span>
                        <span>{loan.months.round(2).toString()}m</span>
                      </div>
                    </div>
                    <div className='tile is-child is-3'>
                      <div className='container is-fluid'>
                        <span>
                          Years:&nbsp;
                        </span>
                        <span>{loan.years.round(2).toString()}y</span>
                      </div>
                    </div>
                    <div className='tile is-child is-3'>
                      <div className='container is-fluid'>
                        <span>
                          Ratio:&nbsp;
                        </span>
                        <span>{loan.ratio.toFixed(2)}</span>
                      </div>
                    </div>
                </div>
              </div>
          );
        });
                  // <h1>{ post.title }</h1>

        return (
            <div className=''>

              <div className='section'>
                <div className='container content'>
                  <h2>Debt Payoff</h2>
                  <p>When tackling debt, there are plenty of pointers out there for the best method. The most efficient way to pay down the debt is with the highest interest first. Finances are highly emotional though. If they weren't, it would be simply that income has to be greater then expenses, and nobody would ever struggle.</p>

                  <p>Yes, they are clearly emotional.</p>

                  <p>So how do we best approach things then? Well, paying off the loan with the smallest balance first is the answer. Depending on your loan situation though, this can be very fiscally inefficient. If you are anything like me, you hate paying interest and fees.</p>

                  <p>Perhaps hate is too strong a word.</p>

                  <p>There has to be a solution to this, right? Well, it seems to best to have a mix of both of these methods. Only you know you. Start off with a quick win, and then tackle that high interest debt. Or hit the high interest head first.</p>

                  <p>Most importantly though, know what effects these choices create, emotional highs paying off loans or fiscal wins paying less interest. Secondly make the plan consistent by paying the same amount every month. As loans pay off, you will be making greater and greater additional payments as that payment "snowball" or creates an "avalanche" effect.</p>

                  <p>The best part? I created a calculator below to help you run the numbers. Feel free to shoot me an email or tweet me with any feedback or questions!</p>

                  <h2>Calculator Breakdown</h2>
                  <p>Firstly, we enter the total payment. This is the amount you pay month over month, consistently, even as you pay off loans.</p>

                  <p>Next, we add all of our loans. The name is just a label to keep you sane. The balance is how much you owe on the loan; the amount of money that interest accrues upon. The interest rate is entered as a percent. It is the APY, not APR. The minimum payment is the smallest you owe monthly to not go into default.</p>

                  <p>Continuing, each loan will show the interest paid as well as the time it took to pay off this loan. There is a max loan of 60 years to prevent errors, but hopefully that is not a limit you will need to consider.</p>

                  <p>As loans are paid off, the additional payment amount increases by the minimum payment of each loan that is paid off. At the bottom, you can view the total numbers. The total balance is how much debt you have right now. The minimum payment represents the (total minimum payment) + (the additional payment) = (total payment), where the total payment is the first number that we entered.</p>

                  <p>Lastly we have the total interest paid. Feel free to play around with the order of loan payment and see how it affects this number. Strike a good balance between minimizing this number and getting enough wins to keep you on the horse.</p>

                  <p>Good luck, and happy math!</p>
                </div>
              </div>

              <div
                className='section'
                style={{backgroundColor: 'hsl(0, 0%, 96%)'}}>
                <div className='container'>
                  <div className='box is-3'>
                    Total Payment: 
                    <input
                      name='maxpayment'
                      type='number'
                      className='input'
                      step='10'
                      value={this.state.payment.toFixed(2)}
                      onChange={this.handlePayment.bind(this)} />
                  </div>
                  <div className='tile is-ancestor is-vertical section' style={{backgroundColor: 'inherit'}}>
                    { loanInputs }
                    <div className='tile is-parent box'>
                      <div className='tile is-child is-3'>Totals: </div>
                      <div className='tile is-child is-3'>
                        <span className=''>
                          Total Balance:&nbsp;
                        </span>
                        {this.state.totalBalance.toFixed(2)}
                      </div>
                      <div className='tile is-child is-3'>
                        <span className=''>
                          Total Minimum Payment:&nbsp;
                        </span>
                        {this.state.totalMin.toFixed(2)}+{this.state.additionalPayment.toFixed(2)}
                      </div>
                      <div className='tile is-child is-3'>
                        <span className=''>
                          Total Interest Paid:&nbsp;
                        </span>
                        {this.state.interest.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <button
                    className='button is-success'
                    onClick={this.addAnother.bind(this)}>
                    add another
                  </button>
                </div>
              </div>

            </div>
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
  newLoanGroup.totalBalance = Big(0);
  newLoanGroup.totalMin = Big(0);
  newLoanGroup.interest = Big(0);
  for (let i = 0; i < loanGroup.loans.length; i++) {
    let newLoan = loanStats(loanGroup.loans[i]);
    newLoanGroup.loans.push(newLoan);
    newLoanGroup.balance.plus(newLoan.balance);
  }
  let setLoans = remainingMonths(newLoanGroup);
  cleanNumbers(setLoans);
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

let cleanNumbers = (loanGroup) => {
  let loans = loanGroup.loans;
  loans.forEach((loan) => {
      loan.years = Big(loan.months).div(12);
      loanGroup.interest = loanGroup.interest.plus(loan.accumulatedInterest);
      loanGroup.totalBalance = loanGroup.totalBalance.plus(loan.balance);
      loanGroup.totalMin = loanGroup.totalMin.plus(loan.payment);
  })
  loanGroup.additionalPayment = loanGroup.payment.minus(loanGroup.totalMin);
};
