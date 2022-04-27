import { Tabs, Tab, Grid, Cell, Card, CardTitle, CardText, CardActions, Button, CardMenu, IconButton } from 'react-mdl';
import React, { Component } from 'react';
import ReactHighcharts from "react-highcharts";
import {
    HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Legend, LineSeries, Caption
} from "react-jsx-highcharts";

class Mainstock extends Component {
    constructor(props) {
        super(props);
        this.state = { activeTab: 0 };
        this.state = { users: [] };
        this.state.activeTab = 0;

        fetch('http://119.59.100.61:8800/exchange')
            .then(response => response.json())
            .then(users => (this.setState({ users }))
            )
    }

    toggleCategories() {
        const config = {
            chart: {
                type: 'spline'
            },
            title: {
                text: ''
            },
            series: [
                {
                    "id": "chf", "name": "รายได้", "data": this.state.users.map(user => user.CHF)

                },
                {
                    "id": "eur","name": "รายจ่าย", "data": this.state.users.map(user => user.EUR),
                },
                {
                    "id": "usd","name": "จําไร", "data": this.state.users.map(user => user.USD),
                },
                {
                    "id": "aud","name": "EBITDA", "data": this.state.users.map(user => user.AUD),
                },
                
                
            ]
        };

        if (this.state.activeTab === 0) {
            return (

                <div className="app">
                    <ReactHighcharts config={config}></ReactHighcharts>
                </div>

            )
        }

    }



    render() {

        return (
            <div>
                <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
                    <Tab>PTT Chart</Tab>

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

export default Mainstock;