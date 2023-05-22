const loanInput = document.querySelector(".loan-amount");
const tenureInput = document.querySelector(".loan-tenure");
const rateInput = document.querySelector(".interest-rate");
const calculateButton = document.querySelector(".calc-btn");
const loanEmiValue = document.querySelector(".loan-emi .value");
const totalInterestValue = document.querySelector(".total-interest .value");
const totalValue = document.querySelector(".total-amount .value");

let loanAmount = parseFloat(loanInput.value);
let loanTenure = parseFloat(tenureInput.value);
let interestRate = parseFloat(rateInput.value);

let interest = interestRate / 12 / 100;

const refreshInputValues = () => {
  loanAmount = parseFloat(loanInput.value);
  loanTenure = parseFloat(tenureInput.value);
  interestRate = parseFloat(rateInput.value);

  interest = interestRate / 12 / 100;
};
const checkValues = () => {
  let loanAmountValue = loanInput.value;
  let interestRateValue = rateInput.value;
  let loanTenureValue = tenureInput.value;

  let regexNumber = /^[0-9]+$/;
  if (!loanAmountValue.match(regexNumber)) {
    loanInput.value = "10000";
  }

  if (!loanTenureValue.match(regexNumber)) {
    tenureInput.value = "12";
  }

  let regexDecimalNumber = /^(\d*\.)?\d+$/;
  if (!interestRateValue.match(regexDecimalNumber)) {
    rateInput.value = "7.5";
  }
};

let LoanChart;

const displayChart = (totalInterestValue, loanAmount) => {
  const ctx = document.getElementById("myChart");
  LoanChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Total Interest", "Principial Loan Amount"],
      datasets: [
        {
          data: [totalInterestValue, loanAmount],
          borderWidth: 0,
          backgroundColor: ["#e63946", " #14213d"],
          borderColor: [],
        },
      ],
    },
  });
};
const updateChart = (totalInterestValue, loanAmount) => {
  LoanChart.data.datasets[0].data[0] = totalInterestValue;
  LoanChart.data.datasets[0].data[1] = loanAmount;
  LoanChart.update();
};

const calculateEmi = () => {
  checkValues();
  refreshInputValues();
  let Emi =
    loanAmount *
    interest *
    (Math.pow(1 + interest, loanTenure) /
      (Math.pow(1 + interest, loanTenure) - 1));
  return Emi;
};
const updateData = (Emi) => {
  loanEmiValue.innerHTML = Math.round(Emi);

  let totalAmount = Math.round(Emi * loanTenure);
  totalValue.innerHTML = totalAmount;

  let totalInterestPayable = Math.round(totalAmount - loanAmount);
  totalInterestValue.innerHTML = totalInterestPayable;

  if (LoanChart) {
    updateChart(totalInterestPayable, loanAmount);
  } else {
    displayChart(totalInterestPayable, loanAmount);
  }
};
const init = () => {
  let emi = calculateEmi();
  updateData(emi);
};
init();

calculateButton.addEventListener("click", init);
