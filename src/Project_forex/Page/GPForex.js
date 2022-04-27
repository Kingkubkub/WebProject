import * as React from 'react';
import { Avatar, Container, Grid } from '@mui/material';
import '../../App.css';
import { Link } from 'react-router-dom';
import Navebar from './Navebar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
//* Te 
import { useState, useEffect, useRef } from 'react';
import HistChart from '../component/histchart';
import { useParams } from 'react-router-dom';

//wraper function 
function forex_stream(obj, name, sett)
{
  if(obj.stream_debug == 'Popy')
  {
    return <h3> - </h3>
  }
  else{
    if(sett == 'BID')
    {
      try{
        if(obj.stream[name]["stream"][0] >= obj.stream[name]["previous"][0]){
          return <h4 style={{color:"green", display:"inline-block", marginLeft:"10px"}} >&nbsp;&nbsp;{obj.stream[name]["stream"][0]}</h4>
        }
        else{
          return <h4 style={{color:"red", display:"inline-block", marginLeft:"10px"}} >&nbsp;&nbsp;{obj.stream[name]["stream"][0]}</h4>
        }
        //return <h4 style="color:red" >&nbsp;&nbsp;{obj.stream[name][0]}</h4>
      }catch(e){
        console.log("stream error ", obj.stream[name])
        return <h4 style={{display:"inline-block", marginLeft:"10px"}}>Market close</h4>
      }
    }
    else //sett == 'ASK'
    {
      try{
        if(obj.stream[name]["stream"][1] >= obj.stream[name]["previous"][1]){
          return <h4 style={{color:"green", display:"inline-block", marginLeft:"10px"}} >&nbsp;&nbsp;{obj.stream[name]["stream"][1]}</h4>
        }
        else{
          return <h4 style={{color:"red", display:"inline-block", marginLeft:"10px"}} >&nbsp;&nbsp;{obj.stream[name]["stream"][1]}</h4>
        }
        //return <h4>&nbsp;&nbsp;{obj.stream[name][1]}</h4>
      }catch(e){
        return <h4 style={{display:"inline-block", marginLeft:"10px"}}>Market close</h4>
      }
    }
  }
}

function hist_gra_handle(obj, name, timeframe) // wrapper for showing charts to catch if there is no chart data had been fetch yet(witch it usually will) and we'll handle that by show loading text
{
    //console.log("grom hist gra hanlde = ",obj)//debug purpose
  try{
    //name = name+"_"+timeframe_
    return <HistChart forex_obj={obj[name]} name={name} timeframe={timeframe} timedelta={obj["timedelta"]}/> /** this is for hist chart */
  }catch(e){
    return <p>Loading</p>
  }
}
//*




const values = {
    someDate: "2017-05-24"
};


const theme = createTheme({
    palette: {
        secondary: {
            main: '#11cb5f',
        },
    },
});




