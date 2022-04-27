import { Tabs, Tab, Grid, Cell, Card, CardTitle, CardText, CardActions, Button, CardMenu, IconButton } from 'react-mdl';
import React, { Component } from 'react';
import ReactHighcharts from "react-highcharts";
import CanvasJSReact1 from './canvasjs.react';
var CanvasJS = CanvasJSReact1.CanvasJS;
var CanvasJSChart = CanvasJSReact1.CanvasJSChart;

class Policy extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
    this.state = { Policy: [],Policysu: [] };

    fetch('http://localhost:3015/policy1')
      .then(response => response.json())
      .then(Policy => (this.setState({ Policy }))
      )
  }

  render() {
    const options = {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: ""
      },
      axisY: {
        title: "Policy Rate"
      },
      axisX: {
        labelFormatter: function (a) {
          return CanvasJS.formatDate(a.value, "MMM YYYY");
        }
      },
      toolTip: {
        shared: true
      },
      legend: {
        verticalAlign: "center",
        horizontalAlign: "right",
        reversed: true,
        cursor: "pointer",
        itemclick: this.toggleDataSeries
      },
      data: [{
        type: "stackedArea",
        name: "Policy Rate",
        showInLegend: false,
        yValueFormatString: "###0.00",
        xValueFormatString: "DD/MM/YY",
        dataPoints: this.state.Policy.map(user => {
          return { x: new Date(user.Date), y: user.DataPolicyRate }
        })
      }]
    };
    return (
      <div>
        <Card style={{ borderRadius: 10, width: 700, height: 450, overflowY: "scroll" }}>
          <CanvasJSChart options={options}
            onRef={ref => this.chart = ref}
          />
        </Card>
      </div>
    )
  };
} 
export default Policy;

// import { Tabs, Tab, Grid, Cell, Card, CardTitle, CardText, CardActions, Button, CardMenu, IconButton } from 'react-mdl';
// import React, { Component } from 'react';
// import ReactHighcharts from "react-highcharts";
// var CanvasJS = CanvasJSReact1.CanvasJS;
// var CanvasJSChart = CanvasJSReact1.CanvasJSChart;
// class Policy extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { activeTab: 0 };
//     this.state = { Policy: [],Policysu: [] };

//     fetch('http://119.59.100.61:8800/policy1')
//       .then(response => response.json())
//       .then(Policy => (this.setState({ Policy }))
//       )
//   }

//   render() {
    
//     const config = {
//       chart: {
//         type: 'spline'
//       },
//       title: {
//         text: 'Policy Rate'
//       },
//       xAxis: {
//         type: 'text',
//         labels: [""]
//       },
//       series: [
//         {
//           data: this.state.Policy.map(policy=> policy.DataPolicyRate),
//         }
//       ]
//     };
//     return (
//       <div>
//         <Card style={{ borderRadius: 10, width: 570, height: 370, overflowY: "scroll" }}>
//           <ReactHighcharts config={config}></ReactHighcharts>
//         </Card>
//       </div>
//     )
//   };
// } 
// export default Policy;