import React, { Component } from "react";
import { Grid , Card} from 'react-mdl';
import { MDBListGroup, MDBListGroupItem} from "mdbreact";
class eventcovid extends Component {

    constructor(props) {
        super(props);
        this.state = { activeTab: 0 };
        this.state = { eventcovid: [],eventcovid2: []};
        fetch('http://localhost:3015/eventcovid')
            .then(response => response.json())
            .then(eventcovid => (this.setState({ eventcovid }))
        )
        fetch('http://localhost:3015/eventcovid2')
            .then(response => response.json())
            .then(eventcovid2 => (this.setState({ eventcovid2 }))
        )
    }

    render() {
        return (
        <div class="col-12" style={{display: 'flex', justifyContent: 'center'}}>
            <Card style={{ borderRadius: 10, width: 580, height: 310 }}>
                <MDBListGroup className="newsstock" style={{ width: "" }}>                  
                    <MDBListGroupItem>                       
                        <div class="row">
                            {this.state.eventcovid.map(item =>
                                <div class="col-6">
                                    <div className="d-flex w-100">
                                        <img width={20} height={20} src="http://www.สถาบันภาษาเอ็นวายซี.com/uploads/2/4/6/6/24664794/s689630753364681404_p2_i1_w250.png" class="img-fluid z-depth-1 rounded-circle" alt="Responsive image"/>
                                        <a className="mb-1" style={{ textDecoration: "none", color: "red", fontSize: 20}} href={'/imstockseach/'+item.Name} target="_blank">{item.Name}</a>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <p className="mb-1" style={{ color: "green " }}>{item.point_diff.toFixed(2)}%▲</p>
                                        </div>
                                    </div>  
                                </div>
                            )}
                            {/* {this.state.eventcovid2.map(item =>
                                <div class="col-6">
                                    <div className="d-flex w-100">
                                        <img width={20} height={20} src="http://www.สถาบันภาษาเอ็นวายซี.com/uploads/2/4/6/6/24664794/s689630753364681404_p2_i1_w250.png" class="img-fluid z-depth-1 rounded-circle" alt="Responsive image"/>
                                        <a className="mb-1" style={{ textDecoration: "none", color: "red", fontSize: 20}} href={'/imstockseach/'+item.Name} target="_blank">{item.Name}</a>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <p className="mb-1" style={{ color: "green " }}>{item.point_diff.toFixed(2)}▲</p>
                                        </div>
                                    </div>  
                                </div>   
                            )}  */}
                        </div>             
                    </MDBListGroupItem>                
                </MDBListGroup> 
            </Card>
        </div>
        );                   
    }
} export default eventcovid;