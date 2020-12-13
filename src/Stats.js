import React, { useState, useEffect } from "react";
import axios from "axios";
import StatsRow from "./StatsRow.js";
import { db } from "./firebase";
import "./Stats.css";

const BASE_URL = "https://finnhub.io/api/v1/quote/";
const TOKEN = "bvajgj748v6ser00c70g";

function Stats() {
  const [stockData, setStockData] = useState([]);
  const [mystockData, setmyStocks] = useState([]);

  const getMyStocks = () => {
    db.collection("myStocks").onSnapshot((snapshot) => {
      let promises = [];
      let tempData = [];
      snapshot.docs.map((doc) => {
        promises.push(
          getStocksData(doc.data().ticker).then((res) => {
            tempData.push({
              id: doc.id,
              data: doc.data(),
              info: res.data,
            });
          })
        );
        return tempData;
      });
      Promise.all(promises).then(() => {
        setmyStocks(tempData);
      });
    });
  };

  useEffect(getMyStocks, []);

  const getStocksData = (stock) => {
    return axios
      .get(`${BASE_URL}?symbol=${stock}&token=${TOKEN}`)
      .catch((error) => {
        console.error("Error", error.message);
      });
  };

  useEffect(() => {
    let tempStocksData = [];
    const stocksList = [
      "AAPL",
      "MSFT",
      "TSLA",
      "FB",
      "DASH",
      "GOOGL",
      "ABNB",
      "AMZN",
    ];
    let promises = [];
    stocksList.map((stock) => {
      promises.push(
        getStocksData(stock).then((res) => {
          tempStocksData.push({
            name: stock,
            ...res.data,
          });
        })
      );
      return tempStocksData;
    });

    Promise.all(promises).then(() => {
      setStockData(tempStocksData);
    });
  }, []);

  return (
    <div className="stats">
      <div className="stats__container">
        <div className="stats__header">
          <p>Stocks</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows">
            {mystockData.map((stock) => (
              <StatsRow
                key={stock.data.ticker}
                name={stock.data.ticker}
                openPrice={stock.info.o}
                shares={stock.data.shares}
                price={stock.info.c}
              />
            ))}
          </div>
        </div>
        <div className="stats__header stats__lists">
          <p>Watch List</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows">
            {stockData.map((stock) => (
              <StatsRow
                key={stock.name}
                name={stock.name}
                openPrice={stock.o}
                price={stock.c}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
