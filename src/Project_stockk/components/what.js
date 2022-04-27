// import { Tabs, Tab, Grid, Cell, Card, CardTitle, CardText, CardActions, Button, CardMenu, IconButton } from 'react-mdl';
// import React, { Component } from 'react';
// import ReactHighcharts from "react-highcharts";
// import News from './newspage';
// import Mainstock from './mainstock'

// class A2 extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { activeTab: 0 };
//     this.state = { users: [] };
//     this.state.activeTab = 0;

//     fetch('http://203.154.83.54:8800/exchange')
//       .then(response => response.json())
//       .then(users => (this.setState({ users }))
//       )
//   }

//   toggleCategories() {
//     const config = {
//       chart: {
//         type: 'spline'
//       },
//       title: {
//         text: 'EUR chart'
//       },
//       series: [

//         {
//           "id": "eur", "name": "EUR", "data": this.state.users.map(user => user.EUR),
//         },

//       ]
//     };
//     /*------------------------------------------------------------*/
//     const config1 = {
//       chart: {
//         type: 'spline'
//       },
//       title: {
//         text: 'EUR chart'
//       },
//       series: [

//         {
//           "id": "eur", "name": "EUR", "data": this.state.users.map(user => user.EUR),
//         },

//       ]
//     };
//     /*------------------------------------------------------------*/
//     const config2 = {
//       chart: {
//         type: 'spline'
//       },
//       title: {
//         text: 'EUR chart'
//       },
//       series: [

//         {
//           "id": "eur", "name": "EUR", "data": this.state.users.map(user => user.EUR),
//         },

//       ]
//     };
//     /*------------------------------------------------------------*/
//     const config3 = {
//       chart: {
//         type: 'spline'
//       },
//       title: {
//         text: 'EUR chart'
//       },
//       series: [

//         {
//           "id": "eur", "name": "EUR", "data": this.state.users.map(user => user.EUR),
//         },

//       ]
//     };
//     /*--------------------------------------------------------------*/
//     const config4 = {
//       chart: {
//         type: 'spline'
//       },
//       title: {
//         text: 'EUR chart'
//       },
//       series: [
//         {
//           "id": "chf", "name": "CHF", "data": this.state.users.map(user => user.CHF)

//         },
//         {
//           "id": "eur", "name": "EUR", "data": this.state.users.map(user => user.EUR),
//         },
//         {
//           "id": "usd", "name": "USD", "data": this.state.users.map(user => user.USD),
//         },
//         {
//           "id": "aud", "name": "AUD", "data": this.state.users.map(user => user.AUD),
//         },


//       ]
//     };

//     if (this.state.activeTab === 0) {
//       return (

//         <div className="app">
//           <ReactHighcharts config={config}></ReactHighcharts>
//         </div>

//       )
//     } else if (this.state.activeTab === 1) {
//       return (
//         <div className="app">
//           <ReactHighcharts config={config1}></ReactHighcharts>
//         </div>
//       )
//     } else if (this.state.activeTab === 2) {
//       return (
//         <div className="app">
//           <ReactHighcharts config={config2}></ReactHighcharts>
//         </div>
//       )
//     } else if (this.state.activeTab === 3) {
//       return (
//         <div className="app">
//           <ReactHighcharts config={config3}></ReactHighcharts>
//         </div>
//       )
//     }

//   }



//   render() {

//     return (
//       <div>
//         <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
//           <Tab>WEEK</Tab>
//           <Tab>MONT</Tab>
//           <Tab>QUARTER</Tab>
//           <Tab>YEAR</Tab>
//         </Tabs>


//         <Grid>
//           <Cell col={12}>
//             <div className="content">{this.toggleCategories()}</div>
//           </Cell>
//           <Grid item xs={12}>
//             <Card style={{ borderRadius: 10, width: 800, background: "#ecf0f1", color: "#Black", float: "right", overflowY: "scroll", height: 800 }}>
              
//               <News></News>
//             </Card>
//           </Grid>
//         </Grid>
//         <div>
//         <Mainstock></Mainstock>
//         </div>
        


//       </div>
//     )
//   }
// }

// export default A2;

