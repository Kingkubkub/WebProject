import { Avatar, Container, Grid } from '@mui/material';
import '../../../App.css';
import Forexbg3 from '../../Img/Forexbg3.jpg';
import Navebar from './Navebaradmin';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import React, { useState } from 'react';
import { textAlign } from '@mui/system';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FlareSharp, Label } from '@mui/icons-material';
import UpdateIcon from '@mui/icons-material/Update';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from '@mui/material/LinearProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';



const values = {
    someDate: ""
};

function Updatedata() {
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [loadingupdate, setLoadingupdate] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const timer = React.useRef();
    const [open, setOpen] = React.useState(false);
    const [select, setSelect] = React.useState("EURUSDgmp");
    const [Frame, setFrame] = React.useState("M5");
    const [datao, setDatao] = React.useState(0);
    const [prevsymbol, setPrevsymbol] = React.useState("none");
    const [prevtimframe, setPrevtimeframe] = React.useState("none");
    const [prevfromDate, setPrevFromDate] = React.useState("none");
    const [prevtoDate, setPrevtoDate] = React.useState("none");
    const [prevdepth, setPrevdepth] = React.useState("none");
    const [prevdeviation, setPrevdeviation] = React.useState("none");
    const [prevbackstep, setPrevbackstep] = React.useState("none");


    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);


    const handleClose = () => {
        setOpen2(false);
    };

    const handleClose3 = () => {
        setOpen3(false);
        //
        let fromD = document.getElementById('from_date').value
        fromD = fromD.replaceAll('-', '.');
        let toD = document.getElementById('to_date').value
        toD = toD.replaceAll('-', '.');
        let depth = document.getElementById('depth').value
        let deviation = document.getElementById('deviation').value
        let backstep = document.getElementById('backstep').value
        //
        //call an api
        const ENDPOINT = "http://127.0.0.1:5000/update_statistic_data/"+select+"/"+Frame+"/"+fromD+"/"+toD+"/"+depth+"/"+deviation+'/'+backstep
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
            setDatao(data)

            setPrevsymbol(select);
            setPrevtimeframe(Frame);
            setPrevdepth(depth)
            setPrevdeviation(deviation)
            setPrevbackstep(backstep)

            setSuccess(!false);
            setLoading(!true);
            setLoadingupdate(!true)
            setOpen2(!false);
          })
          .catch(error => {
            console.error("Error Fetching data" , error);
          })
    };
  
    const handleCancel = () =>{
        setOpen3(false);

        setPrevsymbol(select);
        setPrevtimeframe(Frame);

        setSuccess(!false);
        setLoading(!true);
        setLoadingupdate(!true)
    }

    const handleChange2 = (event) => {
        setSelect(event.target.value);
    };


    const handleClick = () => {
        setOpen(!open);
    };

    const handleChange = (event) => {
        setFrame(event.target.value);
    };

    const countData = (data) =>{
        let count = 0;
        for (var c in data) {
            //console.log(c)
            for(var i in data[c]){
                //console.log("i = ", i)
                count = count + 1;
            }
        }
        return count
    }

    const prevData = () =>{
        if(datao == 0){
            return (
                <>
                    none
                </>
            )
        }
        else{
            try{
                let zigzag = "zig_zag_parameter_"+prevdepth+"_"+prevdeviation+"_"+prevbackstep
                let data = datao["timeframe"][prevtimframe][zigzag]
                return (                    
                    <>
                        <p>ZigZag parameter</p>
                        <p>depth : {data["depth"]}</p>
                        <p>deviation : {data["diviation"]}</p>
                        <p>backstep : {data["backstep"]}</p>
                        <br></br>
                        <p>จากวันที่ : {data["from_date"]}</p>
                        <p>ถึงวันที่ : {data["to_date"]}</p>
                        <br></br>
                        <p>data count</p>
                        <p>from high to low : {countData(data["from_Hight_to_Low_aka_GC"])}</p>
                        <p>from low to high : {countData(data["from_Low_To_Hight_aka_GC"])}</p>
                    </>
                )
            }catch(e){
                console.log(datao)
            }
        }
    }

    const handleStartButtonClick = () =>{
        if (!loading) {
            const ENDPOINT = "http://127.0.0.1:5000/start_MT4"
            fetch(ENDPOINT)
            .then( response =>{
              if(response.ok){
                console.log("In OK fetch")
                return response
              }
              throw response
            })
            .then(data =>{
              console.log("DATA = ",data);
              alert("Open MT4 success")
            })
            .catch(error => {
              console.error("Error Fetching data" , error);
            })
        }
    }

    const handleStopButtonClick = () =>{
        if (!loading) {
            const ENDPOINT = "http://127.0.0.1:5000/close_MT4"
            fetch(ENDPOINT)
            .then( response =>{
              if(response.ok){
                console.log("In OK fetch")
                return response
              }
              throw response
            })
            .then(data =>{
              console.log("DATA = ",data);
              alert("Stop MT4 success")
            })
            .catch(error => {
              console.error("Error Fetching data" , error);
            })
        }
    }

    const handleButtonClick = () => {
        if (!loading) {
            //select = symbol
            //Frame = timeframe
            let fromD = document.getElementById('from_date').value
            fromD = fromD.replaceAll('-', '.');
            let toD = document.getElementById('to_date').value
            toD = toD.replaceAll('-', '.');
            let depth = document.getElementById('depth').value
            let deviation = document.getElementById('deviation').value
            let backstep = document.getElementById('backstep').value

            ////////////////////////////////
            setSuccess(false);
            setLoading(true);
            setLoadingupdate(true)
            setOpen2(false);
            ///////////////////////////////

            const ENDPOINT = "http://127.0.0.1:5000/check_statistic_data/"+select+"/"+Frame+"/"+fromD+"/"+toD+"/"+depth+"/"+deviation+'/'+backstep
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
                if(data["status"] == "True"){
                    console.log("data = true")
                    setOpen3(true)
                }else{
                    console.log("data = false")
                    //call another API 
                    const ENDPOINT = "http://127.0.0.1:5000/update_statistic_data/"+select+"/"+Frame+"/"+fromD+"/"+toD+"/"+depth+"/"+deviation+'/'+backstep
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
                        setDatao(data)
        
                        setPrevsymbol(select);
                        setPrevtimeframe(Frame);
                        setPrevdepth(depth)
                        setPrevdeviation(deviation)
                        setPrevbackstep(backstep)
        
                        setSuccess(!false);
                        setLoading(!true);
                        setLoadingupdate(!true)
                        setOpen2(!false);
                      })
                      .catch(error => {
                        console.error("Error Fetching data" , error);
                      })
                }
              })
              .catch(error => {
                console.error("Error Fetching data" , error);
              })
        }
        
    };


    return (

        <div>


            <Navebar />
            <Dialog
                open={open2}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"แก้ไขข้อมูลสำเร็จ"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ได้ทำการแก้ไขข้อูลสำเร็จแล้วกดยืนยันเพื่อปิดข้อความนี้
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                  
                    <Button onClick={handleClose} autoFocus>
                        ยืนยัน
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={open3}
                onClose={handleClose3}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"คำเตือน"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ข้อมูลดังกล่าวมีอยู่ในดาต้าเบสแล้ว ต้องการอัพเดททับเลยหรือไม่?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                  
                    <Button onClick={handleClose3} autoFocus>
                        ยืนยัน
                    </Button>
                    <Button onClick={handleCancel} autoFocus>
                        ยกเลิก
                    </Button>
                </DialogActions>
            </Dialog>


            <div>
                <div className='Top-position' />

                <div className='insite'>


                    <div style={{ height: "0px" }} />

                    <div className='BG-zigzag BG-zigzag2'>
                        <h4 className='font font-Homeh2' >อัพเดทข้อมูลสถิติการกลับกลัว<SystemUpdateAltIcon style={{ position: "relative", top: "5px", left: "10px" }} /></h4>
                        <div style={{ height: "20px" }} />

                        <Paper elevation={2}>
                            <div className='BG-zigzag Update-site'>


                                <Grid container>
                                    <Grid item xl={12}>

                                        <div>
                                            <p className='font' style={{ color: "#000", marginBottom: "5px" }}>Forex</p>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={select}
                                                size='small'
                                                disabled={loading}
                                                style={{ marginRight: "10px", width: "270px", marginBottom: "10px",marginRight:"30px" }}

                                                onChange={handleChange2}
                                            >
                                                <MenuItem value={"EURUSDgmp"}>EURUSDgmp</MenuItem>
                                                <MenuItem value={"USDJPYgmp"}>USDJPYgmp</MenuItem>
                                                <MenuItem value={"GBPUSDgmp"}>GBPUSDgmp</MenuItem>
                                            </Select>

                                            
                                            <div className='textfield-inline'>
                                            <p className='font' style={{ color: "#000", marginBottom: "5px" }}>ZigZag Indicator</p>
                                            <TextField disabled={loading} id="depth" variant="outlined" size='small' label="Depth" style={{ marginRight: "10px", marginBottom: "10px" }} />
                                            <TextField disabled={loading} id="deviation" variant="outlined" size='small' label="Deviation" style={{ marginRight: "10px", marginBottom: "10px" }} />
                                            <TextField disabled={loading} id="backstep" variant="outlined" size='small' label="Backstep" style={{ marginRight: "10px", marginBottom: "10px" }} />
                                            </div>

                                            <p className='font' style={{ color: "#000", marginBottom: "5px" }}>Timeframe</p>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={Frame}
                                                disabled={loading}
                                                size='small'
                                                style={{ marginRight: "10px", width: "270px", marginBottom: "10px",marginRight:"30px" }}

                                                onChange={handleChange}
                                            >
                                                <MenuItem value={"M1"}>M1</MenuItem>
                                                <MenuItem value={"M5"}>M5</MenuItem>
                                                <MenuItem value={"M15"}>M15</MenuItem>
                                                <MenuItem value={"M30"}>M30</MenuItem>
                                                <MenuItem value={"H1"}>H1</MenuItem>
                                                <MenuItem value={"H4"}>H4</MenuItem>
                                                <MenuItem value={"D1"}>D1</MenuItem>
                                            </Select>
                                            <div className='textfield-inline'>
                                            <p className='font' style={{ color: "#000", marginBottom: "5px" }}>วันที่ในการอัพเดท</p>
                                            <TextField
                                                name="someDate"
                                                disabled={loading}
                                                id='from_date'
                                                size='small'
                                                InputLabelProps={{ shrink: true, required: true }}
                                                type="date"
                                                defaultValue={values.someDate}
                                                style={{ marginRight: "10px", marginBottom: "10px" }}
                                            />

                                            <span style={{
                                                marginRight: "10px",
                                                position: "relative",
                                                top: "5px"
                                            }}>
                                                To
                                            </span>

                                            <TextField
                                                name="someDate"
                                                disabled={loading}
                                                size='small'
                                                id='to_date'
                                                InputLabelProps={{ shrink: true, required: true }}
                                                type="date"
                                                defaultValue={values.someDate}
                                                style={{ marginRight: "10px", marginBottom: "10px" }}
                                            />
                                                </div>
                                          

                                            <div >
                                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                                    <Box sx={{ m: 1, position: "relative" }}>
                                                        <Button
                                                            variant="contained"
                                                            disabled={loading}
                                                            onClick={handleButtonClick}
                                                            style={{ width: "150px", height: "40px", marginRight: "30px",marginLeft:"-8px" }}
                                                        >
                                                            Update
                                                        </Button>
                                                        <Button
                                                            disabled={loading}
                                                            onClick={handleStartButtonClick}
                                                            style={{ width: "150px", height: "40px", marginRight: "30px",marginLeft:"-8px" }}
                                                        >
                                                            Start MT4
                                                        </Button>
                                                        <Button
                                                            disabled={loading}
                                                            onClick={handleStopButtonClick}
                                                            style={{ width: "150px", height: "40px", marginRight: "30px",marginLeft:"-8px" }}
                                                        >
                                                            Stop MT4
                                                        </Button>
                                                        {loading && (
                                                            <CircularProgress
                                                                size={24}
                                                                sx={{
                                                                    position: "absolute",
                                                                    top: "50%",
                                                                    left: "40%",
                                                                    marginTop: "-12px",
                                                                    marginLeft: "-12px"
                                                                }}
                                                            />
                                                        )}
                                                    </Box>
                                                </Box>
                                            </div>
                                        </div>
                                    </Grid>

                                </Grid>




                            </div>
                            <Box sx={{ width: '100%' }}>
                                {loading && (
                                    <LinearProgress />
                                )}
                            </Box>

                        </Paper>
                        <div style={{ height: "40px" }} />
                        <h4 className='font font-Homeh2' >อัพเดทล่าสุด<UpdateIcon style={{ position: "relative", top: "5px", left: "5px" }} /></h4>
                        <div style={{ height: "20px" }} />

                        <div >



                            <Accordion style={{ paddingLeft: "20px" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography sx={{ width: '33%', flexShrink: 0 }} variant="h6" style={{ fontSize: "110%" }}>{prevsymbol}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {prevData()}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>








                        </div>

                    </div>
                </div>
            </div>

            <div style={{ height: "100px" }} />

        </div>






    );
}

export default Updatedata;