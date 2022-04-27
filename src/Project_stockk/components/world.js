import React, { Component } from "react";
import { Grid, Card } from 'react-mdl';
import { Table } from 'semantic-ui-react';
class World extends Component {

    constructor(props) {
        super(props);
        this.state = { activeTab: 0 };
        this.state = { world: [] };

        fetch('http://localhost:3015/world')
            .then(response => response.json())
            .then(world => (this.setState({ world }))
            )
    }

    render() {
        return (
            <div class="col-12" style={{display: 'flex', justifyContent: 'center'}}>
                <Card style={{ borderRadius: 10, height: 300 , width: 580,overflowX: "scroll" }}>
                    <Table  >
                        <thead>
                            <tr>
                                <th scope="col" className="headernametable">ชื่อหุ้น</th>
                                <th scope="col" className="headernametable">เปิด</th>
                                <th scope="col" className="headernametable">ปิด</th>
                                <th scope="col" className="headernametable">ขึ้น</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.world.map(stocks => {if(stocks.ABC < 0){ 
                                if (stocks.Name == "DAX") {
                                    return(
                                    <tr>
                                        <td>{stocks.Name}</td>
                                        <td>{stocks.Open.toFixed(2)}</td>
                                        <td>{stocks.Close.toFixed(2)}</td>
                                        <td style={{ color: "red" }}>{stocks.ABC.toFixed(2)}▼(USD)</td>
                                    </tr>
                                    )
                                }
                                else if (stocks.Name == "^DJI") {
                                    return(
                                    <tr>
                                        <td>{stocks.Name}</td>
                                        <td>{stocks.Open.toFixed(2)}</td>
                                        <td>{stocks.Close.toFixed(2)}</td>
                                        <td style={{ color: "red" }}>{stocks.ABC.toFixed(2)}▼(USD)</td>
                                    </tr>
                                    )
                                }
                                else if (stocks.Name == "SPXL") {
                                    return(
                                    <tr>
                                        <td>{stocks.Name}</td>
                                        <td>{stocks.Open.toFixed(2)}</td>
                                        <td>{stocks.Close.toFixed(2)}</td>
                                        <td style={{ color: "red" }}>{stocks.ABC.toFixed(2)}▼(USD)</td>
                                    </tr>
                                    )
                                }
                                else if (stocks.Name == "^N225") {
                                    return(
                                    <tr>
                                        <td>{stocks.Name}</td>
                                        <td>{stocks.Open.toFixed(2)}</td>
                                        <td>{stocks.Close.toFixed(2)}</td>
                                        <td style={{ color: "red" }}>{stocks.ABC.toFixed(2)}▼(JPY)</td>
                                    </tr>
                                    )
                                }
                                else if (stocks.Name == "^AXJO") {
                                    return(
                                    <tr>
                                        <td>{stocks.Name}</td>
                                        <td>{stocks.Open.toFixed(2)}</td>
                                        <td>{stocks.Close.toFixed(2)}</td>
                                        <td style={{ color: "red" }}>{stocks.ABC.toFixed(2)}▼(AUD)</td>
                                    </tr>
                                    )
                                }
                                else if (stocks.Name == "^SSMI") {
                                    return(
                                    <tr>
                                        <td>{stocks.Name}</td>
                                        <td>{stocks.Open.toFixed(2)}</td>
                                        <td>{stocks.Close.toFixed(2)}</td>
                                        <td style={{ color: "red" }}>{stocks.ABC.toFixed(2)}▼(CHF)</td>
                                    </tr>
                                    )
                                }
                            }else{
                                if (stocks.Name == "DAX") {
                                    return(
                                    <tr>
                                        <td>{stocks.Name}</td>
                                        <td>{stocks.Open.toFixed(2)}</td>
                                        <td>{stocks.Close.toFixed(2)}</td>
                                        <td style={{ color: "green" }}>{stocks.ABC.toFixed(2)}▲(USD)</td>
                                    </tr>
                                    )
                                }
                                else if (stocks.Name == "SPXL") {
                                    return(
                                    <tr>
                                        <td>{stocks.Name}</td>
                                        <td>{stocks.Open.toFixed(2)}</td>
                                        <td>{stocks.Close.toFixed(2)}</td>
                                        <td style={{ color: "red" }}>{stocks.ABC.toFixed(2)}▲(USD)</td>
                                    </tr>
                                    )
                                }
                                else if (stocks.Name == "^DJI") {
                                    return(
                                    <tr>
                                        <td>{stocks.Name}</td>
                                        <td>{stocks.Open.toFixed(2)}</td>
                                        <td>{stocks.Close.toFixed(2)}</td>
                                        <td style={{ color: "green" }}>{stocks.ABC.toFixed(2)}▲(USD)</td>
                                    </tr>
                                    )
                                }
                                else if (stocks.Name == "^N225") {
                                    return(
                                    <tr>
                                        <td>{stocks.Name}</td>
                                        <td>{stocks.Open.toFixed(2)}</td>
                                        <td>{stocks.Close.toFixed(2)}</td>
                                        <td style={{ color: "green" }}>{stocks.ABC.toFixed(2)}▲(JPY)</td>
                                    </tr>
                                    )
                                }
                                else if (stocks.Name == "^AXJO") {
                                    return(
                                    <tr>
                                        <td>{stocks.Name}</td>
                                        <td>{stocks.Open.toFixed(2)}</td>
                                        <td>{stocks.Close.toFixed(2)}</td>
                                        <td style={{ color: "green" }}>{stocks.ABC.toFixed(2)}▲(AUD)</td>
                                    </tr>
                                    )
                                }
                                else if (stocks.Name == "^SSMI") {
                                    return(
                                    <tr>
                                        <td>{stocks.Name}</td>
                                        <td>{stocks.Open.toFixed(2)}</td>
                                        <td>{stocks.Close.toFixed(2)}</td>
                                        <td style={{ color: "green" }}>{stocks.ABC.toFixed(2)}▲(CHF)</td>
                                    </tr>
                                    )
                                }
                            }})}
                        </tbody>
                    </Table >
                </Card>
            </div>
        );
    }
} export default World;