import React, { Component } from 'react';
import { Pie , Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import Mainstock from './mainstock'
import ReactHighcharts from "react-highcharts";


class Projects2 extends Component {

  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
    this.state.activeTab = 0;
    this.state = { detail: [],information: [],stockcost: [],stocktop10: []};

    fetch('http://203.154.83.54:8800/detail')
      .then(response => response.json())
      .then(detail => (this.setState({ detail }))
      )
    fetch('http://203.154.83.54:8800/information')
      .then(response => response.json())
      .then(information => (this.setState({ information }))
      )
    fetch('http://203.154.83.54:8800/stockcost')
      .then(response => response.json())
      .then(stockcost => (this.setState({ stockcost }))
      )
    fetch('http://203.154.83.54:8800/stocktop10')
      .then(response => response.json())
      .then(stocktop10 => (this.setState({ stocktop10 }))
      )
  }

  statea = {
    dataPie: {
      labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
      datasets: [
        {
          data: [300, 50, 100, 40, 120],
          backgroundColor: [
            "#F7464A",
            "#46BFBD",
            "#FDB45C",
            "#949FB1",
            "#4D5360",
            "#AC64AD"
          ],
          hoverBackgroundColor: [
            "#FF5A5E",
            "#5AD3D1",
            "#FFC870",
            "#A8B3C5",
            "#616774",
            "#DA92DB"
          ]
        }
      ]
    }
  }

  stateb = {
    dataBar: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "% of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 134,159,0.4)",
            "rgba(98,  182, 239,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(113, 205, 205,0.4)",
            "rgba(170, 128, 252,0.4)",
            "rgba(255, 177, 101,0.4)"
          ],
          borderWidth: 2,
          borderColor: [
            "rgba(255, 134, 159, 1)",
            "rgba(98,  182, 239, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(113, 205, 205, 1)",
            "rgba(170, 128, 252, 1)",
            "rgba(255, 177, 101, 1)"
          ]
        }
      ]
    },
  }
  
  render() {
    const config = {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'chart'
      },
      xAxis: {
        type: 'year'
        
      },
      series: [
        {
          data: this.state.stockcost.map(stockcosts => stockcosts.Total_assets),
          pointStart: 2016 // first of April 
        }
      ]
    };
    return (
      <div class="">    
        <div class="text-center p-2" style={{background: "#ecf0f1" , height: 100}}>
          <h1 style={{ fontSize: "50px", color: "black" }}>PTT</h1>
          <h1 style={{ fontSize: "20px"}}>บริษัท ปตท. จำกัด (มหาชน)</h1>
        </div>      
        <div class="row justify-content-end">
          <input style={{width: 400,  height: 60 , background: "#fffbfa"}} type="text" class="form-control" placeholder="search" aria-label="Username" aria-describedby="addon-wrapping"/>
        </div>
        <div class="row bg-red">
          <div class="col-6">
            <div class="p-3 border">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">ลักษณะธุรกิจ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {this.state.detail.map(details =>
                        <tr>
                          <td>{details.Detail}</td>
                        </tr>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-6">
            <div class="p-3 border">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">ข้อมูลเบื้องต้น</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {this.state.information.map(informations =>
                        <tr>
                          <td>{informations.Name}</td>
                          <td>{informations.Address}</td>
                          <td>{informations.Phone_number}</td>
                          <td>{informations.Fax_number}</td>
                          <td>{informations.URL}</td>
                          <td>{informations.Dateofestablishment}</td>
                          <td>{informations.IPO_Financial_Advisor}</td>
                        </tr>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-6">
            <ReactHighcharts config={config}></ReactHighcharts>    
          </div>
          <div class="col-6">
            <div class="p-3 border">
              <Mainstock></Mainstock>
            </div>
          </div>
          <div class="col-6">
            <MDBContainer>
              <h3 className="mt-5">Pie chart</h3>
              <Pie data={this.statea.dataPie} />
            </MDBContainer>
          </div>
          <div class="col-6">
            <MDBContainer>
              <h3 className="mt-5">Bar chart</h3>
              <Bar data={this.stateb.dataBar} options={this.stateb.barChartOptions} />
            </MDBContainer>
          </div>
          
        </div>
      </div>
    )
  }
}

export default Projects2;
