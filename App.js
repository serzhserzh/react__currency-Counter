import { React, useState, useEffect, useRef } from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [fromCurrency, setFromCurrency] = useState("RUB");
  const [toCurrency, setToCurrency] = useState("USD");

  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);

  //const [currencies, setcurrencies] = useState({});
  const currenciesRef = useRef({});

  const onChangeFromPrice = (value, cur) => {
    const result =
      (value * currenciesRef.current[cur].Value) /
      currenciesRef.current[toCurrency].Value;
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  };

  const onChangeToPrice = (value, cur) => {
    const result =
      (value / currenciesRef.current[fromCurrency].Value) *
      currenciesRef.current[cur].Value;
    setFromPrice(result.toFixed(3));
    setToPrice(value);
  };

  useEffect(() => {
    fetch("https://www.cbr-xml-daily.ru/daily_json.js")
      .then((res) => res.json())
      .then((json) => {
        json.Valute.RUB = { Value: 1 };
        // setcurrencies(json.Valute);
        currenciesRef.current = json.Valute;
        onChangeToPrice(1, "USD");
      })
      .catch((err) => {
        console.warn(err);
        alert("Не получилось получить данные");
      });
  }, []);

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
