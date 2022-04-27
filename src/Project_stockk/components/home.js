
import React, { Component } from 'react';
import News from './newspage';
import Exchange from './exchange';
import Policy from './policy'
import Mutualfund from './mutualfund'
import Stock2 from './stock'
import World from './world'
import moment from "moment";
import 'moment-timezone';
import { Card, Layout } from 'react-mdl';
import { MDBListGroup, MDBListGroupItem } from "mdbreact";
import { Table } from 'semantic-ui-react';
import CanvasJSReact1 from './canvasjs.react';
import Navebar from '../../Project_forex/Page/Navebar';
//css
import '../CSS/head.css'

import '../CSS/blox.css'
import '../CSS/converter.css'


// import 'react-mdl/extra/material.css';
// import 'react-mdl/extra/material.js';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'semantic-ui-css/semantic.min.css';



var CanvasJS = CanvasJSReact1.CanvasJS;
var CanvasJSChart = CanvasJSReact1.CanvasJSChart;

class Projects extends Component {



  constructor(props) {
    super(props);
    this.state = {
      term: '',
      term2: '',
      selec: '',
      selec2: '',
      isSearch: false,
      isLoaded: false
    }
    this.state = { daynowstock: [], daynowworld: [], daynownav: [], daynowpolicy: [], eventcovid3: [], nameth: [], proj: [], navgrap: [] }
    this.searchHandler = this.searchHandler.bind(this);
    this.searchHandler2 = this.searchHandler2.bind(this);
    this.searchHandler3 = this.searchHandler3.bind(this);
    this.searchHandler4 = this.searchHandler4.bind(this);
    this.changepage = this.changepage.bind(this);
    let daynowstock = 'http://localhost:3015/daynowstock';
    fetch(daynowstock)
      .then(response => response.json())
      .then(daynowstock => (this.setState({ daynowstock }))
      )
    let daynowworld = 'http://localhost:3015/daynowworld';
    fetch(daynowworld)
      .then(response => response.json())
      .then(daynowworld => (this.setState({ daynowworld }))
      )
    let daynownav = 'http://localhost:3015/daynownav';
    fetch(daynownav)
      .then(response => response.json())
      .then(daynownav => (this.setState({ daynownav }))
      )
    let daynowpolicy = 'http://localhost:3015/daynowpolicy';
    fetch(daynowpolicy)
      .then(response => response.json())
      .then(daynowpolicy => (this.setState({ daynowpolicy }))
      )
    let eventcovid3 = 'http://localhost:3015/eventcovid3';
    fetch(eventcovid3)
      .then(response => response.json())
      .then(eventcovid3 => (this.setState({ eventcovid3 }))
      )
    let nameth = 'http://localhost:3015/nameth';
    fetch(nameth)
      .then(response => response.json())
      .then(nameth => (this.setState({ nameth }))
      )
    let proj = 'http://localhost:3015/proj/C0000000023';
    fetch(proj)
      .then(response => response.json())
      .then(proj => (this.setState({ proj }))
      )
    let navgrap = 'http://localhost:3015/navgrap/M0000_2552';
    fetch(navgrap)
      .then(response => response.json())
      .then(navgrap => (this.setState({ navgrap }))
      )
    // let proj = 'http://localhost:3015/proj/'+ this.state.selec ;
    // fetch(proj)
    //   .then(response => response.json())
    //   .then(proj => (this.setState({ proj }))
    //   )
  }
  searchHandler(event) {
    this.setState({ term: event.target.value, /*isSearch: false*/ })
  }
  searchHandler2(event) {
    this.setState({ term2: event.target.value, /*isSearch: false*/ })
  }
  searchHandler3(event) {
    this.setState({ selec: event.target.value, /*isSearch: false*/ })
  }
  searchHandler4(event) {
    this.setState({ selec2: event.target.value, /*isSearch: false*/ })
  }
  changepage = () => {
    window.open('/stockk/imstock');
  }
  callAPI = () => {
    let eventcovid3 = 'http://localhost:3015/eventcovid3/' + this.state.term + '/' + this.state.term2;
    fetch(eventcovid3)
      .then(response => response.json())
      .then(eventcovid3 => (this.setState({ eventcovid3 }))
      )
    this.setState({
      showOutputCard: true
    })
    console.log("big", this.state.eventcovid3.length)
  }
  callAPI2 = () => {
    let proj = 'http://localhost:3015/proj/' + this.state.selec;
    fetch(proj)
      .then(response => response.json())
      .then(proj => (this.setState({ proj }))
      )
    this.setState({
      showOutputCard: true
    })
    console.log("proj", proj)
  }
  callAPInavgrap = () => {
    let navgrap = 'http://localhost:3015/navgrap/' + this.state.selec2;
    fetch(navgrap)
      .then(response => response.json())
      .then(navgrap => (this.setState({ navgrap }))
      )
    this.setState({
      showOutputCard: true
    })
    console.log("navgrap", this.state.navgrap.length)
  }

