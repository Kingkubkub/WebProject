import * as React from 'react';
import { Avatar, Container, Grid, Paper } from '@mui/material';

import Navebar from './Navebar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import Forexbg3 from '../Img/Forexbg3.jpg'
//te
import { useParams } from 'react-router-dom';
import Horizontal_Bar_Chart from '../component/Horizontal_Bar_Chart';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import BasicTable from '../component/table'
//*


const theme = createTheme({
  palette: {
    secondary: {
      main: '#11cb5f',
    },
  },
});

function Forex() {
  
  const [datao, setDatao] = useState(0);
  const [zigzag, setZigzag] = useState(0);
  const [timeframe, setTimeframe] = useState(0);
  let { forex_name } = useParams()
  console.log(forex_name)

  useEffect(() => {
    // 
    console.log("in use effect")
    const ENDPOINT = "http://118.173.233.163:5000/mongo_forexStat_request/"+forex_name
    fetch(ENDPOINT)
      .then( response =>{
        if(response.ok){
          console.log("In OK fetch")
          return response.json()
        }
        throw response
      })
      .then(data =>{
        console.log("DATA = ",data);
        setDatao(data);
        const temp = Object.keys(data[0]["timeframe"])[0]
        //console.log(Object.keys(data[0]["timeframe"][`${temp}`])[0])
        setTimeframe(temp)
        setZigzag(Object.keys(data[0]["timeframe"][`${temp}`])[0])
      })
      .catch(error => {
        console.error("Error Fetching data" , error);
      })
      //console.log("datao = ",datao[0].forexName.zigzig_parameter_aka_603015)//example of grab json data to habe only from hight to low to frrom low to hight
  },[]);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  //ZigZag dynamic
  const handle_null_element = (datao, timeframe, zigzag) =>{
    let from = "-"
    let to = "-"
    try{
      from = datao[0]["timeframe"][`${timeframe}`][zigzag]["from_date"]
      to = datao[0]["timeframe"][`${timeframe}`][zigzag]["to_date"]
    }
    catch(e){
    }
    return(
      <p>จากวันที่ {from} <span>ถึงวันที่ {to}</span></p>
    )
  }

  const handleChangeDropdownZigZag = (event) => {
    setZigzag(event.target.value);
  };
  const handleChangeDropdownTimeframe= (event) => {
    setTimeframe(event.target.value);
  };

  const Dropdown_zigzagANDtimeframe_controll= () => {
    return (<>
      {datao && timeframe && zigzag && <div style={{textAlign:"center"}}>
        <Select
            labelId="timeframe_label"
            id="timeframe_id"
            value={timeframe}
            onChange={handleChangeDropdownTimeframe}
            style={{marginRight:"10px"}}
          >
          {Object.keys(datao[0]["timeframe"]).map((c,index) => {
            return (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            );
            })} 
          </Select>
         <Select
          labelId="zigzag_label"
          id="zigzag_id"
          value={zigzag}
          onChange={handleChangeDropdownZigZag}
        >
          {datao && Object.keys(datao[0]["timeframe"][`${timeframe}`]).map((c,index) => {
          return (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          );
          })}
        </Select>
        <div style={{ height: "20px" }} />
        {handle_null_element(datao,timeframe,zigzag)}
      </div>}</>
    )
  }
  //

  //this variable use to controll each conlapse
  //from hight
  const [open_1, setOpen_1] = useState(false);
  const [open_2, setOpen_2] = useState(false);
  const [open_3, setOpen_3] = useState(false);
  const [open_4, setOpen_4] = useState(false);
  const [open_5, setOpen_5] = useState(false);
  const [open_6, setOpen_6] = useState(false);
  const [open_7, setOpen_7] = useState(false);
  const [open_8, setOpen_8] = useState(false);
  const [open_9, setOpen_9] = useState(false);
  const [open_10, setOpen_10] = useState(false);
  const [open_11, setOpen_11] = useState(false);
  const [open_12, setOpen_12] = useState(false);
  const [open_13, setOpen_13] = useState(false);
  const [open_14, setOpen_14] = useState(false);
  const [open_15, setOpen_15] = useState(false);
  const [open_16, setOpen_16] = useState(false);
  const [open_17, setOpen_17] = useState(false);
  const [open_18, setOpen_18] = useState(false);
  const [open_19, setOpen_19] = useState(false);
  const [open_20, setOpen_20] = useState(false);

  //from low
  const [open_1_low, setOpen_1_low] = useState(false);
  const [open_2_low, setOpen_2_low] = useState(false);
  const [open_3_low, setOpen_3_low] = useState(false);
  const [open_4_low, setOpen_4_low] = useState(false);
  const [open_5_low, setOpen_5_low] = useState(false);
  const [open_6_low, setOpen_6_low] = useState(false);
  const [open_7_low, setOpen_7_low] = useState(false);
  const [open_8_low, setOpen_8_low] = useState(false);
  const [open_9_low, setOpen_9_low] = useState(false);
  const [open_10_low, setOpen_10_low] = useState(false);
  const [open_11_low, setOpen_11_low] = useState(false);
  const [open_12_low, setOpen_12_low] = useState(false);
  const [open_13_low, setOpen_13_low] = useState(false);
  const [open_14_low, setOpen_14_low] = useState(false);
  const [open_15_low, setOpen_15_low] = useState(false);
  const [open_16_low, setOpen_16_low] = useState(false);
  const [open_17_low, setOpen_17_low] = useState(false);
  const [open_18_low, setOpen_18_low] = useState(false);
  const [open_19_low, setOpen_19_low] = useState(false);
  const [open_20_low, setOpen_20_low] = useState(false);
  //
  /*
  const handleClick = ( controller ) => {
    switch (controller) {
      case 0:
        setOpen_0(!open_0);
        break;
      case 1:
        setOpen_1(!open_1);
        break;
    }
  };
  */

  return (

    <div className='BGColor'>


      <Navebar />

      <div className='zin '>



      <section class="showcase5 showcase-Zigzag">

          <img src={Forexbg3} className='im' />
          <div class="overlay"></div>
          <div className="maincon-Zigzag">

            <div class="text textcom-forexai" style={{ textAlign: "center" }}>
              <div style={{ height: "0px" }} />
              <h4 className='font colortext'>สถิติการกลับตัวของ {forex_name}</h4>



            </div>


          </div>
  
        </section>



         


            <div style={{ height: "20px" }} />

            <Grid container spacing={2}>


              

                <Grid item xs={12}>

                  <div className='maincon-Zigzag-insite'>

                  <div style={{ height: "20px" }} />

                  <div style={{ textAlign: "center" }}>
                    <h3>Indicator ZigZag</h3>
                  </div>
                  <div style={{ height: "20px" }} />

                  {datao && Dropdown_zigzagANDtimeframe_controll()}

                  <div style={{ height: "20px" }} />

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl>
                      <div style={{textAlign:"center"}}>
                        <h3>ภาพรวม Up - down ⭷  ⭸</h3>
                        <div style={{ height: "10px" }} />
                        {datao && timeframe && zigzag && <BasicTable datao={datao} timeframe={timeframe} zigzag={zigzag} direction="from_high" gc="from_Hight_to_Low_aka_GC"></BasicTable>}
                      </div>
                    </Grid>
                    <div style={{ height: "40px" }} />

                    <Grid item xs={12} sm={12} md={12} lg={12} xl>
                      <div style={{textAlign:"center"}}>
                        <h3>ภาพรวม Down - up ⭸  ⭷  </h3>
                        <div style={{ height: "10px" }} />
                        {datao && timeframe && zigzag && <BasicTable datao={datao} timeframe={timeframe} zigzag={zigzag} direction="from_low" gc="from_Low_To_Hight_aka_GC"></BasicTable>}
                      </div>
                    </Grid>
                  </Grid>

                  <div style={{ height: "40px" }} />

                  <Grid container>

                    <Grid item xs={12} xm={6} md={6} lg={6}>



                      <List
                        sx={{ width: '100%', bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                          <ListSubheader component="div" id="nested-list-subheader" style={{textAlign:"center"}}>
                            <span className='fontlowtoh' style={{fontWeight:"bold"}}><h3>Up - down ⭷  ⭸</h3></span>
                          </ListSubheader>
                        }
                      >
                      </List>

                        <ListItemButton onClick={() => setOpen_1(!open_1)}>
                          <p className='font' style={{ marginRight: "10px" }}>⭷ ระยะที่</p><ListItemText primary="100" />
                          {open_1 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_1} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="100" direction="from_high" gc="from_Hight_to_Low_aka_GC"></Horizontal_Bar_Chart>
                          </List>
                        </Collapse>

                        <ListItemButton onClick={() => setOpen_2(!open_2)}>
                          <p className='font' style={{ marginRight: "10px" }}>⭷ ระยะที่</p><ListItemText primary="200" />
                          {open_2 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_2} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} >
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="200" direction="from_high" gc="from_Hight_to_Low_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>
                        <ListItemButton onClick={() => setOpen_3(!open_3)}>
                          <p className='font' style={{ marginRight: "10px" }}>⭷ ระยะที่</p><ListItemText primary="300" />
                          {open_3 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_3} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} >
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="300" direction="from_high" gc="from_Hight_to_Low_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>
                        <ListItemButton onClick={() => setOpen_4(!open_4)}>
                          <p className='font' style={{ marginRight: "10px" }}>⭷ ระยะที่</p><ListItemText primary="400" />
                          {open_4 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_4} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} >
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="400" direction="from_high" gc="from_Hight_to_Low_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>
                        <ListItemButton onClick={() => setOpen_5(!open_5)}>
                          <p className='font' style={{ marginRight: "10px" }}>⭷ ระยะที่</p><ListItemText primary="500" />
                          {open_5 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_5} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} >
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="500" direction="from_high" gc="from_Hight_to_Low_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>
                        <ListItemButton onClick={() => setOpen_6(!open_6)}>
                          <p className='font' style={{ marginRight: "10px" }}>⭷ ระยะที่</p><ListItemText primary="600" />
                          {open_6 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_6} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} >
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="600" direction="from_high" gc="from_Hight_to_Low_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>
                        <ListItemButton onClick={() => setOpen_7(!open_7)}>
                          <p className='font' style={{ marginRight: "10px" }}>⭷ ระยะที่</p><ListItemText primary="700" />
                          {open_7 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_7} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} >
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="700" direction="from_high" gc="from_Hight_to_Low_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>
                        <ListItemButton onClick={() => setOpen_8(!open_8)}>
                          <p className='font' style={{ marginRight: "10px" }}>⭷ ระยะที่</p><ListItemText primary="800" />
                          {open_8 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_8} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} >
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="800" direction="from_high" gc="from_Hight_to_Low_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>
                        <ListItemButton onClick={() => setOpen_9(!open_9)}>
                          <p className='font' style={{ marginRight: "10px" }}>⭷ ระยะที่</p><ListItemText primary="900" />
                          {open_9 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_9} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} >
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="900" direction="from_high" gc="from_Hight_to_Low_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>
                        <ListItemButton onClick={() => setOpen_10(!open_10)}>
                          <p className='font' style={{ marginRight: "10px" }}>⭷ ระยะที่</p><ListItemText primary="1000" />
                          {open_10 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_10} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} >
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="1000" direction="from_high" gc="from_Hight_to_Low_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>
                        <ListItemButton onClick={() => setOpen_11(!open_11)}>
                          <p className='font' style={{ marginRight: "10px" }}>⭷ ระยะที่</p><ListItemText primary="1100" />
                          {open_11 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_11} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} >
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="1100" direction="from_high" gc="from_Hight_to_Low_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>
                        <ListItemButton onClick={() => setOpen_12(!open_12)}>
                          <p className='font' style={{ marginRight: "10px" }}>⭷ ระยะที่</p><ListItemText primary="1200" />
                          {open_12 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_12} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} >
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="1200" direction="from_high" gc="from_Hight_to_Low_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>
                        <ListItemButton onClick={() => setOpen_13(!open_13)}>
                          <p className='font' style={{ marginRight: "10px" }}>⭷ ระยะที่</p><ListItemText primary="1300" />
                          {open_13 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_13} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} >
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="1300" direction="from_high" gc="from_Hight_to_Low_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>
                        <ListItemButton onClick={() => setOpen_14(!open_14)}>
                          <p className='font' style={{ marginRight: "10px" }}>⭷ ระยะที่</p><ListItemText primary="1400" />
                          {open_14 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_14} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} >
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="1400" direction="from_high" gc="from_Hight_to_Low_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>
                        <ListItemButton onClick={() => setOpen_15(!open_15)}>
                          <p className='font' style={{ marginRight: "10px" }}>⭷ ระยะที่</p><ListItemText primary="1500" />
                          {open_15 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_15} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} >
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="1500" direction="from_high" gc="from_Hight_to_Low_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>
                        <ListItemButton onClick={() => setOpen_16(!open_16)}>
                          <p className='font' style={{ marginRight: "10px" }}>⭷ ระยะที่</p><ListItemText primary="1600" />
                          {open_16 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_16} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} >
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="1600" direction="from_high" gc="from_Hight_to_Low_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>
                        <ListItemButton onClick={() => setOpen_17(!open_17)}>
                          <p className='font' style={{ marginRight: "10px" }}>⭷ ระยะที่</p><ListItemText primary="1700" />
                          {open_17 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_17} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} >
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="1700" direction="from_high" gc="from_Hight_to_Low_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>
                        <ListItemButton onClick={() => setOpen_18(!open_18)}>
                          <p className='font' style={{ marginRight: "10px" }}>⭷ ระยะที่</p><ListItemText primary="1800" />
                          {open_18 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_18} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} >
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="1800" direction="from_high" gc="from_Hight_to_Low_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>
                        <ListItemButton onClick={() => setOpen_19(!open_19)}>
                          <p className='font' style={{ marginRight: "10px" }}>⭷ ระยะที่</p><ListItemText primary="1900" />
                          {open_19 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_19} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} >
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="1900" direction="from_high" gc="from_Hight_to_Low_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>
                        <ListItemButton onClick={() => setOpen_20(!open_20)}>
                          <p className='font' style={{ marginRight: "10px" }}>⭷ ระยะที่</p><ListItemText primary="2000" />
                          {open_20 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_20} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} >
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="2000" direction="from_high" gc="from_Hight_to_Low_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>




                    </Grid>

                    <Grid item xs={12} xm={6} md={6} lg={6}>
                      <List
                        sx={{ width: '100%', bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                          <ListSubheader component="div" id="nested-list-subheader" style={{textAlign:"center"}}>
                            <span className='fontlowtoh' style={{fontWeight:"bold"}}><h3>Down - up ⭸  ⭷ </h3></span>
                          </ListSubheader>
                        }
                      >
                      </List>
                        <ListItemButton onClick={() => setOpen_1_low(!open_1_low)}>
                        <p className='font' style={{ marginRight: "10px" }}>⭸ ระยะที่</p><ListItemText primary="100" />
                          {open_1_low ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_1_low} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                              <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="100" direction="from_low" gc="from_Low_To_Hight_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>
                        <ListItemButton onClick={() => setOpen_2_low(!open_2_low)}>
                        <p className='font' style={{ marginRight: "10px" }}>⭸ ระยะที่</p><ListItemText primary="200" />
                          {open_2_low ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_2_low} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="200" direction="from_low" gc="from_Low_To_Hight_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>
                        <ListItemButton onClick={() => setOpen_3_low(!open_3_low)}>
                        <p className='font' style={{ marginRight: "10px" }}>⭸ ระยะที่</p><ListItemText primary="300" />
                          {open_3_low ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_3_low} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="300" direction="from_low" gc="from_Low_To_Hight_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>
                        <ListItemButton onClick={() => setOpen_4_low(!open_4_low)}>
                        <p className='font' style={{ marginRight: "10px" }}>⭸ ระยะที่</p><ListItemText primary="400" />
                          {open_4_low ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_4_low} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="400" direction="from_low" gc="from_Low_To_Hight_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>

                        <ListItemButton onClick={() => setOpen_5_low(!open_5_low)}>
                        <p className='font' style={{ marginRight: "10px" }}>⭸ ระยะที่</p><ListItemText primary="500" />
                          {open_5_low ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_5_low} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="500" direction="from_low" gc="from_Low_To_Hight_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>

                        <ListItemButton onClick={() => setOpen_6_low(!open_6_low)}>
                        <p className='font' style={{ marginRight: "10px" }}>⭸ ระยะที่</p><ListItemText primary="600" />
                          {open_6_low ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_6_low} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="600" direction="from_low" gc="from_Low_To_Hight_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>

                        <ListItemButton onClick={() => setOpen_7_low(!open_7_low)}>
                        <p className='font' style={{ marginRight: "10px" }}>⭸ ระยะที่</p><ListItemText primary="700" />
                          {open_7_low ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_7_low} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="700" direction="from_low" gc="from_Low_To_Hight_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>

                        <ListItemButton onClick={() => setOpen_8_low(!open_8_low)}>
                        <p className='font' style={{ marginRight: "10px" }}>⭸ ระยะที่</p><ListItemText primary="800" />
                          {open_8_low ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_8_low} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="800" direction="from_low" gc="from_Low_To_Hight_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>

                        <ListItemButton onClick={() => setOpen_9_low(!open_9_low)}>
                        <p className='font' style={{ marginRight: "10px" }}>⭸ ระยะที่</p><ListItemText primary="900" />
                          {open_9_low ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_9_low} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="900" direction="from_low" gc="from_Low_To_Hight_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>

                        <ListItemButton onClick={() => setOpen_10_low(!open_10_low)}>
                        <p className='font' style={{ marginRight: "10px" }}>⭸ ระยะที่</p><ListItemText primary="1000" />
                          {open_10_low ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_10_low} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="1000" direction="from_low" gc="from_Low_To_Hight_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>

                        <ListItemButton onClick={() => setOpen_11_low(!open_11_low)}>
                        <p className='font' style={{ marginRight: "10px" }}>⭸ ระยะที่</p><ListItemText primary="1100" />
                          {open_11_low ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_11_low} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="1100" direction="from_low" gc="from_Low_To_Hight_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>

                        <ListItemButton onClick={() => setOpen_12_low(!open_12_low)}>
                        <p className='font' style={{ marginRight: "10px" }}>⭸ ระยะที่</p><ListItemText primary="1200" />
                          {open_12_low ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_12_low} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="1200" direction="from_low" gc="from_Low_To_Hight_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>

                        <ListItemButton onClick={() => setOpen_13_low(!open_13_low)}>
                        <p className='font' style={{ marginRight: "10px" }}>⭸ ระยะที่</p><ListItemText primary="1300" />
                          {open_13_low ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_13_low} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="1300" direction="from_low" gc="from_Low_To_Hight_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>

                        <ListItemButton onClick={() => setOpen_14_low(!open_14_low)}>
                        <p className='font' style={{ marginRight: "10px" }}>⭸ ระยะที่</p><ListItemText primary="1400" />
                          {open_14_low ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_14_low} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="1400" direction="from_low" gc="from_Low_To_Hight_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>

                        <ListItemButton onClick={() => setOpen_15_low(!open_15_low)}>
                        <p className='font' style={{ marginRight: "10px" }}>⭸ ระยะที่</p><ListItemText primary="1500" />
                          {open_15_low ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_15_low} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="1500" direction="from_low" gc="from_Low_To_Hight_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>

                        <ListItemButton onClick={() => setOpen_16_low(!open_16_low)}>
                        <p className='font' style={{ marginRight: "10px" }}>⭸ ระยะที่</p><ListItemText primary="1600" />
                          {open_16_low ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_16_low} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="1600" direction="from_low" gc="from_Low_To_Hight_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>

                        <ListItemButton onClick={() => setOpen_17_low(!open_17_low)}>
                        <p className='font' style={{ marginRight: "10px" }}>⭸ ระยะที่</p><ListItemText primary="1700" />
                          {open_17_low ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_17_low} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="1700" direction="from_low" gc="from_Low_To_Hight_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>

                        <ListItemButton onClick={() => setOpen_18_low(!open_18_low)}>
                        <p className='font' style={{ marginRight: "10px" }}>⭸ ระยะที่</p><ListItemText primary="1800" />
                          {open_18_low ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_18_low} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="1800" direction="from_low" gc="from_Low_To_Hight_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>

                        <ListItemButton onClick={() => setOpen_19_low(!open_19_low)}>
                        <p className='font' style={{ marginRight: "10px" }}>⭸ ระยะที่</p><ListItemText primary="1900" />
                          {open_19_low ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_19_low} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="1900" direction="from_low" gc="from_Low_To_Hight_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>

                        <ListItemButton onClick={() => setOpen_20_low(!open_20_low)}>
                        <p className='font' style={{ marginRight: "10px" }}>⭸ ระยะที่</p><ListItemText primary="2000" />
                          {open_20_low ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open_20_low} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                            <Horizontal_Bar_Chart datao={datao} timeframe={timeframe} zigzag={zigzag} point="2000" direction="from_low" gc="from_Low_To_Hight_aka_GC"></Horizontal_Bar_Chart>
                            </ListItemButton>
                          </List>
                        </Collapse>

                    </Grid>
                  </Grid>

                 </div> 
                </Grid>
              
            </Grid>

          </div>

          <div style={{ height: "20px" }} />
        
      </div>

  );
}

export default Forex;