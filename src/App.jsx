import { useState } from "react";
import "./style/style.css";
function App() {
  const [mortgageAmount, setMortgageAmount] = useState("");
  const [mortgageTerm, setMortgageTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [mortgageType, setMortgageType] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [errors, setErrors] = useState([]);

  const calculateRepayments = () => {

    if (!validateFields()) {  
      return;
    }

    let monthlyRate = interestRate / 100 / 12;
    let numberOfPayments = mortgageTerm * 12;

    let payment;

    if (mortgageType === "repayment") {
      // Repayment mortgage calculation
      payment =
        (mortgageAmount * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    } else {
      // Interest-only mortgage calculation
      payment = mortgageAmount * monthlyRate;
    }

    setMonthlyPayment(payment.toFixed(2));

    return errors.length === 0;
  };

  const validateFields = () => {
    let errors = [];
    if (mortgageAmount === "") {
      errors.push({
        id: "mortgageAmount",
        msg: "This field is required",
      })
    }
    if(mortgageTerm === ""){
      errors.push({
        id: "mortgageTerm",
        msg: "This field is required",
      })
    }
    if(interestRate === ""){
      errors.push({
        id: "interestRate",
        msg: "This field is required",
      })
    }
    if(mortgageType === ""){
      errors.push({
        id: "mortgageType",
        msg: "This field is required",
      })
    }
    setErrors(errors);
    return errors.length === 0;
  }
  const clearAllFields = () => {
    setMortgageAmount("");
    setMortgageTerm("");
    setInterestRate("");
    setMortgageType("");
    setMonthlyPayment("");
  };
  const getErrorForField = (fieldId) => {
    const error = errors.find((error) => error.id === fieldId);
    return error ? <p className="error-text">{error.msg}</p> : null;
  };
  const getInputClass = (fieldId) => {
    return errors.some((error) => error.id === fieldId) ? 'input-error' : '';
  };
  return (
    <>
      <div className="container">
        <div className="main">
          <div className="content">
            <div className="data-input">
              <div className="form-container">
                <div className="header">
                  <h2>Mortgage Calculator</h2>
                  <button className="clear-button" onClick={clearAllFields}>
                    Clear All
                  </button>
                </div>
                <div className="form-group">
                  <label>Mortgage Amount</label>
                  <div className={`input-group ${getInputClass("mortgageAmount")}`}>
                    <span>£</span>
                    <input
                      id="mortgageAmount"
                      type="number"
                      value={mortgageAmount}
                      onChange={(e) => setMortgageAmount(e.target.value)}
                    />
                  </div>
                    {getErrorForField("mortgageAmount")}
                </div>
                <div
                  className=""
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="form-group" style={{ marginRight: '8px' }}>
                    <label>Mortgage Term</label>
                    <div className={`input-group ${getInputClass("mortgageAmount")}`}>
                      <input
                        id="mortgageTerm"
                        type="number"
                        value={mortgageTerm}
                        onChange={(e) => setMortgageTerm(e.target.value)}
                      />
                      <span>years</span>
                    </div>
                    {getErrorForField("mortgageTerm")}
                  </div>
                  <div className="form-group">
                    <label>Interest Rate</label>
                    <div className={`input-group ${getInputClass("mortgageAmount")}`}>
                      <input
                        id="interestRate"
                        type="number"
                        step="0.01"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                      />
                      <span>%</span>
                    </div>
                    {getErrorForField("interestRate")}
                  </div>
                </div>
                <div className="form-group">
                  <label>Mortgage Type</label>
                  <div className="radio-group" id="mortgageType">
                    <div className="mortgage-type">
                      <label>
                        <input                        
                          type="radio"
                          value="repayment"
                          checked={mortgageType === "repayment"}
                          onChange={(e) => setMortgageType(e.target.value)}
                        />
                        &nbsp;Repayment
                      </label>
                    </div>
                    <div className="mortgage-type">
                      <label>
                        <input
                          type="radio"
                          value="interest-only"
                          checked={mortgageType === "interest-only"}
                          onChange={(e) => setMortgageType(e.target.value)}
                        />
                        &nbsp;Interest Only
                      </label>
                    </div>
                  </div>
                  {getErrorForField("mortgageType")}
                </div>
                <button
                  className="calculate-button"
                  onClick={calculateRepayments}
                >
                  <img
                    src={"./images/icon-calculator.svg"}
                    alt=""
                    style={{ width: "20px", height: "20px" }}
                  />
                  &nbsp;&nbsp;Calculate Repayments
                </button>
              </div>
            </div>
            <div className="data-display">
              {monthlyPayment > 0 ? (
                <div className="data-display-container">
                  <h2>Your results</h2>
                  <p>
                    Your results are shown below based on the information you
                    provided. To adjust the results, edit the form and click
                    "calculate repayments" again.
                  </p>
                  <div className="results">
                      <p>Your monthly repayments</p>
                      <h1>£{monthlyPayment}</h1>
                      <hr/>
                      <p>Total you'll repay over the term</p>
                      <h2>£{monthlyPayment * mortgageTerm}</h2>
                  </div>               
                </div>
              ) : (
                <div className="no-results">
                  <img src={"./images/illustration-empty.svg"} alt="" />
                  <h2>Results shown here</h2>
                  <p>
                    Complete the form and click "calculate repayments" to see
                    what your monthly repayments would be.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
