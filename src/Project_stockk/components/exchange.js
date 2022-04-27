import { Grid, Cell} from 'react-mdl';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { Component } from 'react';
import CanvasJSReact1 from './canvasjs.react';

var CanvasJS = CanvasJSReact1.CanvasJS;
var CanvasJSChart = CanvasJSReact1.CanvasJSChart;

class Exchange extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
    this.state = { users: [] };
    this.state.activeTab = 0;

    fetch('http://localhost:3015/exchange')
      .then(response => response.json())
      .then(users => (this.setState({ users }))
      )
  }

  toggleCategories() {
    const options = {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: ""
      },
      axisY: {
        title: "หน่วย (ดอลลาร์$)"
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
        name: "ค่าเงิน ยูโร",
        showInLegend: false,
        yValueFormatString: "$###0.00",
        xValueFormatString: "DD/MM/YY",
        dataPoints: this.state.users.map(user => {
          return { x: new Date(user.Date), y: user.EUR }
        })
      }]
    };
    /*---------------------------------------------------------------------*/
    const options1 = {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: ""
      },
      axisY: {
        title: "หน่วย (ดอลลาร์$)"
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
        name: "ค่าเงิน หยวน",
        showInLegend: false,
        yValueFormatString: "$###0.00",
        xValueFormatString: "DD/MM/YY",
        dataPoints: this.state.users.map(user => {
          return { x: new Date(user.Date), y: user.CHF }
        })
      }]
    };
    /*---------------------------------------------------------------------*/
    const options2 = {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: ""
      },
      axisY: {
        title: "หน่วย (ดอลลาร์$)"
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
        name: "ค่าเงิน เยน",
        showInLegend: false,
        yValueFormatString: "$###0.00",
        xValueFormatString: "DD/MM/YY",
        dataPoints: this.state.users.map(user => {
          return { x: new Date(user.Date), y: user.JPY }
        })
      }]
    };
    
    /*---------------------------------------------------------------------*/
    const options3 = {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: ""
      },
      axisY: {
        title: "หน่วย (ดอลลาร์$)"
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
        name: "ค่าเงิน ดอลลาร์แคนาดา",
        showInLegend: false,
        yValueFormatString: "$###0.00",
        xValueFormatString: "DD/MM/YY",
        dataPoints: this.state.users.map(user => {
          return { x: new Date(user.Date), y: user.CAD }
        })
      }]
    };
    /*---------------------------------------------------------------------*/
    const options4 = {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: ""
      },
      axisY: {
        title: "หน่วย (ดอลลาร์$)"
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
        name: "ค่าเงิน ปอนด์สเตอร์ลิง",
        showInLegend: false,
        yValueFormatString: "$###0.00",
        xValueFormatString: "DD/MM/YY",
        dataPoints: this.state.users.map(user => {
          return { x: new Date(user.Date), y: user.GBP }
        })
      }]
    };
    /*---------------------------------------------------------------------*/
    const options5 = {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: ""
      },
      axisY: {
        title: "หน่วย (ดอลลาร์$)"
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
        name: "ค่าเงิน ดอลลาร์ออสเตรเลีย",
        showInLegend: false,
        yValueFormatString: "$###0.00",
        xValueFormatString: "DD/MM/YY",
        dataPoints: this.state.users.map(user => {
          return { x: new Date(user.Date), y: user.AUD }
        })
      }]
    };
    /*---------------------------------------------------------------------*/
    const options6 = {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: ""
      },
      axisY: {
        title: "หน่วย (ดอลลาร์$)"
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
        name: "ค่าเงิน ดอลลาร์นิวซีแลนด์",
        showInLegend: false,
        yValueFormatString: "$###0.00",
        xValueFormatString: "DD/MM/YY",
        dataPoints: this.state.users.map(user => {
          return { x: new Date(user.Date), y: user.NZD }
        })
      }]
    };
    /*---------------------------------------------------------------------*/

    if (this.state.activeTab === 0) {
      return (

        <div className="app">
          <CanvasJSChart options={options}
            onRef={ref => this.chart = ref}
          />
        </div>

      )
    } else if (this.state.activeTab === 1) {
      return (
        <div className="app">
          <CanvasJSChart options={options1}
            onRef={ref => this.chart = ref}
          />
        </div>
      )
    } else if (this.state.activeTab === 2) {
      return (
        <div className="app">
          <CanvasJSChart options={options2}
            onRef={ref => this.chart = ref}
          />
        </div>
      )
    } else if (this.state.activeTab === 3) {
      return (
        <div className="app">
          <CanvasJSChart options={options3}
            onRef={ref => this.chart = ref}
          />
        </div>
      )
    } else if (this.state.activeTab === 4) {
      return (
        <div className="app">
          <CanvasJSChart options={options4}
            onRef={ref => this.chart = ref}
          />
        </div>
      )
    } else if (this.state.activeTab === 5) {
      return (
        <div className="app">
          <CanvasJSChart options={options5}
            onRef={ref => this.chart = ref}
          />
        </div>
      )
    } else if (this.state.activeTab === 6) {
      return (
        <div className="app">
          <CanvasJSChart options={options6}
            onRef={ref => this.chart = ref}
          />
        </div>
      )
    } 
  }



  render() {

    return (
      <div>
        {/* <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
          <Tab>EUR</Tab>
          <Tab>CHF</Tab>
          <Tab>JPY</Tab>
          <Tab>GBP</Tab>
          <Tab>CAD</Tab>
          <Tab>AUD</Tab>
          <Tab>NZD</Tab>
        </Tabs> */}

        <Tabs
            value={this.state.activeTab}
            variant="scrollable"
            indicatorColor="secondary"
            textColor="secondary"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
            size='small'
        >
            <Tab label="EUR" onClick={()=> this.setState({ activeTab: 0 })}/>
            <Tab label="CHF" onClick={()=> this.setState({ activeTab: 1 })}/>
            <Tab label="JPY" onClick={()=> this.setState({ activeTab: 2 })}/>
            <Tab label="GBP" onClick={()=> this.setState({ activeTab: 3 })}/>
            <Tab label="CAD" onClick={()=> this.setState({ activeTab: 4 })}/>
            <Tab label="AUD" onClick={()=> this.setState({ activeTab: 5 })}/>
            <Tab label="NZD" onClick={()=> this.setState({ activeTab: 6 })}/>
        </Tabs>

        <Grid>
          <Cell col={12}>
            <div className="content">{this.toggleCategories()}</div>
          </Cell>
        </Grid>


      </div>
    )
  }
}

export default Exchange;