// import React, { Component } from "react";
// import { Tabs, Tab, Grid, Cell, Card, CardTitle, CardText, CardActions, Button, CardMenu, IconButton } from 'react-mdl';
// import { Icon, Label, Menu, Table } from 'semantic-ui-react';

// var today = new Date();
// var dateValue = today.getDay();
// class World extends Component {

//     constructor(props) {
//         super(props);
//         this.state = { activeTab: 0 };
//         this.state = { worldsu: [], world: [], worldmo: [],worldtu: [] };

//         fetch('http://203.154.83.54:8800/world')
//             .then(response => response.json())
//             .then(world => (this.setState({ world }))
//             )

//         fetch('http://203.154.83.54:8800/world1')
//             .then(response => response.json())
//             .then(worldsu => (this.setState({ worldsu }))
//             )

//         fetch('http://203.154.83.54:8800/world2')
//             .then(response => response.json())
//             .then(worldmo => (this.setState({ worldmo }))
//             )

//         fetch('http://203.154.83.54:8800/world3')
//             .then(response => response.json())
//             .then(worldtu => (this.setState({ worldtu }))
//             )
//     }

//     render() {
//         if (dateValue == 0 || dateValue == 1 ) {
//             if (dateValue == 0) {
//                 return (<div>
//                     <Grid item xs={6}>
//                         <Card style={{ borderRadius: 10,width: 580, height: 300 }}>
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
//                                     {this.state.worldsu.map(stocks =>
//                                         <tr>
//                                             <td>{stocks.Name}</td>
//                                             <td>{stocks.Open.toFixed(2)}</td>
//                                             <td>{stocks.Close.toFixed(2)}</td>
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
//                         <Card style={{ borderRadius: 10,width: 580, height: 300 }} >
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
//                                     {this.state.worldmo.map(stocks =>
//                                         <tr>
//                                             <td>{stocks.Name}</td>
//                                             <td>{stocks.Open.toFixed(2)}</td>
//                                             <td>{stocks.Close.toFixed(2)}</td>
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
//             if (dateValue == 2 && this.state.world.length == 0) {
//                 return (<div>
//                     <Grid item xs={6}>
//                         <Card style={{ borderRadius: 10,width: 580, height: 300 }}>
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
//                                     {this.state.worldtu.map(stocks =>
//                                         <tr>
//                                             <td>{stocks.Name}</td>
//                                             <td>{stocks.Open.toFixed(2)}</td>
//                                             <td>{stocks.Close.toFixed(2)}</td>
//                                             <td style={{ color: "green " }}>{stocks.AB.toFixed(4)}▲</td>
//                                         </tr>
//                                     )}
//                                 </tbody>
//                             </Table >
//                         </Card>
//                     </Grid>
//                 </div>);
//             } else {
//                 if(this.state.world.length == 0){
//                     if(this.state.worldsu.length == 0){
//                         return (<div>
//                             <Grid item xs={6}>
//                                 <Card style={{ borderRadius: 10,width: 580, height: 300 }}>
//                                     <Table  >
//                                         <thead>
//                                             <tr>
//                                                 <th scope="col" className="headernametable">Name</th>
//                                                 <th scope="col" className="headernametable">Close</th>
//                                                 <th scope="col" className="headernametable">LastClose</th>
//                                                 <th scope="col" className="headernametable">Up</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {this.state.worldmo.map(stocks =>
//                                                 <tr>
//                                                     <td>{stocks.Name}</td>
//                                                     <td>{stocks.Open.toFixed(2)}</td>
//                                                     <td>{stocks.Close.toFixed(2)}</td>
//                                                     <td style={{ color: "green " }}>{stocks.ABC.toFixed(4)}▲</td>
//                                                 </tr>
//                                             )}
//                                         </tbody>
//                                     </Table >
//                                 </Card>
//                             </Grid>
//                         </div>);    
//                     }else{
//                         return (<div>
//                             <Grid item xs={6}>
//                                 <Card style={{ borderRadius: 10, width: 580, height: 300 }}>
//                                     <Table  >
//                                         <thead>
//                                             <tr>
//                                                 <th scope="col" className="headernametable">Name</th>
//                                                 <th scope="col" className="headernametable">Close</th>
//                                                 <th scope="col" className="headernametable">LastClose</th>
//                                                 <th scope="col" className="headernametable">Up</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {this.state.worldsu.map(stocks =>
//                                                 <tr>
//                                                     <td>{stocks.Name}</td>
//                                                     <td>{stocks.Open.toFixed(2)}</td>
//                                                     <td>{stocks.Close.toFixed(2)}</td>
//                                                     <td style={{ color: "green " }}>{stocks.ABC.toFixed(4)}▲</td>
//                                                 </tr>
//                                             )}
//                                         </tbody>
//                                     </Table >
//                                 </Card>
//                             </Grid>
//                         </div>); 
//                     }   
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
//                                         {this.state.world.map(stocks =>
//                                             <tr>
//                                                 <td>{stocks.Name}</td>
//                                                 <td>{stocks.Open.toFixed(2)}</td>
//                                                 <td>{stocks.Close.toFixed(2)}</td>
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
// } export default World;