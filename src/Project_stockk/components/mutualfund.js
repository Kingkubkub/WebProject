import { Tabs, Tab, Grid, Cell, Card, CardTitle, CardText, CardActions, Button, CardMenu, IconButton } from 'react-mdl';
import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class Mutualfund extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
    this.state = { nav: [], nav1: [], nav2: [], nav3: [], nav4: [],navs: [] };

    fetch('http://localhost:3015/navs')
      .then(response => response.json())
      .then(nav => (this.setState({ nav }))
      )

  }
  render() {
    return (
      <div class="col-12" style={{display: 'flex', justifyContent: 'center'}}>
        <Card style={{ borderRadius: 10, width: 580, height: 300 ,overflowX: "scroll",overflowY: "scroll"  }}>
          <Table class="">
            <thead>
              <tr>
                <th scope="col" className="headernametable2">ชื่อกองทุน</th>
                <th scope="col" className="headernametable">NAV</th>
              </tr>
            </thead>
            <tbody>
              {this.state.nav.map(na =>
                <tr>
                  <td className="headerthe">{na.proj_name_th}</td>
                  <td>{na.last_val}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      </div >
    );
  }
} export default Mutualfund;

// import { Tabs, Tab, Grid, Cell, Card, CardTitle, CardText, CardActions, Button, CardMenu, IconButton } from 'react-mdl';
// import React, { Component } from 'react';

// var today = new Date();
// var dateValue = today.getDay();
// class Mutualfund extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { activeTab: 0 };
//     this.state = { nav: [], nav1: [], nav2: [], nav3: [], nav4: [],navs: [] };

//     fetch('http://localhost:3015/navs')
//       .then(response => response.json())
//       .then(nav => (this.setState({ nav }))
//       )
//     fetch('http://203.154.83.54:8800/nav1')
//       .then(response => response.json())
//       .then(nav1 => (this.setState({ nav1 }))
//       )
//     fetch('http://203.154.83.54:8800/nav2')
//       .then(response => response.json())
//       .then(nav2 => (this.setState({ nav2 }))
//       )
//     fetch('http://203.154.83.54:8800/nav3')
//       .then(response => response.json())
//       .then(nav3 => (this.setState({ nav3 }))
//       )
//     fetch('http://203.154.83.54:8800/nav4')
//       .then(response => response.json())
//       .then(nav4 => (this.setState({ nav4 }))
//       )

//   }
//   render() {
//     if (this.state.nav.length == 5) {
//       return (
//         <Grid item xs={6}>
//           <Card style={{ borderRadius: 10, width: 580, height: 300 }}>
//             <table class="table">
//               <thead>
//                 <tr>
//                   <th scope="col" className="headernametable2">Name</th>
//                   <th scope="col" className="headernametable">Net</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {this.state.nav.map(na =>
//                   <tr>
//                     <td className="headerthe">{na.proj_name_th}</td>
//                     <td>{na.last_val}</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </Card>
//         </Grid >
//       );
//     } else {
//       if (this.state.nav1.length == 5) {
//         return (
//           <Grid item xs={6}>
//             <Card style={{ borderRadius: 10, width: 580, height: 300 }}>
//               <table class="table">
//                 <thead>
//                   <tr>
//                     <th scope="col" className="headernametable2">Name</th>
//                     <th scope="col" className="headernametable">Net</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {this.state.nav1.map(na =>
//                     <tr>
//                       <td className="headerthe">{na.proj_name_th}</td>
//                       <td>{na.last_val}</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </Card>
//           </Grid >
//         );
//       } else {
//         if (this.state.nav2.length == 5) {
//           return (
//             <Grid item xs={6}>
//               <Card style={{ borderRadius: 10, width: 580, height: 300 }}>
//                 <table class="table">
//                   <thead>
//                     <tr>
//                       <th scope="col" className="headernametable2">Name</th>
//                       <th scope="col" className="headernametable">Net</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {this.state.nav2.map(na =>
//                       <tr>
//                         <td className="headerthe">{na.proj_name_th}</td>
//                         <td>{na.last_val}</td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </Card>
//             </Grid >
//           );
//         } else {
//           if (this.state.nav3.length == 5) {
//             return (
//               <Grid item xs={6}>
//                 <Card style={{ borderRadius: 10, width: 580, height: 300 }}>
//                   <table class="table">
//                     <thead>
//                       <tr>
//                         <th scope="col" className="headernametable2">Name</th>
//                         <th scope="col" className="headernametable">Net</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {this.state.nav3.map(na =>
//                         <tr>
//                           <td className="headerthe">{na.proj_name_th}</td>
//                           <td>{na.last_val}</td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </Card>
//               </Grid >
//             );
//           } else {
//               return (
//                 <Grid item xs={6}>
//                   <Card style={{ borderRadius: 10, width: 580, height: 300 }}>
//                     <table class="table">
//                       <thead>
//                         <tr>
//                           <th scope="col" className="headernametable2">Name</th>
//                           <th scope="col" className="headernametable">Net</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {this.state.nav4.map(na =>
//                           <tr>
//                             <td className="headerthe">{na.proj_name_th}</td>
//                             <td>{na.last_val}</td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </Card>
//                 </Grid >
//               );
//           }
//         }
//       }
//     }
//   }
// } export default Mutualfund;