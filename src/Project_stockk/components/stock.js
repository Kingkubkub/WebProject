import React, { Component } from "react";
import { Grid , Card} from 'react-mdl';
import { Table } from 'semantic-ui-react';
import { MDBListGroup, MDBListGroupItem , MDBBadge} from "mdbreact";
class Stock extends Component {

    constructor(props) {
        super(props);
        this.state = { activeTab: 0 };
        this.state = { stock: []};
        fetch('http://localhost:3015/stock')
            .then(response => response.json())
            .then(stock => (this.setState({ stock }))
        )
    }

    render() {
        return ( 
            <div class="col-12" style={{display: 'flex', justifyContent: 'center'}}>
                <Card style={{ borderRadius: 10, height: 300 , width: 580,overflowX: "scroll" }}>
                    <Table>
                        <thead>
                            <tr>
                                <th scope="col" className="headernametable">ชื่อหุ้น</th>
                                <th scope="col" className="headernametable">เปิด(บาท)</th>
                                <th scope="col" className="headernametable">ปิด(บาท)</th>
                                <th scope="col" className="headernametable">ขึ้น(บาท)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.stock.map(stocks =>
                                <tr>
                                    {/* <td><a href={'/imstockseach/'+stocks.name} target="_blank">{stocks.name}</a></td> */}
                                    <td><a>{stocks.name}</a></td>
                                    <td>{stocks.open}</td>
                                    <td>{stocks.close}</td>
                                    <td style={{ color: "green " }}>{stocks.ABC.toFixed(2)}▲</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card>
            </div>   
        );                   
    }
} export default Stock;

// import React, { Component } from "react";
// import { Tabs, Tab, Grid, Cell, Card, CardTitle, CardText, CardActions, Button, CardMenu, IconButton } from 'react-mdl';
// import { Icon, Label, Menu, Table } from 'semantic-ui-react';

// var today = new Date();
// var dateValue = today.getDay();
// class Stock extends Component {

//     constructor(props) {
//         super(props);
//         this.state = { activeTab: 0 };
//         this.state = { stocksu: [], stock: [], stockmo: [],stocktu: [] ,stockfinal: []};
//         fetch('http://localhost:3015/stockfinal')
//             .then(response => response.json())
//             .then(stockfinal => (this.setState({ stockfinal }))
//             )

//         fetch('http://203.154.83.54:8800/stock')
//             .then(response => response.json())
//             .then(stock => (this.setState({ stock }))
//             )

//         fetch('http://203.154.83.54:8800/stock1')
//             .then(response => response.json())
//             .then(stocksu => (this.setState({ stocksu }))
//             )

//         fetch('http://203.154.83.54:8800/stock2')
//             .then(response => response.json())
//             .then(stockmo => (this.setState({ stockmo }))
//             )

//         fetch('http://203.154.83.54:8800/stock3')
//             .then(response => response.json())
//             .then(stocktu => (this.setState({ stocktu }))
//             )
//     }

//     render() {
//         if (dateValue == 0 || dateValue == 1) {
//             if (dateValue == 0) {
//                 return (<div>
//                     <Grid item xs={6}>
//                         <Card style={{ borderRadius: 10, width: 580, height: 300 }}>
//                             <Table  >
//                                 <thead>
//                                     <tr>
//                                         <th scope="col" className="headernametable">Name</th>
//                                         <th scope="col" className="headernametable">Close</th>
//                                         <th scope="col" className="headernametable">LastClose</th>
//                                         <th scope="col" className="headernametable">Up</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {this.state.stocksu.map(stocks =>
//                                         <tr>
//                                             <td><a href={'/imstockseach/'+stocks.name} target="_blank">{stocks.name}</a></td>
//                                             <td>{stocks.open}</td>
//                                             <td>{stocks.close}</td>
//                                             <td style={{ color: "green " }}>{stocks.ABC.toFixed(4)}▲</td>
//                                         </tr>
//                                     )}
//                                 </tbody>
//                             </Table >
//                         </Card>
//                     </Grid>
//                 </div>);
//             } else {
//                 return (<div>
//                     <Grid item xs={6}>
//                         <Card style={{ borderRadius: 10, width: 580, height: 300 }}>
//                             <Table  >
//                                 <thead>
//                                     <tr>
//                                         <th scope="col" className="headernametable">Name</th>
//                                         <th scope="col" className="headernametable">Close</th>
//                                         <th scope="col" className="headernametable">LastClose</th>
//                                         <th scope="col" className="headernametable">Up</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {this.state.stockmo.map(stocks =>
//                                         <tr>
//                                             <td><a href={'/imstockseach/'+stocks.name} target="_blank">{stocks.name}</a></td>
//                                             <td>{stocks.open}</td>
//                                             <td>{stocks.close}</td>
//                                             <td style={{ color: "green " }}>{stocks.ABC.toFixed(4)}▲</td>
//                                         </tr>
//                                     )}
//                                 </tbody>
//                             </Table >
//                         </Card>
//                     </Grid>
//                 </div>);
//             }
//         } else {
//             if (this.state.stock.length == 0 && dateValue == 2) {
//                 return (<div>
//                     <Grid item xs={6}>
//                         <Card style={{ borderRadius: 10, width: 580, height: 300 }}>
//                             <Table  >
//                                 <thead>
//                                     <tr>
//                                         <th scope="col" className="headernametable">Name</th>
//                                         <th scope="col" className="headernametable">Close</th>
//                                         <th scope="col" className="headernametable">LastClose</th>
//                                         <th scope="col" className="headernametable">Up</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {this.state.stocktu.map(stocks =>
//                                         <tr>
//                                             <td><a href={'/imstockseach/'+stocks.name} target="_blank">{stocks.name}</a></td>
//                                             <td>{stocks.open}</td>
//                                             <td>{stocks.close}</td>
//                                             <td style={{ color: "green " }}>{stocks.ABC.toFixed(4)}▲</td>
//                                         </tr>
//                                     )}
//                                 </tbody>
//                             </Table >
//                         </Card>
//                     </Grid>
//                 </div>);
//             } else {
//                 if(this.state.stock.length == 0){
//                     return (<div>
//                         <Grid item xs={6}>
//                             <Card style={{ borderRadius: 10, width: 580, height: 300 }}>
//                                 <Table  >
//                                     <thead>
//                                         <tr>
//                                             <th scope="col" className="headernametable">Name</th>
//                                             <th scope="col" className="headernametable">Close</th>
//                                             <th scope="col" className="headernametable">LastClose</th>
//                                             <th scope="col" className="headernametable">Up</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {this.state.stocksu.map(stocks =>
//                                             <tr>
//                                                 <td><a href={'/imstockseach/'+stocks.name} target="_blank">{stocks.name}</a></td>
//                                                 <td>{stocks.open}</td>
//                                                 <td>{stocks.close}</td>
//                                                 <td style={{ color: "green " }}>{stocks.ABC.toFixed(4)}▲</td>
//                                             </tr>
//                                         )}
//                                     </tbody>
//                                 </Table >
//                             </Card>
//                         </Grid>
//                     </div>);    
//                 }else{
//                     return (<div>
//                         <Grid item xs={6}>
//                             <Card style={{ borderRadius: 10, width: 580, height: 300 }}>
//                                 <Table  >
//                                     <thead>
//                                         <tr>
//                                             <th scope="col" className="headernametable">Name</th>
//                                             <th scope="col" className="headernametable">Close</th>
//                                             <th scope="col" className="headernametable">LastClose</th>
//                                             <th scope="col" className="headernametable">Up</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {this.state.stock.map(stocks =>
//                                             <tr>
//                                                 <td><a  to={'/imstockseach/'+stocks.name} target="_parent">{stocks.name}</a></td>
//                                                 <td>{stocks.open}</td>
//                                                 <td>{stocks.close}</td>
//                                                 <td style={{ color: "green " }}>{stocks.ABC.toFixed(4)}▲</td>
//                                             </tr>
//                                         )}
//                                     </tbody>
//                                 </Table >
//                             </Card>
//                         </Grid>
//                     </div>);
//                 }

//             }
//         }

//     }
// } export default Stock;

// (<div>
//     <Grid item xs={6}>
//         <Card style={{ borderRadius: 10, width: 800, height: 300 }}>
//             <Table  >
//                 <thead>
//                     <tr>
//                         <th scope="col" className="headernametable">Name</th>
//                         <th scope="col" className="headernametable">Close</th>
//                         <th scope="col" className="headernametable">LastClose</th>
//                         <th scope="col" className="headernametable">Up</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {this.state.stockfinal.map(stocks =>
//                         <tr>
//                             <td>{stocks.stockName}</td>
//                             <td>{stocks.last1}</td>
//                             <td>{stocks.last2}</td>
//                             <td style={{ color: "green " }}>{stocks.res.toFixed(4)}▲</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </Table >
//         </Card>
//     </Grid>
// </div>);