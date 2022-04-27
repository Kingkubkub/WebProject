
 import React, { Component } from 'react';
 import { Card, Tabs, Tab, Grid, Cell } from 'react-mdl';
 import CanvasJSReact1 from './canvasjs.react';
 import CanvasJSReact from './canvasjs.stock.react';
 import { MDBListGroup, MDBListGroupItem,MDBBadge,MDBCol} from "mdbreact";
 import moment from "moment";
 import 'moment-timezone';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact1.CanvasJSChart;
 class Projects2 extends Component {
 
   constructor(props) {
     super(props);
     this.state = { activeTab: 0,activeTab2: 0 };
     this.state = {
       term: '',
       top10: '',
       top: '',
       e: '',
       top10s: '',
       isSearch: false,
       isLoaded: false
     }
     this.state = { detail: [], information: [], stockcost: [], stocktop10: [], test: [], stockful: [], top10s: []
                  , stocknews: [], item: [] ,stockfactsheet: [],top10big: [],datanew: [],stocknews2: [],timeimfor: [],stockcostyear: [],stockcostquarter: []};
     this.searchHandler = this.searchHandler.bind(this);
     this.searchstocktop10 = this.searchstocktop10.bind(this);
     this.callAPI = this.callAPI.bind(this);
     this.toggleDataSeries = this.toggleDataSeries.bind(this);
     this.onClick = this.onClick.bind(this);
     let stockful = 'http://localhost:3015/stockful/' +  this.props.match.params.id;
     fetch(stockful)
       .then(response => response.json())
       .then(stockful => (this.setState({ stockful }))
       )
     let detail = 'http://localhost:3015/detail/' +  this.props.match.params.id;
     fetch(detail)
       .then(response => response.json())
       .then(detail => (this.setState({ detail }))
       )
     let stocktop10 = 'http://localhost:3015/stocktop10/' +  this.props.match.params.id;
     fetch(stocktop10)
       .then(response => response.json())
       .then(stocktop10 => (this.setState({ stocktop10 }))
       )
     let information = 'http://localhost:3015/information/' +  this.props.match.params.id;
     fetch(information)
       .then(response => response.json())
       .then(information => (this.setState({ information }))
       )
      let stockcostyear = 'http://localhost:3015/stockcostyear/' + this.props.match.params.id;
      fetch(stockcostyear)
        .then(response => response.json())
        .then(stockcostyear => (this.setState({ stockcostyear }))
        )
      let stockcostquarter = 'http://localhost:3015/stockcostquarter/' + this.props.match.params.id;
      fetch(stockcostquarter)
        .then(response => response.json())
        .then(stockcostquarter => (this.setState({ stockcostquarter }))
         )
     let stocknews = 'http://localhost:3015/stocknewstag/' +  this.props.match.params.id;
     fetch(stocknews)
       .then(response => response.json())
       .then(stocknews => (this.setState({ stocknews,isLoaded: true}))
       )
     let stockfactsheet = 'http://localhost:3015/stockfactsheet/' +  this.props.match.params.id;
     fetch(stockfactsheet)
       .then(response => response.json())
       .then(stockfactsheet => (this.setState({ stockfactsheet }))
       )
     let stocknews2 = 'http://localhost:3015/stocknews/' + this.props.match.params.id;
     fetch(stocknews2)
       .then(response => response.json())
       .then(stocknews2 => (this.setState({ stocknews2 }))
        )
      let timeimfor = 'http://localhost:3015/timeimfor' ;
      fetch(timeimfor)
        .then(response => response.json())
        .then(timeimfor => (this.setState({ timeimfor }))
        )
      this.setState({isSearch: true})
      this.state.activeTab = 0;
      this.state.activeTab2 = 0;
   }
   searchHandler(event) {
     this.setState({ term: event.target.value, /*isSearch: false*/ })
   }
   searchstocktop10(event) {
     this.setState({ top10: event.target.value, isSearch: false })
   }
   callAPI = () => {
     this.setState({isSearch: true})
   }
 
   toggleDataSeries(a) {
     if (typeof (a.dataSeries.visible) === "undefined" || a.dataSeries.visible) {
       a.dataSeries.visible = false;
     }
     else {
       a.dataSeries.visible = true;
     }
     this.chart.render();
   }
   clickMe(top) {
     console.log("big", top)
     let top10s = 'http://localhost:3015/stocktop10people/' + top.Namepeople;
     fetch(top10s)
       .then(response => response.json())
       .then(top10s => (this.setState({ top10s }))
       )
     this.setState({
       showOutputCard: true
     })
 
   }
   onClick(e) { 
    console.log("dataSeries =", e.dataPoint.x)
    let datanew = 'http://localhost:3015/stocknewstag2/' + (moment(e.dataPoint.x).format("YYYY-MM-DD")) +'/'+ this.props.match.params.id;
    fetch(datanew)
      .then(response => response.json())
      .then(datanew => (this.setState({ datanew }))
      )
    this.setState({
      showOutputCard: true
    })
    }
    
    toggleCategories() {
      const options = {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: true,
          title:{
            text: ""
          },
          axisX:{
            labelFormatter: function (a) {
              return CanvasJS.formatDate(a.value, "YYYY");
            },
            interval: 1,
            intervalType: "year"  
          },
          axisY:{
            title: "หน่วย (ล้านบาท)"
          },
          legend: {
            verticalAlign: "center",
            horizontalAlign: "right",
            reversed: true,
            cursor: "pointer",
            itemclick: this.toggleDataSeries
          },
          data: [
          {
            name: "สินทรัพย์รวม",
            type: "column",
            yValueFormatString: "#.####",
            showInLegend: true,
            dataPoints: this.state.stockcostyear.map(stockcosts => {
              return { x: new Date(stockcosts.Year), y: stockcosts.Total_Assets }
            })
          },
          {
            name: "หนี้สินรวม",
            type: "column",
            showInLegend: true,                  
            yValueFormatString: "#.####",
            dataPoints: this.state.stockcostyear.map(stockcosts => {
              return { x: new Date(stockcosts.Year), y: stockcosts.Total_Liabilities }
            })
          },
          {
            name: "ส่วนของผู้ถือหุ้นทั้งหมด",
            type: "column",
            showInLegend: true,                  
            yValueFormatString: "#.####",
            dataPoints: this.state.stockcostyear.map(stockcosts => {
              return { x: new Date(stockcosts.Year), y: stockcosts.Total_Equities }
            })
          },
          {
            name: "มูลค่าหุ้นที่ชำระแล้ว",
            type: "column",
            showInLegend: true,                  
            yValueFormatString: "#.####",
            dataPoints: this.state.stockcostyear.map(stockcosts => {
              return { x: new Date(stockcosts.Year), y: stockcosts.ValueOfPaidUpShares }
            })
          },
          {
            name: "รายได้ทั้งหมด",
            type: "column",
            showInLegend: true,                  
            yValueFormatString: "#.####",
            dataPoints: this.state.stockcostyear.map(stockcosts => {
              return { x: new Date(stockcosts.Year), y: stockcosts.Total_Income }
            })
          },
          {
            name: "กำไรสุทธิ",
            type: "column",
            showInLegend: true,                  
            yValueFormatString: "#.####",
            dataPoints: this.state.stockcostyear.map(stockcosts => {
              return { x: new Date(stockcosts.Year), y: stockcosts.Net_Profit }
            })
          },
        ]};
      /*---------------------------------------------------------------------*/
      const options1 = {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: true,
          title:{
            text: ""
          },
          axisX:{
            labelFormatter: function (a) {
              return CanvasJS.formatDate(a.value, "MMM YYYY");
            }
          },
          axisY:{
            title: "หน่วย (ล้านบาท)"
          },
          legend: {
            verticalAlign: "center",
            horizontalAlign: "right",
            reversed: true,
            cursor: "pointer",
            itemclick: this.toggleDataSeries
          },
          data: [
          {
            name: "สินทรัพย์รวม",
            type: "column",
            yValueFormatString: "#.####",
            showInLegend: true,
            dataPoints: this.state.stockcostquarter.map(stockcosts => {
              return { x: new Date(stockcosts.Year), y: stockcosts.Total_Assets }
            })
          },
          {
            name: "หนี้สินรวม",
            type: "column",
            showInLegend: true,                  
            yValueFormatString: "#.####",
            dataPoints: this.state.stockcostquarter.map(stockcosts => {
              return { x: new Date(stockcosts.Year), y: stockcosts.Total_Liabilities }
            })
          },
          {
            name: "ส่วนของผู้ถือหุ้นทั้งหมด",
            type: "column",
            showInLegend: true,                  
            yValueFormatString: "#.####",
            dataPoints: this.state.stockcostquarter.map(stockcosts => {
              return { x: new Date(stockcosts.Year), y: stockcosts.Total_Equities }
            })
          },
          {
            name: "มูลค่าหุ้นที่ชำระแล้ว",
            type: "column",
            showInLegend: true,                  
            yValueFormatString: "#.####",
            dataPoints: this.state.stockcostquarter.map(stockcosts => {
              return { x: new Date(stockcosts.Year), y: stockcosts.ValueOfPaidUpShares }
            })
          },
          {
            name: "รายได้ทั้งหมด",
            type: "column",
            showInLegend: true,                  
            yValueFormatString: "#.####",
            dataPoints: this.state.stockcostquarter.map(stockcosts => {
              return { x: new Date(stockcosts.Year), y: stockcosts.Total_Income }
            })
          },
          {
            name: "กำไรสุทธิ",
            type: "column",
            showInLegend: true,                  
            yValueFormatString: "#.####",
            dataPoints: this.state.stockcostquarter.map(stockcosts => {
              return { x: new Date(stockcosts.Year), y: stockcosts.Net_Profit }
            })
          },
        ]};
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
      } 
    }

    toggleCategories2() {
      var fish = this.state.stocknews
      var cat = this.state.stockful
      var stockup = []
      var stockin = []
      var stockdown = []
      var anw = []
      var anw2 = []
      var anw3 = []
      var countup = 0,countdown = 0,countin = 0
      this.state.stockful.forEach(function(key,index){
        var dog = fish.find(element => element.Date == key.Date)
        if (dog != null){
          // console.log("key ,",key.Close)
          // console.log("cat,",cat[index-1].Close)
          if(key.Close > cat[index-1].Close){
            anw = cat[index-1].Close - key.Close
            console.log("up ,",dog)
            stockup.push(dog)
            countup++
          }
          else if(key.Close < cat[index-1].Close){
            anw2 = cat[index-1].Close - key.Close
            console.log("down ,",dog)
            stockdown.push(dog)
            countdown++
          }
          else if(key.Close == cat[index-1].Close){
            anw3 = cat[index-1].Close - key.Close
            console.log("in ,",dog)
            stockin.push(dog)
            countin++
          }
          console.log("countup ,", countup)
          console.log("countdown ,", countdown)
          console.log("countin ,", countin)
          document.getElementById("countups").innerText = countup
          document.getElementById("countdowns").innerText = countdown
          document.getElementById("countins").innerText = countin
        }
      })
      // console.log('atomic =', this.state.stocknews.find(element => element.Date == "2021-02-02"))
      // console.log('atomic =', this.state.stockful.forEach(element => console.log(element) ))
      if (this.state.activeTab2 === 0) {
        return (
          <div className="app">       
            <div class="text-left">
              <h2 class="headername">
              </h2>
            </div>   
            <div>
              <MDBListGroup className="newsstock" style={{ width: "" }}>
                {stockup.map(item => (
                    <MDBListGroupItem style={{ width: "" ,backgroundColor: "#ecf0f1"}}>
                        <div className="d-flex w-100 justify-content-between">
                            <a className="mb-1" style={{ textDecoration: "none", color: "red", fontSize: 20}} href={item.URL_web} target="_blank">{item.Title}</a>
                        </div>
                        <div className="d-flex w-100 justify-content-between">
                          <div>
                            <MDBBadge color="primary" pill>วันที่-{(moment(item.Date).format("YYYY-MM-DD"))}</MDBBadge>{"  "}<small>•</small>{"  "}<small>infoquest</small>
                          </div>
                          <div>
                            <MDBBadge color="danger">{item.Tag1}</MDBBadge>{"  "}
                            <MDBBadge color="warning">{item.Tag2}</MDBBadge>{"  "}
                            <MDBBadge color="success">{item.Tag3}</MDBBadge>
                          </div>
                        </div>
                    </MDBListGroupItem>
                )).reverse()}
              </MDBListGroup>  
              <div className = "gallery"> 
                <center>
                  รอการอัพเดธข้อมูล...
                </center>
              </div>
            </div>  
          </div>     
        )
      } else if (this.state.activeTab2 === 1) {
        return (
          <div className="app"> 
            <div class="text-left">
              <h2 class="headername">
              </h2>
            </div>
            <div>
              <MDBListGroup className="newsstock" style={{ width: "" }}>
                {stockdown.map(item => (
                    <MDBListGroupItem style={{ width: "" ,backgroundColor: "#ecf0f1"}}>
                        <div className="d-flex w-100 justify-content-between">
                            <a className="mb-1" style={{ textDecoration: "none", color: "red", fontSize: 20}} href={item.URL_web} target="_blank">{item.Title}</a>
                        </div>
                        <div className="d-flex w-100 justify-content-between">
                          <div>
                            <MDBBadge color="primary" pill>วันที่-{(moment(item.Date).format("YYYY-MM-DD"))}</MDBBadge>{"  "}<small>•</small>{"  "}<small>infoquest</small>
                          </div>
                          <div>
                            <MDBBadge color="danger">{item.Tag1}</MDBBadge>{"  "}
                            <MDBBadge color="warning">{item.Tag2}</MDBBadge>{"  "}
                            <MDBBadge color="success">{item.Tag3}</MDBBadge>
                          </div>
                        </div>
                    </MDBListGroupItem>
                )).reverse()}
              </MDBListGroup>  
              <div className = "gallery"> 
                <center>
                  รอการอัพเดธข้อมูล...
                </center>
              </div>
            </div>
          </div>
        )
      } else if (this.state.activeTab2 === 2) {
        return (
          <div className="app">     
            <div class="text-left">
              <h2 class="headername">
              </h2>
            </div>
            <div>
              <MDBListGroup className="newsstock" style={{ width: "" }}>
                {stockin.map(item => (
                    <MDBListGroupItem style={{ width: "" ,backgroundColor: "#ecf0f1"}}>
                        <div className="d-flex w-100 justify-content-between">
                            <a className="mb-1" style={{ textDecoration: "none", color: "red", fontSize: 20}} href={item.URL_web} target="_blank">{item.Title}</a>
                        </div>
                        <div className="d-flex w-100 justify-content-between">
                          <div>
                            <MDBBadge color="primary" pill>วันที่-{(moment(item.Date).format("YYYY-MM-DD"))}</MDBBadge>{"  "}<small>•</small>{"  "}<small>infoquest</small>
                          </div>
                          <div>
                            <MDBBadge color="danger">{item.Tag1}</MDBBadge>{"  "}
                            <MDBBadge color="warning">{item.Tag2}</MDBBadge>{"  "}
                            <MDBBadge color="success">{item.Tag3}</MDBBadge>
                          </div>
                        </div>
                    </MDBListGroupItem>
                )).reverse()}
              </MDBListGroup>  
              <div className = "gallery"> 
                <center>
                  รอการอัพเดธข้อมูล...
                </center>
              </div>
            </div>
          </div>
        )
      }
    }
   render() {
     console.log(this.state.stockful)
     console.log("stocknewstag =",this.state.stocknewstag)
     var { isLoaded } = this.state;
     var CanvasJS = CanvasJSReact.CanvasJS;
     var CanvasJSChart = CanvasJSReact1.CanvasJSChart;
     var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
     const { term } = this.state;
     const options8 = {
       title: {
         text: ""
       },
       axisX: {
         lineThickness: 5,
         tickLength: 0,
         labelFormatter: function (e) {
           return "";
         },
         crosshair: {
           enabled: true,
           snapToDataPoint: true,
           labelFormatter: function (e) {
             return "";
           }
         }
       },
       axisY: {
         title: "Litecoin Price",
         prefix: "$",
         tickLength: 0
       },
       toolTip: {
         shared: true
       },
       rangeSelector: {
        enabled: false, //change it to true
      },
       charts: [{
         data: [{
           click: this.onClick,
           risingColor: "green",
           fallingColor: "#AF2020",
           color: "#AF2020",
           type: "candlestick",
           showInLegend: true,
           name: "Price",
           yValueFormatString: "฿###0.00",
           xValueFormatString: "DD/MM/YYYY",
           dataPoints: this.state.stockful.map(stockfuls => {
             return { x: new Date(stockfuls.Date), y: [stockfuls.Open, stockfuls.High, stockfuls.Low, stockfuls.Close] }
           })
         }]
       }],
       navigator: {
         slider: {
           minimum: new Date("2020-07-01"),
           maximum: new Date("2021-06-30")
         }
       }
     };
     const containerProps = {
       width: "100%",
       height: "450px",
       margin: "auto"
     };
     const options = {
       theme: "light2", // "light1", "light2", "dark1", "dark2"
       animationEnabled: true,
       exportEnabled: true,
       title: {
         text: "Stock Price"
       },
       axisX: {
         labelFormatter: function (e) {
           return CanvasJS.formatDate(e.value, "DD MMM");
         }
       },
       axisY: {
         prefix: "฿",
         title: "Price (in Bath)"
       },
       data: [{
         type: "candlestick",
         showInLegend: true,
         name: "Price",
         yValueFormatString: "฿###0.00",
         xValueFormatString: "DD/MM/YYYY",
         dataPoints: this.state.stockful.map(stockfuls => {
           return { x: new Date(stockfuls.Date), y: [stockfuls.Open, stockfuls.High, stockfuls.Low, stockfuls.Close] }
         })
       }]
     }
     console.log("Option", options);
 
     const options2 = {
       title: {
         text: ""
       },
       axisY: {
        title: "เปอร์เซ็น (%)"
       },
       data: [
         {
           // Change type to "doughnut", "line", "splineArea", etc.
           click: function(e){
            //  alert(  "dataSeries Event => Type: " + e.dataPoint.label );
            // window.open('/imstockseach/'+e.dataPoint.label,'_blank'); ลิ้งกราฟใช้อยู๋
           },
           type: "column",
           dataPoints: this.state.top10s.map(top10 => {
             return { label: top10.Name, y: top10.Percent , }
           })
         }]
     }
     console.log("Option2", options2);
 
     const options3 = {
       exportEnabled: true,
       animationEnabled: true,
       title: {
         text: ""
       },
       data: [{
         type: "pie",
         startAngle: 75,
         toolTipContent: "<b>{label}</b>: {y}%",
         showInLegend: "true",
         legendText: "{label}",
         indexLabelFontSize: 16,
         indexLabel: "{label} - {y}%",
         dataPoints: [
           { y: this.state.information.map(top => { return top.FreeFloat }), label: "ผู้ถือหุ้นรายย่อย" },
           { y: this.state.information.map(top => { return 100 - top.FreeFloat }), label: "ผู้ถือหุ้นรายใหญ่" },
         ]
       }]
     }
 
     const config2 = {
       chart: {
         type: 'spline'
       },
       title: {
         text: ''
       },
       xAxis: {
         type: 'datetime',
         labels: {
           format: '{value:%Y-%m-%d}',
         }
       },
       series: [
         {
           "id": "chf", "name": "Total_assets", "data": this.state.stockcost.map(stockcosts => stockcosts.Total_Assets),
           pointStart: 2016
         },
         {
           "id": "eur", "name": "Total_liabilities", "data": this.state.stockcost.map(stockcosts => stockcosts.Total_Liabilities),
           pointStart: 2016
         },
         {
           "id": "usd", "name": "Total_income", "data": this.state.stockcost.map(stockcosts => stockcosts.Total_Equities),
           pointStart: 2016
         },
         {
           "id": "chf", "name": "Total_assets", "data": this.state.stockcost.map(stockcosts => stockcosts.ValueOfPaidUpShares),
           pointStart: 2016
         },
         {
           "id": "eur", "name": "Total_liabilities", "data": this.state.stockcost.map(stockcosts => stockcosts.Total_Income),
           pointStart: 2016
         },
         {
           "id": "usd", "name": "Total_income", "data": this.state.stockcost.map(stockcosts => stockcosts.Net_Profit),
           pointStart: 2016
         }
       ]
     };
 
     return (
       <div>
         <div class="container-fluid">
           <div class="imstock">
             <div class="text-center p-2" style={{  height: 50, font: "Mitr" }}>
               {this.state.information.map(person =>
                 <h1>{person.Namestock}</h1>
               )}
             </div>
             <div class="row col-12">
              <div class="col-sm-6">
                <div className="panel-group">
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4 className="panel-title">
                        <button class="btn col-12" href="#" style={{ backgroundImage: 'linear-gradient(#7A9E9F,#4F6367)' }}
                          onClick={function(){this.setState({open:!this.state.open})}.bind(this)} >
                          <h2 class="headername">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-file-earmark-medical-fill" viewBox="0 0 16 16">
                              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-3 2v.634l.549-.317a.5.5 0 1 1 .5.866L7 7l.549.317a.5.5 0 1 1-.5.866L6.5 7.866V8.5a.5.5 0 0 1-1 0v-.634l-.549.317a.5.5 0 1 1-.5-.866L5 7l-.549-.317a.5.5 0 0 1 .5-.866l.549.317V5.5a.5.5 0 1 1 1 0zm-2 4.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zm0 2h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z" />
                            </svg>ลักษณะธุรกิจ
                          </h2>
                        </button>
                      </h4>
                    </div>
                    <div className={this.state.open? "panel-collapse": "panel-collapse panel-close"}>       
                      <ul className="list-group">
                        <li className="list-group-item">
                          <table class="table">
                            <tbody>
                              <tr>
                                <td>
                                  {this.state.information.map(person =>
                                    <tr>
                                      <td><h5 class="headername">{person.Detail}</h5></td>
                                    </tr>
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-sm-6">
                <div className="panel-group">
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4 className="panel-title">
                        <button class="btn col-12" href="#" style={{ backgroundImage: 'linear-gradient(#7A9E9F,#4F6367)' }}
                          onClick={function(){this.setState({open2:!this.state.open2})}.bind(this)} >
                          <h2 class="headername">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                            </svg>ข้อมูลเบื้องต้น
                          </h2>
                        </button>
                      </h4>
                    </div>
                    <div className={this.state.open2? "panel-collapse": "panel-collapse panel-close"}>       
                      <ul className="list-group">
                        <li className="list-group-item">
                          <table class="table">
                            <tbody>
                              <tr>
                                {this.state.information.map(informations =>
                                  <tr><h5 class="headername">
                                    <tr>ชื่อหุ้น :{"  "}{informations.Name}</tr>
                                    <tr>บริษัท :{"  "}{informations.Namestock}</tr>
                                    <tr>URL :{"  "}{informations.URL}</tr>
                                    <tr>ตําแหน่งที่ตัง :{"  "}{informations.Location}</tr>
                                    <tr>ติอต่อ :{"  "}{informations.Tel}</tr>
                                    <tr>แฟกซ์ :{"  "}{informations.Fax}</tr>
                                    <tr>ประเภทธุระกิจ :{"  "}{informations.BusinessCategory}</tr>
                                    <tr>ประเภท :{"  "}{informations.IndustryGroup}</tr>
                                    <tr>วันก่อตั้ง :{"  "}{informations.TradingStartDate}</tr>
                                    </h5></tr>
                                )}
                              </tr>
                            </tbody>
                          </table>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
               <div class="p-3 border border-dark" style={{backgroundColor: "#ecf0f1"}}>
                 <div class="col-12">
                   <div class="text-left">
                     <h2 class="headername">
                       <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-file-bar-graph-fill" viewBox="0 0 16 16">
                         <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-2 11.5v-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-1z" />
                       </svg>{"  "}ราคาหุ้น
                     </h2>
                   </div>
                 </div>
                 <Card class="col-12">
                   <CanvasJSStockChart
                     options={options8}
                     onRef={ref => this.stockChart = ref}
                   />
                 </Card>
               </div>
             </div>
             {/* {this.state.isSearch ? */}
             <div class="row">
               <div class="col-12 col-sm-7">
                 <div class="row">
                  <div class="col-12">
                    <br/>
                    <div class="p-3 border border-dark" style={{overflowY: "scroll",backgroundColor: "#ecf0f1", height: 500 }}>
                      <div class="col-12">
                        <div class="text-left">
                          <h2 class="headername">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-graph-up" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5z" />
                            </svg>{"  "}ข่าวที่มีผลกับหุ้นขึ้น-หุ้นลง
                          </h2>
                        </div>
                      </div>
                      <div>
                        <Tabs activeTab={this.state.activeTab2} onChange={(tabId) => this.setState({ activeTab2: tabId })} ripple>
                          <Tab style={{width: 250,fontSize: 20}}><img width={30} height={30} src="https://www.pngjoy.com/pngm/16/427750_up-arrow-transparent-background-green-arrow-up-hd.png" class="img-fluid z-depth-1" alt="Responsive image"/>วันที่ราคาหุ้นขึ้น{"  "}<MDBBadge color="primary" id='countups' pill></MDBBadge></Tab>
                          <Tab style={{width: 250,fontSize: 20}}><img width={30} height={30} src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Red_Arrow_Down.svg/1200px-Red_Arrow_Down.svg.png" class="img-fluid z-depth-1" alt="Responsive image"/>วันที่ราคาหุ้นลง{"  "}<MDBBadge color="primary" id='countdowns' pill></MDBBadge></Tab>
                          <Tab style={{width: 400,fontSize: 20}}><img width={50} height={50} src="https://iconsplace.com/wp-content/uploads/_icons/ffa500/256/png/equal-sign-2-icon-11-256.png" class="img-fluid z-depth-1" alt="Responsive image"/>วันที่ราคาหุ้นไม่เปลี่ยนแปลง{"  "}<MDBBadge color="primary" id='countins' pill></MDBBadge></Tab>
                        </Tabs>
                        <Grid>
                          <Cell col={12}>
                            <div className="content">{this.toggleCategories2()}</div>
                          </Cell>
                        </Grid>
                      </div>
                    </div>   
                  </div>
                   <div class="col-12">
                   <br/>
                     <div class="p-3 border border-dark" style={{backgroundColor: "#ecf0f1"}}>
                       <div class="col-12">
                         <div class="text-left">
                           <h2 class="headername">
                             <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-graph-up" viewBox="0 0 16 16">
                               <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5z" />
                             </svg>{"  "}ค่าใช้จ่ายบริษัท
                           </h2>
                         </div>
                       </div>
                       <div style={{overflowY: "scroll"}}>
                        <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
                          <Tab style={{width: 250,fontSize: 20}}>ค่าใช้จ่ายรายปี</Tab>
                          <Tab style={{width: 250,fontSize: 20}}>ค่าใช้จ่ายรายไตรมาส</Tab>
                        </Tabs>
                        <Grid>
                          <Cell col={12}>
                            <div className="content">{this.toggleCategories()}</div>
                          </Cell>
                        </Grid>
                      </div>
                     </div>
                   </div>           
                   <div class="col-12">
                     <br />
                     <div class="p-3 border border-dark" style={{backgroundColor: "#ecf0f1", height: 585}}>
                       <div class="col-12">
                         <div class="text-left">
                           <h2 class="headername">
                             <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-list-stars" viewBox="0 0 16 16">
                               <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" />
                               <path d="M2.242 2.194a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.256-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53z" />
                             </svg>{"  "}ผู้ถือหุ้น
                             {this.state.timeimfor.map(item =>
                              <p>( อัพเดธ{"  "}{(moment(item.Date).format("YYYY-MM-DD"))} )</p>
                              )}
                           </h2>
                         </div>
                       </div>
                       <div style={{display: 'flex', justifyContent: 'center'}}>
                         <Card style={{ borderRadius: 10, width: 1020, height: 300, overflowY: "scroll" }}>
                           <table>
                             <thead>
                               <tr>
                                 <th scope="col" className="headernametable">ลําดับ</th>
                                 <th scope="col" className="headernametable">ชื่อผู้ถือหุ้น</th>
                                 <th scope="col" className="headernametable">จำนวนหุ้น</th>
                                 <th scope="col" className="headernametable">เปอร์เซ็น %</th>
                               </tr>
                             </thead>
                             <tbody>
                               {this.state.stocktop10.map(stocktop =>
                                 <tr>
                                   <td>{stocktop.Rating}</td>
                                   <td type="button" value={stocktop} onClick={this.clickMe.bind(this, stocktop)}>{stocktop.Namepeople}</td>
                                   <td>{stocktop.Numberofshares}</td>
                                   <td>{stocktop.Percent}{"%"}</td>
                                 </tr>
                               )}
                             </tbody>
                           </table>
                         </Card>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
               <div class="row col-12 col-sm-5">
                <div class="col-12">
                <br/>
                  <div class="p-3 border border-dark" style={{overflowY: "scroll",backgroundColor: "#ecf0f1", height: 500 }}>
                    <div class="text-left">
                      <h2 class="headername">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-newspaper" viewBox="0 0 16 16">
                          <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z" />
                          <path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z" />
                        </svg>{"  "}ข่าวที่มีผลกับหุ้น
                      </h2>
                    </div>                  
                    <div>
                      <MDBListGroup className="newsstock" style={{ width: "" }}>
                        {this.state.datanew.map(item => (
                            <MDBListGroupItem>
                                <div className="d-flex w-100 justify-content-between">
                                    <a className="mb-1" style={{ textDecoration: "none", color: "red", fontSize: 20}} href={item.URL_web} target="_blank">{item.Title}</a>
                                </div>
                                <div class="row">
                                  <div class="col-12 col-sm-6">
                                      <img src={item.URL_img} width={250} height={200}  alt="" title="Google Images"   />
                                  </div>
                                  <div class="col-12 col-sm-6">
                                      <p className="mb-1">{item.Detail}</p>
                                  </div>
                                </div>                 
                                <div className="d-flex w-100 justify-content-between">
                                  <div>
                                    <MDBBadge color="primary" pill>วันที่-{(moment(item.Date).format("YYYY-MM-DD"))}</MDBBadge>{"  "}<small>•</small>{"  "}<small>infoquest</small>
                                  </div>
                                  <div>
                                    <MDBBadge color="danger">{item.Tag1}</MDBBadge>{"  "}
                                    <MDBBadge color="warning">{item.Tag2}</MDBBadge>{"  "}
                                    <MDBBadge color="success">{item.Tag3}</MDBBadge>
                                  </div>
                                </div>
                            </MDBListGroupItem>
                        ))}
                      </MDBListGroup>  
                      <div className = "gallery"> 
                        {/* <center>
                          กดเลือกวันที่ต้องการ...
                        </center>
                        <center>
                          ⇔⇔⇔⇔⇔⇔⇔⇔⇔⇔⇔⇔
                        </center> */}
                        <MDBListGroup className="newsstock" style={{ width: "" }}>
                          {this.state.stocknews.map(item => (
                            <MDBListGroupItem style={{ width: "" ,backgroundColor: "#ecf0f1"}}>
                              <div className="d-flex w-100 justify-content-between">
                                  <a className="mb-1" style={{ textDecoration: "none", color: "red", fontSize: 20}} href={item.URL_web} target="_blank">{item.Title}</a>
                              </div>
                              <div class="row">
                                  <div class="col-12 col-sm-6">
                                      <img src={item.URL_img} width={250} height={200}  alt="" title="Google Images"   />
                                  </div>
                              </div>                 
                              <div className="d-flex w-100 justify-content-between">
                                <div>
                                  <small>วันที่-{moment(item.Date).format("YYYY-MM-DD")}</small>{"  "}<small>•</small>{"  "}<small>infoquest</small>
                                </div>
                                <div>
                                  <MDBBadge color="danger">{item.Tag1}</MDBBadge>{"  "}
                                  <MDBBadge color="warning">{item.Tag2}</MDBBadge>{"  "}
                                  <MDBBadge color="success">{item.Tag3}</MDBBadge>
                                </div>
                              </div>
                            </MDBListGroupItem>
                          ))}
                        </MDBListGroup>  
                      </div>
                    </div>
                  </div>
                </div> 
                 <div class="col-12">
                 <br />
                   <div>
                     <div class="p-3 border border-dark" style={{backgroundColor: "#ecf0f1", height: 567}}>
                       <div class="text-left">
                         <h2 class="headername">
                           <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-pie-chart-fill" viewBox="0 0 16 16">
                             <path d="M15.985 8.5H8.207l-5.5 5.5a8 8 0 0 0 13.277-5.5zM2 13.292A8 8 0 0 1 7.5.015v7.778l-5.5 5.5zM8.5.015V7.5h7.485A8.001 8.001 0 0 0 8.5.015z" />
                           </svg>{"  "}ประเภทผู้ถือหุ้น
                           {this.state.timeimfor.map(item =>
                              <p>( อัพเดธ{"  "}{(moment(item.Date).format("YYYY-MM-DD"))} )</p>
                            )}
                         </h2>
                       </div>
                       <CanvasJSChart options={options3}
                         onRef={ref => this.chart2 = ref}
                       />
                     </div>
                   </div>
                 </div>
                 <div class="col-12">
                  <br />
                    <div>
                      <div class="p-3 border border-dark" style={{backgroundColor: "#ecf0f1"}}>
                        <div class="text-left">
                          <h2 class="headername">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-graph-up" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5z" />
                            </svg>{"  "}กราฟแสดงผู้ถือหุ้นรายใหญ่
                            <p>(กรุณาเลือกผู้ถือหุ้นที่ต้องการ)</p>
                          </h2>
                        </div>
                        <div class="text-center p-2" style={{  height: 50, font: "Mitr" }}>
                        {this.state.top10s.map((person,i) => {if (i ==  0){
                          return(
                            <tr>
                              <td>{person.Namepeople}</td>                          
                            </tr>
                              )
                        }})
                        }
                      </div>
                        <CanvasJSChart options={options2}
                          onRef={ref => this.chart2 = ref}
                        />
                      </div>
                    </div>
                  </div>
               </div>
             </div>
           </div>
         </div>
         {/* : <div>Advertisement</div>} */}
       </div>
     );
   }
 }
 
 export default Projects2;
 
 