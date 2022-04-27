import React, { Component } from "react";
import { MDBListGroup, MDBListGroupItem,MDBBadge} from "mdbreact";
import moment from "moment";
import 'moment-timezone';
class news extends Component {

    constructor(props) {
        super(props);
        this.state = { stocknews: [],isLoaded: false,};
        
        fetch('http://localhost:3015/stocknews')
            .then(response => response.json())
            .then(stocknews => (this.setState({ stocknews,isLoaded: true }))
            )
    }
    render() {
        var { isLoaded, items } = this.state;
        if (!isLoaded) {
            return <div className = "gallery"> Loading...
                <center>
                <img src="https://isometric.online/wp-content/uploads/2019/07/Web_SVG.svg" alt="https://isometric.online/"/> 
                </center>
            </div>
        }
        return (
            <div className="App"> 
                <MDBListGroup className="newsstock" style={{ width: "" }}>
                {this.state.stocknews.map(item => (
                    <MDBListGroupItem style={{ width: "" ,backgroundColor: "#ecf0f1"}}>
                        <div className="d-flex w-100 justify-content-between">
                            <a className="mb-1" style={{ textDecoration: "none", color: "red", fontSize: 20}} href={item.URL_web} target="_blank">{item.Title}</a>
                        </div>
                        <div class="row">
                            <div class="col-12 col-xs-12">
                                <center><img src={item.URL_img} width={250} height={200}  alt="" title="Google Images"   /></center>
                            </div>
                            <div class="col-12 col-xs-12">
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
            </div>
        );     
    }
}

export default news;

// import React, { Component } from "react";
// import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";

// class news extends Component {

//     constructor(props) {
//         super(props);
//         this.state = { stocknews: [],isLoaded: false,};
        
//         fetch('http://localhost:3015/stocknews')
//             .then(response => response.json())
//             .then(stocknews => (this.setState({ stocknews,isLoaded: true }))
//             )
//     }
//     render() {
//         var { isLoaded, items } = this.state;
//         if (!isLoaded) {
//             return <div className = "gallery"> Loading...
//                 <center>
//                 <img src="https://isometric.online/wp-content/uploads/2019/07/Web_SVG.svg" alt="https://isometric.online/"/> 
//                 </center>
//             </div>
//         }
//         return (
//             <div className="App">             
//                 {this.state.stocknews.map(item => (
//                 <div class="row justify-content-center" style={{background: "#ecf0f1"}}>
//                     <div class="col-6">
//                     <center>
//                         <img src={item.URL_img} width={400} height={250}  alt="" title="Google Images"   />
//                     </center>
//                     </div>
//                     <div className="col-6 headerthe" key={item.title}> 
//                         <a style={{ textDecoration: "none", color: "red", fontSize: 20}} href={item.URL_web} target="_blank" >
//                             {item.Title}
//                         </a>
//                         <br/> <br/>
//                         <a>
//                             {(item.Date.toString().split('T')[0])} 
//                         </a>
//                         <br/> <br/>
//                         <a>
//                             {item.Detail}
//                         </a>           
//                     </div>
//                     <div class="text-center">
//                     ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂
//                     </div>
//                     <br /> <br /> <br/> <br/>
//                 </div>
//             ))}
//         </div>);
        
//     }
// }

// export default news;