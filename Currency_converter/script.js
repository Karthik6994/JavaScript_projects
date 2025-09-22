const fromCurrency = document.getElementById("from");
const toCurrency = document.getElementById("to");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convert");
const swapBtn = document.getElementById("swap");

const API_URL = "https://api.frankfurter.app/currencies";

async function loadCurrencies() {
  const res = await fetch(API_URL);
  const data = await res.json();

  Object.keys(data).forEach(code => {
    let option1 = new Option(code, code);
    let option2 = new Option(code, code);

    fromCurrency.add(option1);
    toCurrency.add(option2);
  });

  fromCurrency.value = "USD";
  toCurrency.value = "INR";
}

async function convertCurrency() {
  let amt = amount.value;
  let from = fromCurrency.value;
  let to = toCurrency.value;

  if (from === to) {
    result.innerText = `${amt} ${from} = ${amt} ${to}`;
    return;
  }

  const res = await fetch(
    `https://api.frankfurter.app/latest?amount=${amt}&from=${from}&to=${to}`
  );
  const data = await res.json();
  result.innerText = `${amt} ${from} = ${data.rates[to]} ${to}`;
}

swapBtn.addEventListener("click", () => {
  let temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
});

convertBtn.addEventListener("click", convertCurrency);

loadCurrencies();
