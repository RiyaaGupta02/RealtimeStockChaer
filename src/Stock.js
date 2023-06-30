import React from "react";
import Plot from "react-plotly.js";

//implementing stock class here
class Stock extends React.Component {
  //constructor for saving states of stocks
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: []
      //values for when creating chart so adding these values so API call raising n making chart
      //values for storing the x & y values n showing it later
    };
  }

  componentDidMount() {
    this.fetchStock(); //fetching API
  }

  fetchStock() {
    const pointerToThis = this;
    console.log(pointerToThis);
    const API_KEY = "EALSBAABR97FP1X1"; //API key of our own generated & accessed to bring the data
    let StockSymbol = "IBM"; //company for which showing chart based on its performance from historical dataset
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=compact&apikey=$API_Key`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];
    //specifying here like this gonna run this func for every one, placing the stock Chart values

    fetch(API_Call) //fetching the API call
      .then(function (response) {
        return response.json();
      }) //fetched data returned in json form n then getting data in variable form
      .then(function (data) {
        console.log(data);

        //showing here the time series dataset  shows acc to the time
        for (var key in data["Time Series (Daily)"]) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(
            data["Time Series (Daily)"][key]["1. open"]
          ); //1.open to use the key specifically
        }

        // console.log(stockChartXValuesFunction);
        pointerToThis.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction //extra values functions of X & Y
        });
      });
  }

  render() {
    //rendering here
    return (
      <div>
        <h1>Stock Market</h1>
        <Plot
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "red" }
            }
          ]}
          layout={{ width: 720, height: 440, title: "IBM Chart" }} //designing n giving the UI of plot and how the markers will work for the,
        />
      </div>
    );
  }
}

export default Stock;
