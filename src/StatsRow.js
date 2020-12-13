import React from "react";
import StockChart_decrease from "./stock.svg";
import StockChart_increase from "./stock2.svg";
import numeral from "numeral";
import { db } from "./firebase";
import "./StatsRow.css";

function StatsRow(props) {
  const percentage = ((props.price - props.openPrice) / props.openPrice) * 100;

  const buyStock = () => {
    db.collection("myStocks")
      .where("ticker", "==", props.name)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach(function (doc) {
            db.collection("myStocks")
              .doc(doc.id)
              .update({
                shares: (doc.data().shares += 1),
              });
          });
        } else {
          db.collection("myStocks").add({
            ticker: props.name,
            shares: 1,
          });
        }
      });
  };

  var StockChart = null;
  if (percentage > 0) {
    StockChart = StockChart_increase;
  } else {
    StockChart = StockChart_decrease;
  }

  var sign = "";
  if (percentage > 0) {
    sign = "+";
  }

  var price = 0;
  if (props.shares !== undefined) {
    price = props.price * props.shares;
  } else {
    price = props.price;
  }

  return (
    <div className="row" onClick={buyStock}>
      <div className="row__intro">
        <h1>{props.name}</h1>
        <p>{props.shares && props.shares + " shares"}</p>
      </div>
      <div className="row__chart">
        <img src={StockChart} height={16} alt="" />
      </div>
      <div className="row__numbers">
        <p className="row__price">${numeral(price).format("0,0.00")}</p>
        <p className="row__percentage">
          {sign}
          {Number(percentage).toFixed(2)}%
        </p>
      </div>
    </div>
  );
}

export default StatsRow;
