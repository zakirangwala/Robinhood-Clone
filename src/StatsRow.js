import React from "react";
import StockChart from "./stock.svg";
import numeral from "numeral";
import "./StatsRow.css";

function StatsRow(props) {
  const percentage = ((props.price - props.openPrice) / props.openPrice) * 100;
  var sign = "";
  var price = 0;
  if (percentage > 0) {
    sign = "+";
  }
  if (props.shares !== undefined) {
    price = props.price * props.shares;
  } else {
    price = props.price;
  }
  return (
    <div className="row">
      <div className="row__intro">
        <h1>{props.name}</h1>
        <p>{props.shares && props.shares + " shares"}</p>
      </div>
      <div className="row__chart">
        <img src={StockChart} height={16} alt="" />
      </div>
      <div className="row__numbers">
        <p className="row__price">${numeral(price).format()}</p>
        <p className="row__percentage">
          {sign}
          {Number(percentage).toFixed(2)}%
        </p>
      </div>
    </div>
  );
}

export default StatsRow;
