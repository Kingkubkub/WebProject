import React from 'react'
import { memo } from "react";

import { Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'


const Horizontal_Bar_Chart = (props) => {

  const datao = props.datao
  const timeframe = props.timeframe
  const zigzag = props.zigzag
  const point = props.point
  const direction = props.direction
  const gc = props.gc
  // console.log(datao)
  // console.log(timeframe)
  // console.log(zigzag)
  // console.log(point)
  // console.log(direction)
  // console.log(gc)
  //validate
  let almost_leaf_lv_data = "" //stored data to use in this sheet
  let str_direction = ""
  let from = ""
  let to = ""
  let label_fill = []
  let data_fill = []
  let max = 0
  try{
    almost_leaf_lv_data = datao[0]["timeframe"][`${timeframe}`][zigzag][gc]
    if( direction == "from_high"){
      str_direction = "⭸   "; //⭸  ถึงจุดที่
      from = "from_high_";//not use
      to = "to_low_";
    }else{
      //console.log("In else ⭷  ถึงจุดที่");
      str_direction = "⭷   ";//⭷  ถึงจุดที่
      from = "from_low_";//not use
      to = "to_high_";
    }
    // ******************************** พระเอก
    for(let i = 0; i<20; i++){
      let define = to+(i+1)+"00"
      let result = ""
      try{
        result = almost_leaf_lv_data[direction+"_"+point][define]
      }
      catch{
        result = undefined
      }
      //console.log(from_High_to_low["from_high_"+from]["to_low_"+to]); //debug
      if(result != undefined){
        //elements_fill.push(<p key={i}>{str_define} {number_to} เป็นจำนวน {result} ครั้ง</p>)
        label_fill.push(str_direction+(i+1)+"00")
        data_fill.push(result)
        if(result > max) max=result
      }
      else{
        //elements_fill.push(<p key={i}>{str_define} {number_to} เป็นจำนวน 0 ครั้ง</p>)
        label_fill.push(str_direction+(i+1)+"00")
        data_fill.push(0)
      }
    }
    // console.log(label_fill)
    // console.log(data_fill)
    // ********************************
  }
  catch(e){
    console.log(e)
    return (
      <h2>INVALID VALUE</h2>
    )
  }
  //
  return (
    <div>
      <Bar
        data={{
          labels: label_fill,
          datasets: [{
            axis: 'y',
            label: 'จำนวนครังการกลับตัว',
            data: data_fill,
            fill: false,
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)'

            ],
            borderColor: [
              'rgb(75, 192, 192)'
            ],
            borderWidth: 1
          }]
        }}
        options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              x : {
                ticks: {
                  precision: 0,
                  maxTicksLimit: 10,
                  autoSkip: true,
                  autoSkipPadding: 100,
                  maxRotation: 0
                }
              },
              y: {
                  suggestedMin: 0,
                  suggestedMax: max+1
              }
            }
        }}
        height={400}
        width={800}
      />
    </div>
  )
}

export default memo(Horizontal_Bar_Chart)