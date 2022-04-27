import React from "react";
import { render } from "react-dom";
// Import Highcharts
import Highcharts from "highcharts/highstock";
//import HighchartsReact from "./HighchartsReact.js";
import PieChart from "highcharts-react-official";

const options = {
  chart: {
    type: "pie"
  },
  series: [
    {
      data: [
        {
          y: 100
        },
        {
          y: 50
        }
      ]
    }
  ]
};

class Pie extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Highcharts</h2>
        <PieChart highcharts={Highcharts} options={options} />
      </div>
    );
  }
}

render(<Pie />, document.getElementById("root"));
