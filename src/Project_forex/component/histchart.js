import React from 'react'
import { memo } from "react";

import { Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'

import { Chart as Cha } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

Cha.register(zoomPlugin);

let color = 'rgba(0, 0, 0, 1)';

let red = 'rgba(255, 99, 132, 1)' //red
let sea_green = 'rgba(46, 139, 87, 1)' //sea green

const HistChart = (props) => {
    let close = [];
    let open = [];
    let hight = [];
    let low = [];
    let time = [];
    const forex_name = props.name;
    let data = props.forex_obj
    let timedelta = props.timedelta
    let  timeframe = props.timeframe
    var from_date = new Date();
    from_date.setDate( from_date.getDate() - timedelta );
    var date = new Date();

    let show_dict = {
      "M1":110,
      "M5":100,
      "M15":90,
      "M30":80,
      "H1":70,
      "H4":30,
      "D1":20
    } 
    //const myref = props.myref
    //console.log("this is data = ", data)
    function fillUp(element) {
        close.push(element.close)
        open.push(element.open)
        hight.push(element.high)
        low.push(element.low)
        // Cut time 
        let take = element.time
        take = take.split('.')
        //take = take[1].split('.')
        //
        time.push(take[2])
        return true
    }

    if (data !== undefined) {
      try{
        data.every(fillUp)
      }catch(e){
        console.log(e)
      }
        
        //added null value for the right of the chart
        close.push(null)
        close.push(null)
        close.push(null)
        open.push(null)
        open.push(null)
        open.push(null)
        hight.push(null)
        hight.push(null)
        hight.push(null)
        low.push(null)
        low.push(null)
        low.push(null)
        time.push(null)
        time.push(null)
        time.push(null)
        //
    }
    else{
        console.log('try again')
        console.log(data)
    }
  return (
    <div>
      <Bar
        data={{
          labels: time,
          datasets: [{
              data: time.map((element, index) => {
                return [open[index], close[index]]; //return array2d cause will use to defind head and tail of the bar
              }),
              backgroundColor: time.map((element, index) => {
                return (open[index] > close[index] ? red : sea_green);
              }),
              borderWidth: 0,
              spanGaps: true, // allow null value to represent
              order: 1
            },
            {
              data: time.map((element, index) => {
                return [hight[index], low[index]];
              }),
              backgroundColor: 'rgba(0, 0, 0, 0.5)', //red
              borderWidth: 0,
              barThickness: 1,
              spanGaps: true, // allow null value to represent
              order: 1
            }
          ]
        }}
        options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                  beginAtZero: false,
                  position: "right"
                },
                x: {
                  stacked: true,
                  ticks:{
                    maxTicksLimit: 6,
                    autoSkip: true,
                    autoSkipPadding: 50,
                    maxRotation: 0
                  },
                  min: time.length-show_dict[timeframe],
                  max: time.length
                }
            },
            animation: {
              duration: 600,
            },
            datasets: {
              line: {
                  pointRadius: 0 // disable for all `'line'` datasets
              }
            },
            elements: {
                point: {
                    radius: 0 // default to disabled in all datasets
                }
            },
            tooltips: {
              mode: 'index',
              intersect: false
            },
            hover: {
                mode: 'index',
                intersect: false
            },
            plugins: {
              title: {
                  display: true,
                  text: forex_name+" "+from_date.toLocaleDateString("en-US")+" -> "+date.toLocaleDateString("en-US"),
                  font: {
                    size: 20
                  }
              },
              legend: {
                display: false
              },
              zoom: {
                pan: {
                  enabled: true,
                  mode: 'xy'
                  //onPanStart({chart,point})
                },
                limits: {
                  y: {min: 0, max: 100,position: "right"},
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    drag: true,
                    mode: 'x'
                }
              }
            }
        }}
        height={400}
        width={800}
      />
    </div>
  )
}

export default memo(HistChart)