  render() {



    const { term } = this.state;
    const { term2 } = this.state;
    const { selec } = this.state;
    const { selec2 } = this.state;
    console.log("selec", selec)
    console.log("selec2", selec2)
    const options = {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: ""
      },
      axisY: {
        title: "มูลค่าหน่วยลงทุน (บาท)"
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
        name: "มูลค่าหน่วยลงทุน (บาท)",
        showInLegend: false,
        yValueFormatString: "###0.00",
        xValueFormatString: "DD/MM/YY",
        dataPoints: this.state.navgrap.map(user => {
          return { x: new Date(user.nav_date), y: user.last_val }
        })
      }]
    };
    if (this.state.eventcovid3.length == 0) {
      return (


        <div className='maincon-Zigzag-insite' style={{marginTop:"70px"}}>
          <Navebar />
          <div class="wrapper1">


            <div class="">
              <br />
              {/* <div className="banner-text2">
            <h1 style={{ fontSize: "100px", color: "white" }}>One Stock Data-Service Web</h1>
          </div> */}
              <h1 class="headernametable3" style={{ fontSize: "60px", color: "black" }}>สะดวกที่สุด ในการค้าหาหุ้น</h1>
              <div class="headernametable3">
                <button class="btn btn-success" onClick={this.changepage} type="submit">ค้นหา</button>
              </div>
            </div>
            <br></br>
            <div class="container-fluid">
              <div class="row justify-content-around">
                <div class="row col-sm-8 col-12">
                  <div class="col-xs-12 col-md-6">
                    <br />
                    <div class="p-3 border border-dark" style={{ backgroundColor: "#ecf0f1" }}>
                      <div class="">
                        <h1 class="headername"><img width={50} height={50} src="https://i.pinimg.com/originals/fc/9e/18/fc9e18186799ee213981aa9fe244b674.png" class="img-fluid z-depth-1 rounded-circle" alt="Responsive image" />ดัชนี้หุ้นโลก</h1>
                        {this.state.daynowworld.map(person =>
                          <p class="headername">ตลาดทั่วโลก{"  "}({moment(person.Date).format("YYYY-MM-DD")})</p>
                        )}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <World></World>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-md-6">
                    <br />
                    <div class="p-3 border border-dark" style={{ backgroundColor: "#ecf0f1" }}>
                      <div class="">
                        <h1 class="headername"><img width={50} height={50} src="http://www.สถาบันภาษาเอ็นวายซี.com/uploads/2/4/6/6/24664794/s689630753364681404_p2_i1_w250.png" class="img-fluid z-depth-1 rounded-circle" alt="Responsive image" />ไฮไลท์หุ้น</h1>
                        {this.state.daynowstock.map(person =>
                          <p class="headername">ไฮไลท์หุ้น{"  "}({moment(person.Date).format("YYYY-MM-DD")})</p>
                        )}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Stock2></Stock2>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-md-6">
                    <br />
                    <div class="p-3 border border-dark" style={{ backgroundColor: "#ecf0f1", height: 470 }}>
                      <div class="">
                        <h1 class="headername"><img width={50} height={50} src="http://www.poems.in.th/backoffice/file_manager/tb_file_manager_23329_file1.png" class="img-fluid z-depth-1 rounded-circle" alt="Responsive image" />กองทุนรวม</h1>
                        <p style={{ color: "red" }}>*{" "}กรุณาเลือกบริษัท และ กองทุน</p>
                      </div>
                      <div class="headername">
                        <select className="browser-default custom-select" style={{ width: 250, font: "Mitr" }} placeholder="" onClick={this.callAPI2}
                          onChange={this.searchHandler3}
                          value={selec}
                        >
                          {this.state.nameth.map(person =>
                            <option key={person.id} value={person.Unique_id}>{person.name_th}</option>
                          )}
                        </select>{"  "}
                        <select className="browser-default custom-select" style={{ width: 150, font: "Mitr" }} placeholder="กรุณาเลือกบริษัท"
                          onChange={this.searchHandler4}
                          value={selec2}
                        >
                          {this.state.proj.map(person =>
                            <option key={person.proj_id} value={person.proj_id}>{person.proj_name_th}</option>
                          )}
                        </select>{"  "}
                        <button class="btn btn-success" onClick={this.callAPInavgrap} disabled={!this.state.selec} disabled={!this.state.selec2} type="submit">ค้นหา</button>

                      </div>
                      <br />
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div class="col-12" style={{ display: 'flex', justifyContent: 'center' }}>
                          <Card style={{ borderRadius: 10, width: 580, height: 290, overflowY: "scroll" }}>
                            <CanvasJSChart options={options}
                              onRef={ref => this.chart = ref}
                            />
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-md-6">
                    <br />
                    <div class="p-3 border border-dark" style={{ backgroundColor: "#ecf0f1" }}>
                      <div class="">
                        <h1 class="headername" style={{ color: "black " }}><img width={50} height={50} src="https://www.savepng.com/file/thumb/2020-06/25581-7-stock-market-graph-up-transparent-image-thumb.png" class="img-fluid z-depth-1 rounded-circle" alt="Responsive image" />โผ 10 หุ้นไทย</h1>
                        {/* (2020-11-02 ถึง 2021-02-02) */}
                        <div class="headername">
                          <input type="text" class="" style={{ width: 150, font: "Mitr" }} placeholder="YYYY-MM-DD" oninput="this.value = this.value.toUpperCase()"
                            onChange={this.searchHandler}
                            value={term}
                          />
                          {"  "}{"ถึง"}{"  "}
                          <input type="text" class="" style={{ width: 150, font: "Mitr" }} placeholder="YYYY-MM-DD" oninput="this.value = this.value.toUpperCase()"
                            onChange={this.searchHandler2}
                            value={term2}
                          />
                          {"  "}
                          <button class="btn btn-success" onClick={this.callAPI} type="submit" disabled={!this.state.term} disabled={!this.state.term2}>ค้นหา</button>
                        </div>
                      </div>
                      <br />
                      <div style={{ display: 'flex', justifyContent: 'center', overflowY: "scroll" }}>
                        <div class="col-12" style={{ display: 'flex', justifyContent: 'center' }}>
                          <Card style={{ borderRadius: 10, width: 580, height: 320, overflowX: "scroll", overflowY: "scroll" }}>
                            <MDBListGroup className="newsstock" style={{ width: "" }}>
                              <MDBListGroupItem>
                                <div class="row">
                                  <div class="col-12">
                                    <center className="d-flex w-100">
                                      <a className="mb-1" style={{ textDecoration: "none", color: "red", fontSize: 20 }} target="_blank">{'กรุณาใส่วันที่ตลาดหุ้นเปิด ( จันทร์ - ศุกร์ ) ยกเว้นวันหยุดราชการ'}</a>
                                    </center>
                                    <center>
                                      <img width={190} height={190} src="https://isometric.online/wp-content/uploads/2019/07/Analytics_SVG.svg" class="img-fluid z-depth-1 rounded-circle" alt="Responsive image" />
                                    </center>
                                  </div>
                                </div>
                              </MDBListGroupItem>
                            </MDBListGroup>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-md-12">
                    <br />
                    <div class="p-3 border border-dark" style={{ backgroundColor: "#ecf0f1" }}>
                      <div class="">
                        <h1 class="headername"><img width={50} height={50} src="http://pngimg.com/uploads/coin/coin_PNG36871.png" class="img-fluid z-depth-1 rounded-circle" alt="Responsive image" />ค่าเงินต่างประเทศ</h1>
                        <p class="headername"> สกุลเงินหลักของโลก ต่อ USD</p>
                      </div>
                      <Exchange></Exchange>
                    </div>
                  </div>
                </div>
                <div class="row col-12 col-sm-4">
                  <div class="col-xs-12 col-md-12">
                    <br />
                    <div class="p-3 border border-dark" style={{ overflowX: "scroll", overflowY: "scroll", height: 950, backgroundColor: "#ecf0f1" }}>
                      <div class="">
                        <h1 class="headername"><img width={50} height={50} src="https://cdn3.iconfinder.com/data/icons/ballicons-reloaded-free/512/icon-70-512.png" class="img-fluid z-depth-1 rounded-circle" alt="Responsive image" />ข่าวประจําวัน</h1>
                        <p class="headername">ข่าวล่าสุดประจําวัน</p>
                      </div>
                      <News></News>
                    </div>
                  </div>
                  <div class="col-xs-12 col-md-12">
                    <br />
                    <div class="p-3 border border-dark" style={{ overflowY: "scroll", backgroundColor: "#ecf0f1" }}>
                      <div class="">
                        <h1 class="headername"><img width={50} height={50} src="https://www.pngrepo.com/png/187897/180/change-money.png" class="img-fluid z-depth-1 rounded-circle" alt="Responsive image" />อัตราดอกเบี้ย</h1>
                        {this.state.daynowpolicy.map(person =>
                          <p class="headername">อัตราดอกเบี้ยรายวัน{"  "}({moment(person.Date).format("YYYY-MM-DD")})</p>
                        )}
                      </div>
                      <Policy></Policy>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      )
    } else {

      
      return (

        <div className='maincon-Zigzag-insite' style={{marginTop:"70px"}}>
          <Navebar />
        <div class="wrapper1">
          <div class="">
            <br />
            {/* <div className="banner-text2">
              <h1 style={{ fontSize: "100px", color: "white" }}>One Stock Data-Service Web</h1>
            </div> */}
            <h1 class="headernametable3" style={{ fontSize: "60px", color: "black" }}>สะดวกที่สุด ในการค้าหาหุ้น</h1>
            <div class="headernametable3">
              <button class="btn btn-success" onClick={this.changepage} type="submit">ค้นหา</button>
            </div>
          </div>
          <br></br>
          <div class="container-fluid">
            <div class="row justify-content-around">
              <div class="row col-sm-8 col-12">
                <div class="col-xs-12 col-md-6">
                  <br />
                  <div class="p-3 border border-dark" style={{ backgroundColor: "#ecf0f1" }}>
                    <div class="">
                      <h1 class="headername"><img width={50} height={50} src="https://i.pinimg.com/originals/fc/9e/18/fc9e18186799ee213981aa9fe244b674.png" class="img-fluid z-depth-1 rounded-circle" alt="Responsive image" />ดัชนี้หุ้นโลก</h1>
                      {this.state.daynowworld.map(person =>
                        <p class="headername">ตลาดทั่วโลก{"  "}({moment(person.Date).format("YYYY-MM-DD")})</p>
                      )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <World></World>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-md-6">
                  <br />
                  <div class="p-3 border border-dark" style={{ backgroundColor: "#ecf0f1" }}>
                    <div class="">
                      <h1 class="headername"><img width={50} height={50} src="http://www.สถาบันภาษาเอ็นวายซี.com/uploads/2/4/6/6/24664794/s689630753364681404_p2_i1_w250.png" class="img-fluid z-depth-1 rounded-circle" alt="Responsive image" />ไฮไลท์หุ้น</h1>
                      {this.state.daynowstock.map(person =>
                        <p class="headername">ไฮไลท์หุ้น{"  "}({moment(person.Date).format("YYYY-MM-DD")})</p>
                      )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Stock2></Stock2>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-md-6">
                  <br />
                  <div class="p-3 border border-dark" style={{ backgroundColor: "#ecf0f1", height: 470 }}>
                    <div class="">
                      <h1 class="headername"><img width={50} height={50} src="http://www.poems.in.th/backoffice/file_manager/tb_file_manager_23329_file1.png" class="img-fluid z-depth-1 rounded-circle" alt="Responsive image" />กองทุนรวม</h1>
                      <p style={{ color: "red" }}>*{" "}กรุณาเลือกบริษัท และ กองทุน</p>
                    </div>
                    <div class="headername">
                      <select className="browser-default custom-select" style={{ width: 250, font: "Mitr" }} placeholder="" onClick={this.callAPI2}
                        onChange={this.searchHandler3}
                        value={selec}
                      >
                        {this.state.nameth.map(person =>
                          <option key={person.name_th} value={person.Unique_id}>{person.name_th}</option>
                        )}
                      </select>{"  "}
                      <select className="browser-default custom-select" style={{ width: 150, font: "Mitr" }} placeholder=""
                        onChange={this.searchHandler4}
                        value={selec2}
                      >
                        {this.state.proj.map(person =>
                          <option key={person.proj_id} value={person.proj_id}>{person.proj_name_th}</option>
                        )}
                      </select>{"  "}
                      <button class="btn btn-success" onClick={this.callAPInavgrap} disabled={!this.state.selec} disabled={!this.state.selec2} type="submit" >ค้นหา</button>
                    </div>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <div class="col-12" style={{ display: 'flex', justifyContent: 'center' }}>
                        <Card style={{ borderRadius: 10, width: 580, height: 290, overflowY: "scroll" }}>
                          <CanvasJSChart options={options}
                            onRef={ref => this.chart = ref}
                          />
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-md-6">
                  <br />
                  <div class="p-3 border border-dark" style={{ backgroundColor: "#ecf0f1" }}>
                    <div class="">
                      <h1 class="headername" style={{ color: "black " }}><img width={50} height={50} src="https://www.savepng.com/file/thumb/2020-06/25581-7-stock-market-graph-up-transparent-image-thumb.png" class="img-fluid z-depth-1 rounded-circle" alt="Responsive image" />โผ 10 หุ้นไทย</h1>
                      {/* (2020-11-02 ถึง 2021-02-02) */}
                      <div class="headername">
                        <input type="text" class="" style={{ width: 150, font: "Mitr" }} placeholder="YYYY-MM-DD" oninput="this.value = this.value.toUpperCase()"
                          onChange={this.searchHandler}
                          value={term}
                        />
                        {"  "}{"ถึง"}{"  "}
                        <input type="text" class="" style={{ width: 150, font: "Mitr" }} placeholder="YYYY-MM-DD" oninput="this.value = this.value.toUpperCase()"
                          onChange={this.searchHandler2}
                          value={term2}
                        />
                        {"  "}
                        <button class="btn btn-success" onClick={this.callAPI} type="submit" disabled={!this.state.term} disabled={!this.state.term2}>ค้นหา</button>
                      </div>
                    </div>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center', overflowY: "scroll" }}>
                      <div class="col-12" style={{ display: 'flex', justifyContent: 'center' }}>
                        <Card style={{ borderRadius: 10, width: 580, height: 320, overflowX: "scroll", overflowY: "scroll" }}>
                          <Table>
                            <thead>
                              <tr>
                                <th scope="col" className="headernametable">ชื่อหุ้น</th>
                                <th scope="col" className="headernametable">ขึ้น(บาท)</th>
                                <th scope="col" className="headernametable">เริ่ม(บาท)</th>
                                <th scope="col" className="headernametable">ถึง(บาท)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.eventcovid3.map(item =>
                                <tr>
                                  {/* <td><a href={'/imstockseach/'+stocks.name} target="_blank">{stocks.name}</a></td> */}
                                  <td style={{ color: "" }}><img width={20} height={20} src="http://www.สถาบันภาษาเอ็นวายซี.com/uploads/2/4/6/6/24664794/s689630753364681404_p2_i1_w250.png" class="img-fluid z-depth-1 rounded-circle" alt="Responsive image" /><a>{item.Name}</a></td>
                                  <td style={{ color: "#006633 " }}>{item.point_diff.toFixed(2)}%▲</td>
                                  <td style={{ color: " " }}>{item.point_b.toFixed(2)}</td>
                                  <td style={{ color: " " }}>{item.point_a.toFixed(2)}</td>
                                </tr>
                              )}
                            </tbody>
                          </Table>
                          {/* <MDBListGroup className="newsstock" style={{ width: "" }}>                  
                            <MDBListGroupItem>       
                              <div class="row">
                                  {this.state.eventcovid3.map(item =>
                                      <div class="col-12">
                                        <div className="d-flex w-100">
                                            <img width={20} height={20} src="http://www.สถาบันภาษาเอ็นวายซี.com/uploads/2/4/6/6/24664794/s689630753364681404_p2_i1_w250.png" class="img-fluid z-depth-1 rounded-circle" alt="Responsive image"/>{' '}
                                            <a className="mb-1" style={{ textDecoration: "none", color: "#006633", fontSize: 20}} href={'/imstockseach/'+item.Name} target="_blank">{item.Name}{' '}{item.point_diff.toFixed(2)}%▲</a>                                                                         
                                            <p className="col-2 mb-1" style={{ color: "green" }}>{'เริ่ม'}{item.point_b.toFixed(3)}{'➔'}{'ถึง'}{item.point_a.toFixed(3)}</p>               
                                        </div>   
                                      </div>
                                  )}                 
                              </div>                   
                            </MDBListGroupItem>                
                          </MDBListGroup>  */}
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-md-12">
                  <br />
                  <div class="p-3 border border-dark" style={{ backgroundColor: "#ecf0f1" }}>
                    <div class="">
                      <h1 class="headername"><img width={50} height={50} src="http://pngimg.com/uploads/coin/coin_PNG36871.png" class="img-fluid z-depth-1 rounded-circle" alt="Responsive image" />ค่าเงินต่างประเทศ</h1>
                      <p class="headername"> สกุลเงินหลักของโลก ต่อ USD</p>
                    </div>
                    <Exchange></Exchange>
                  </div>
                </div>
              </div>
              <div class="row col-12 col-sm-4">
                <div class="col-xs-12 col-md-12">
                  <br />
                  <div class="p-3 border border-dark" style={{ overflowX: "scroll", overflowY: "scroll", height: 950, backgroundColor: "#ecf0f1" }}>
                    <div class="">
                      <h1 class="headername"><img width={50} height={50} src="https://cdn3.iconfinder.com/data/icons/ballicons-reloaded-free/512/icon-70-512.png" class="img-fluid z-depth-1 rounded-circle" alt="Responsive image" />ข่าวประจําวัน</h1>
                      <p class="headername">ข่าวล่าสุดประจําวัน</p>
                    </div>
                    <News></News>
                  </div>
                </div>
                <div class="col-xs-12 col-md-12">
                  <br />
                  <div class="p-3 border border-dark" style={{ overflowY: "scroll", backgroundColor: "#ecf0f1" }}>
                    <div class="">
                      <h1 class="headername"><img width={50} height={50} src="https://www.pngrepo.com/png/187897/180/change-money.png" class="img-fluid z-depth-1 rounded-circle" alt="Responsive image" />อัตราดอกเบี้ย</h1>
                      {this.state.daynowpolicy.map(person =>
                        <p class="headername">อัตราดอกเบี้ยรายวัน{"  "}({moment(person.Date).format("YYYY-MM-DD")})</p>
                      )}
                    </div>
                    <Policy></Policy>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
    }
  }
}

export default Projects;

