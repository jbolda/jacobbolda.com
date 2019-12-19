import React from "react";
import { graphql } from "gatsby";
import Big from "big.js";

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
      loans: [
        {
          name: "First Loan",
          balance: Big(30000),
          intRate: Big(5.0),
          payment: Big(320),
          accumulatedInterest: Big(0),
          months: Big(0),
          years: Big(0)
        }
      ]
    };
    this.state = processLoans(initialLoans);
  }

  addAnother(event) {
    let loanGroup = { ...this.state };
    loanGroup.loans = [
      ...this.state.loans,
      {
        name: "",
        balance: Big(100),
        intRate: Big(1.0),
        payment: Big(10),
        accumulatedInterest: Big(0),
        months: Big(0),
        years: Big(0),
        ratio: Big(0)
      }
    ];
    let setLoans = processLoans(loanGroup);
    this.setState(setLoans);
  }

  handleChange(index, event) {
    let loanGroup = { ...this.state };
    let loan = loanGroup.loans[index];
    if (event.target.type === "number") {
      loan[event.target.name] = Big(event.target.value);
    } else {
      loan[event.target.name] = event.target.value;
    }
    let setLoans = processLoans(loanGroup);
    this.setState(setLoans);
  }

  handlePayment(event) {
    let original = { ...this.state };
    original.payment = Big(event.target.value);
    let setLoans = processLoans(original);
    this.setState(setLoans);
  }

  handleDelete(index, event) {
    let loanGroup = { ...this.state };
    loanGroup.loans.splice(index, 1);
    let setLoans = processLoans(loanGroup);
    this.setState(setLoans);
  }

  handleShift(index, event) {
    let loanGroup = { ...this.state };
    let loan = loanGroup.loans[index];
    loanGroup.loans.splice(index, 1);
    loanGroup.loans.splice(index - 1, 0, loan);
    let setLoans = processLoans(loanGroup);
    this.setState(setLoans);
  }

  componentDidMount() {}

  renderCalculator() {
    return (
      <React.Fragment>
        <div
          className="tile is-ancestor is-vertical"
          style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
        >
          <div className="tile is-parent is-3">
            <div className="tile is-child box">
              Total Payment:
              <input
                name="maxpayment"
                type="number"
                className="input"
                step="10"
                value={this.state.payment.toFixed(2)}
                onChange={this.handlePayment.bind(this)}
              />
            </div>
          </div>
          <div
            className="tile is-parent is-vertical"
            style={{ backgroundColor: "inherit" }}
          >
            {this.loanInputs()}
            <div className="tile">
              <div className="tile is-parent box">
                <div className="tile is-child is-3">Totals: </div>
                <div className="tile is-child is-3">
                  <span className="">Total Balance:&nbsp;</span>
                  {this.state.totalBalance.toFixed(2)}
                </div>
                <div className="tile is-child is-3">
                  <span className="">Total Minimum Payment:&nbsp;</span>
                  {this.state.totalMin.toFixed(2)}+
                  {this.state.additionalPayment.toFixed(2)}
                </div>
                <div className="tile is-child is-3">
                  <span className="">Total Interest Paid:&nbsp;</span>
                  {this.state.interest.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
          <div className="tile is-parent is-3">
            <div className="tile is-child">
              <button
                className="button is-success"
                onClick={this.addAnother.bind(this)}
              >
                add another
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  loanInputs() {
    return this.state.loans.map((loan, index) => {
      let upArrow;
      if (index === 0) {
        upArrow = <span />;
      } else {
        upArrow = (
          <button
            className="button is-info"
            onClick={this.handleShift.bind(this, index)}
          >
            ^
          </button>
        );
      }
      return (
        <div key={index} className="tile is-vertical box">
          <div className="tile is-parent is-12">
            <div className="tile is-child is-1">
              <button
                className="button is-danger"
                onClick={this.handleDelete.bind(this, index)}
              >
                x
              </button>
              {upArrow}
            </div>
          </div>
          <div className="tile is-parent is-12">
            <div className="tile is-child is-3">
              <div className="field">
                <label className="label">Name</label>
                <div
                  className="control is-expanded"
                  style={{ paddingRight: "0.5rem" }}
                >
                  <input
                    name="name"
                    type="text"
                    className="input"
                    value={loan.name}
                    onChange={this.handleChange.bind(this, index)}
                  />
                </div>
              </div>
            </div>
            <div className="tile is-child is-3">
              <div className="field">
                <label className="label">Balance</label>
                <div className="field has-addons">
                  <p className="control">
                    <button className="button is-static">$</button>
                  </p>
                  <p
                    className="control is-expanded"
                    style={{ paddingRight: "0.5rem" }}
                  >
                    <input
                      name="balance"
                      type="number"
                      className="input"
                      step="100"
                      value={loan.balance.toFixed(2)}
                      onChange={this.handleChange.bind(this, index)}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="tile is-child is-3">
              <div className="field">
                <label className="label">Interest Rate</label>
                <div className="field has-addons">
                  <p className="control is-expanded">
                    <input
                      name="intRate"
                      type="number"
                      className="input"
                      step="0.01"
                      value={loan.intRate.toFixed(2)}
                      onChange={this.handleChange.bind(this, index)}
                    />
                  </p>
                  <p className="control" style={{ paddingRight: "0.5rem" }}>
                    <button className="button is-static">%</button>
                  </p>
                </div>
              </div>
            </div>
            <div className="tile is-child is-3">
              <div className="field">
                <label className="label">Minimum Payment</label>
                <div className="field has-addons">
                  <p className="control">
                    <button className="button is-static">$</button>
                  </p>
                  <p className="control is-expanded">
                    <input
                      name="payment"
                      type="number"
                      className="input"
                      step="5"
                      value={loan.payment.toFixed(2)}
                      onChange={this.handleChange.bind(this, index)}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="tile is-parent is-12">
            <div className="tile is-child is-3">
              <div className="container is-fluid">
                <span>Interest Paid:&nbsp;</span>
                <span>${loan.accumulatedInterest.round(2).toString()}</span>
              </div>
            </div>
            <div className="tile is-child is-3">
              <div className="container is-fluid">
                <span>Months:&nbsp;</span>
                <span>{loan.months.round(2).toString()}m</span>
              </div>
            </div>
            <div className="tile is-child is-3">
              <div className="container is-fluid">
                <span>Years:&nbsp;</span>
                <span>{loan.years.round(2).toString()}y</span>
              </div>
            </div>
            <div className="tile is-child is-3">
              <div className="container is-fluid">
                <span>Ratio:&nbsp;</span>
                <span>{loan.ratio.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return this.renderCalculator;
  }
}

export default loanEfficiencyCalculator;

let processLoans = loanGroup => {
  let newLoanGroup = { ...loanGroup };
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
};

let loanStats = loan => {
  loan.months = Big(0);
  loan.ratio = Big(loan.balance).div(loan.payment);
  loan.accumulatedInterest = Big(0);
  return loan;
};

let remainingMonths = loanGroup => {
  let months = Big(1);
  do {
    loanGroup.wallet = loanGroup.payment;
    loanGroup.chest = Big(0);
    for (let i = 0; i < loanGroup.loans.length; i++) {
      let loan = loanGroup.loans[i];
      loan.chest = months.eq(1) ? loan.balance : loan.chest; // chest is the emphereal version of balance
      if (loan.chest.gt(0)) {
        loan.months = loan.months.plus(1);
        loan.interest = Big(loan.chest)
          .times(loan.intRate)
          .div(100)
          .div(12);
        loan.chest = Big(loan.chest)
          .minus(loan.payment)
          .plus(loan.interest);
        loanGroup.wallet = Big(loanGroup.wallet).minus(loan.payment); // the emphereal version of payment for everything
        loanGroup.chest = Big(loanGroup.chest).plus(loan.chest);
        loan.accumulatedInterest = loan.accumulatedInterest.plus(loan.interest);
      }
    }

    for (let i = 0; i < loanGroup.loans.length; i++) {
      if (loanGroup.loans[i].chest.gt(0)) {
        loanGroup.loans[i].chest = loanGroup.loans[i].chest.minus(
          loanGroup.wallet
        );
        loanGroup.wallet = Big(0);
      }
      if (loanGroup.loans[i].chest.lt(0)) {
        loanGroup.wallet = loanGroup.wallet.minus(loanGroup.loans[i].chest);
        loanGroup.loans[i].chest = Big(0);
        loanGroup.loans[i].total = loanGroup.loans[i].balance.plus(
          loanGroup.loans[i].accumulatedInterest
        );
        loanGroup.total = loanGroup.loans[i].total;
      }
    }

    months = months.plus(1);
  } while (loanGroup.chest.gt(0) && months.lt(721));
  return loanGroup;
};

let cleanNumbers = loanGroup => {
  let loans = loanGroup.loans;
  loans.forEach(loan => {
    loan.years = Big(loan.months).div(12);
    loanGroup.interest = loanGroup.interest.plus(loan.accumulatedInterest);
    loanGroup.totalBalance = loanGroup.totalBalance.plus(loan.balance);
    loanGroup.totalMin = loanGroup.totalMin.plus(loan.payment);
  });
  loanGroup.additionalPayment = loanGroup.payment.minus(loanGroup.totalMin);
};
