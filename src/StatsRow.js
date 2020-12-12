import React from "react";
import StockChart from "./stock.svg"
import './StatsRow.css'

function StatsRow(props) {
  return (
    <div className="row">
      <div className="row__intro">
        <h1>{props.name}</h1>
        <p>{props.shares && 
          (props.shares + " shares")
        }</p>
      </div>
      <div className="row__chart">
        <img src={StockChart} height={16} alt=""/>
      </div>
      <div className="row__numbers">
        <p className="row__price">${props.price}</p>
        <p className="row__percentage">200%</p>
        {/* <p className="row__percentage"> +{Number(percentage).toFixed(2)}%</p> */}
      </div>
    </div>
  );
}

export default StatsRow;
