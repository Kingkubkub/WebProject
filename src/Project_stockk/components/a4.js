
import React, { Component } from 'react';
import { Tabs, Tab, Grid, Cell, Card, CardTitle, CardText, CardActions, Button, CardMenu, IconButton } from 'react-mdl';
//HighChart Modules
import ReactHighcharts from "react-highcharts";
//HighCharts settings, type and data



class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        open: false
      }
    }
    
    render() {
      return (
        <div className="col-sm-4 col-sm-offset-4">
          <div className="panel-group">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <button class="btn btn-success" href="#"
                    onClick={function(){this.setState({open:!this.state.open})}.bind(this)} >Collapsible list group</button>
                </h4>
              </div>
              <div className={this.state.open? "panel-collapse": "panel-collapse panel-close"}>       
                <ul className="list-group">
                  <li className="list-group-item">One</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }     
export default App;