const ENDPOINT = "http://118.173.233.163:5000"; // declared what sever to bind socket aka my sever
const io = require('socket.io-client'); // declared socket that we aready install
let socket = io(ENDPOINT, { autoConnect: false }) //declered this variable to handle all the socket even aka bind it to the **const io = require('socket.io-client'); **
let socketID = "POP A clot"
/////////////////////
function GPForex() {

    //te
    // well thank for the lib support (usePrams) i don't have to put a params in the function and cut of the complex pretty decenly a much thanK!
    let { forex_name } = useParams() //the name much be what you declared in route
    let ENDPOINT = "/Index/Zigzag/"+forex_name

    //useState and variable
    const [timeframe_, setTimeframe_] = useState("M5");
    const [count, setCount] = useState(300000);
    const [hist, setHist] = useState(null); // useState vairable use to keep the value of the history
    const [stream, setStream] = useState({
        stream : null,
        stream_debug : "Popy"
        });// useState variable use to keep the forex bid/ask and previus bid/ask for the coulor things
    //

    useEffect(() => {
        console.log("in useEffect")
        window.addEventListener("beforeunload", handle); //if user f5 page
        socket.connect();
        //console.log("cahrt instance = ",chartRef.current)
        console.log("socket instance", socket);

        console.log("EMIT?? socketID = ", socket.id)
        socketID = socket.id
        socket.emit('forex_request_dynamic_private', forex_name, socket.id);

        socket.on('forex_request_dynamic_private', (obj)=>{//well you gonna have like all the timeframe you need in one go  and we'll manage it later
            console.log(" I recieve yuor dynamic thing ! ", obj);//debug purpose
            setStream({
                ...stream,
                stream : obj,// set stream to copy obj
                stream_debug: 0
              })
            //console.log("I am on request dynamic!!",obj)
        })
        return () => {
          window.removeEventListener("beforeunload", handle); //remove if user f5 page when user exist
          socket.emit('left_room', forex_name);
          socket.close() //close socket on unmount
        }
    }, []);
    const handle = (e) => {
      e.preventDefault();
      socket.emit('left_room', forex_name);
      e.returnValue = "";
    };

    useEffect(() => {
        // side effect here on change of any of props.x or stateY
        //console.log("socket instance another ", socket);
        //console.log("cahrt instance another = ",chartRef.current)

        //socket.emit('hist_request_dynamic', forex_name, timeframe_)

        const ENDPOINT = "http://118.173.233.163:5000/hist_forex_request/"+forex_name+"/"+timeframe_
        fetch(ENDPOINT)
          .then( response =>{
            if(response.ok){
              console.log("In OK fetch")
              return response.json()
            }
            throw response
          })
          .then(data =>{
            //console.log("DATA = ",data);
            setHist(data);
          })
          .catch(error => {
            console.error("Error Fetching data" , error);
          })
        //console.log("I am in useEffect onChange timeframe click = ",timeframe_)
    }, [timeframe_])

    useEffect(() => {
        //mess with the time again
        const timer = setInterval(() => {
          //console.log('Timeout called! '+count+" second pass!", timeframe_);
          //update hist
          const ENDPOINT = "http://118.173.233.163:5000/hist_forex_request/"+forex_name+"/"+timeframe_
          fetch(ENDPOINT)
            .then( response =>{
              if(response.ok){
                console.log("In OK fetch timer")
                return response.json()
              }
              throw response
            })
            .then(data =>{
              //console.log("DATA = ",data);
              setHist(data);
            })
            .catch(error => {
              console.error("Error Fetching data" , error);
            })
        }, count);
      return () => {
          clearInterval(timer)
      };
    }, [count])
    //*

    const [value, setValue] = React.useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));




    return (

        <div className='BGColor'>
            <Navebar />
            <div className='zin'>

                <section class="showcase5">

                
                    <div class="overlay"></div>
                    <div style={{ height: "2px" }} />
                    <div className="maincon-GPForex">
                        <div class="text textcom-forexai">


                            <Grid container>
                                <Grid item xs={12}>
                                    <h4 className='colorForex font size-w' >{forex_name}</h4>
                                </Grid>

                            

                            </Grid>
                            <div style={{ height: "15px" }} />

                            <Paper elevation={5}>
                                <div className='BG-zigzag '>

                                    <Grid container style={{ position: "relative", top: "7px" }}>

                                        <div style={{ height: "40px" }} />
                                        <Grid item xs={6} sm={4} md={4} lg={4} style={{ textAlign: "center" }} >
                                            <h4 className='font-BidandAsk' >BID<span className='Colortext-Priceandmore'>{forex_stream(stream, forex_name, 'BID')}</span></h4>
                                        </Grid>
                                        <Grid item xs={6} sm={4} md={4} lg={4} style={{ textAlign: "center" }}>
                                            <h4 className='font-BidandAsk' >ASK<span className='Colortext-Priceandmore'>{forex_stream(stream, forex_name, 'ASK')}</span></h4>
                                        </Grid>

                                        <Grid item xs={12} sm={4} md={4} lg={4}>
                                            <Link to={ENDPOINT} style={{ textDecoration: "none", position: "relative", top: "-7px" }}>
                                                <div className='position-buttuon'>
                                                    <Button variant="contained" style={{ width: "150px", height: "40px", marginRight: "30px" }}>ดูสถิติการกลับตัว</Button>
                                                </div>
                                            </Link>
                                        </Grid>

                                    </Grid>





                                </div>
                            </Paper>


                            <div style={{ height: "15px" }} />

                            <Paper elevation={5}>
                            <div className='BGFXC'  >
                                <div style={{ backgroundColor: "#fff" }}>


                                    <Paper>
                                        <ThemeProvider theme={theme}>

                                            <Box sx={{ bgcolor: 'background.paper' }}>
                                                <Tabs
                                                    value={value}
                                                    onChange={handleChange}
                                                    variant="scrollable"
                                                    indicatorColor="secondary"
                                                    textColor="secondary"
                                                    scrollButtons
                                                    allowScrollButtonsMobile
                                                    aria-label="scrollable force tabs example"
                                                    size='small'
                                                >
                                                    <Tab label="M1" onClick={()=> {setTimeframe_("M1"); setCount(30000)}}/> {/** 60000 / 2 */}
                                                    <Tab label="M5" onClick={()=>{setTimeframe_("M5"); setCount(150000)}}/> {/** 300000 / 2 */}
                                                    <Tab label="M15" onClick={()=>{setTimeframe_("M15"); setCount(450000)}}/> {/** 900000 / 2 */}
                                                    <Tab label="M30" onClick={()=>{setTimeframe_("M30"); setCount(900000)}}/> {/** 1800000 / 2 */}
                                                    <Tab label="H1" onClick={()=>{setTimeframe_("H1"); setCount(1800000)}}/> {/** 3600000 / 2 */}
                                                    <Tab label="H4" onClick={()=>{setTimeframe_("H4"); setCount(7200000)}}/> {/** 14400000 / 2 */}
                                                    <Tab label="D1" onClick={()=>{setTimeframe_("D1"); setCount(43200000)}}/> {/** 86400000 / 2 */}
 
                                                </Tabs>
                                            </Box>
                                        </ThemeProvider>
                                    </Paper>
                                </div>


                                <div style={{ height: "10px" }} />

                                <div>
                                    <div style={{ padding: "10px" }}>
                                        {hist_gra_handle(hist, forex_name, timeframe_)}
                                    </div>
                                </div>

                                <div style={{ height: "40px" }} />


                              

                            </div>



                            </Paper>

                        </div>

                    </div>
                    

                </section>

            </div>



        </div >

    );
}

export default GPForex;