import React from "react";
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
          years: Big(0),
        },
      ],
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
        ratio: Big(0),
      },
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

  render() {
    return (
      <div
        sx={{
          wrap: "flex",
          flexDirection: "column",
          width: ["97.5%", "97.5%", "75%"],
          paddingLeft: ["2.5%", "12.5%", "25%"],
        }}
      >
        <div sx={{ padding: 4 }}>
          Total Payment:
          <Input
            name="maxpayment"
            type="number"
            step="10"
            value={this.state.payment.toFixed(2)}
            onChange={this.handlePayment.bind(this)}
          />
        </div>

        <div sx={{ padding: 4 }}>{this.loanInputs()}</div>

        <div sx={{ width: ["50%", "50%", "50%"], padding: 4 }}>
          <p>Totals: </p>
          <p>{`Total Balance: ${this.state.totalBalance.toFixed(2)}`}</p>
          <p>
            {`Total Minimum Payment: ${this.state.totalMin.toFixed(
              2
            )}+${this.state.additionalPayment.toFixed(2)}`}
          </p>
          <p>{`Total Interest Paid: ${this.state.interest.toFixed(2)}`}</p>
        </div>

        <button
          sx={{
            bg: "background",
            color: "text",
            borderColor: "secondary",
            margin: 5,
            padding: 3,
            borderRadius: "2em",
            transition: "all 0.2s",
            ":hover": {
              color: "muted",
              bg: "secondary",
            },
          }}
          onClick={this.addAnother.bind(this)}
        >
          add another
        </button>
      </div>
    );
  }

  loanInputs() {
    return this.state.loans.map((loan, index) => {
      let upArrow =
        index === 0 ? (
          <span />
        ) : (
          <button
            sx={{
              bg: "background",
              color: "text",
              borderColor: "secondary",
              margin: 2,
              paddingX: 3,
              paddingY: 2,
              borderRadius: "2em",
              transition: "all 0.2s",
              ":hover": {
                color: "muted",
                bg: "secondary",
              },
            }}
            onClick={this.handleShift.bind(this, index)}
          >
            ^
          </button>
        );

      return (
        <div key={index} sx={{ padding: 4 }}>
          <button
            sx={{
              bg: "background",
              color: "text",
              borderColor: "secondary",
              margin: 2,
              paddingX: 3,
              paddingY: 2,
              borderRadius: "2em",
              transition: "all 0.2s",
              ":hover": {
                color: "muted",
                bg: "secondary",
              },
            }}
            onClick={this.handleDelete.bind(this, index)}
          >
            x
          </button>
          {upArrow}
          <label>
            Name
            <Input
              name="name"
              type="text"
              value={loan.name}
              onChange={this.handleChange.bind(this, index)}
            />
          </label>
          <label>
            Balance $
            <Input
              name="balance"
              type="number"
              step="100"
              value={loan.balance.toFixed(2)}
              onChange={this.handleChange.bind(this, index)}
            />
          </label>
          <label>
            Interest Rate
            <Input
              name="intRate"
              type="number"
              step="0.01"
              value={loan.intRate.toFixed(2)}
              onChange={this.handleChange.bind(this, index)}
            />
            %
          </label>

          <label>
            Minimum Payment $
            <Input
              name="payment"
              type="number"
              step="5"
              value={loan.payment.toFixed(2)}
              onChange={this.handleChange.bind(this, index)}
            />
          </label>
          <p>{`Interest Paid: ${loan.accumulatedInterest
            .round(2)
            .toString()} | Months: ${loan.months
            .round(2)
            .toString()}m | Years: ${loan.years
            .round(2)
            .toString()}y | Ratio: ${loan.ratio.toFixed(2)}`}</p>
        </div>
      );
    });
  }
}

export default loanEfficiencyCalculator;

const Input = (props) => (
  <input
    sx={{
      display: "block",
      width: "100%",
      p: 2,
      appearance: "none",
      fontSize: "inherit",
      lineHeight: "inherit",
      border: "1px solid",
      borderRadius: 4,
      color: "inherit",
      bg: "background",
    }}
    {...props}
  />
);

let processLoans = (loanGroup) => {
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

let loanStats = (loan) => {
  loan.months = Big(0);
  loan.ratio = Big(loan.balance).div(loan.payment);
  loan.accumulatedInterest = Big(0);
  return loan;
};

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

let cleanNumbers = (loanGroup) => {
  let loans = loanGroup.loans;
  loans.forEach((loan) => {
    loan.years = Big(loan.months).div(12);
    loanGroup.interest = loanGroup.interest.plus(loan.accumulatedInterest);
    loanGroup.totalBalance = loanGroup.totalBalance.plus(loan.balance);
    loanGroup.totalMin = loanGroup.totalMin.plus(loan.payment);
  });
  loanGroup.additionalPayment = loanGroup.payment.minus(loanGroup.totalMin);
};
