import { Avatar, Container, Grid } from '@mui/material';
import '../../../App.css';
import Forexbg3 from '../../Img/Forexbg3.jpg';
import Navebar from './Navebaradmin';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import React, { useState, useEffect } from 'react';
import { textAlign } from '@mui/system';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Label } from '@mui/icons-material';
import UpdateIcon from '@mui/icons-material/Update';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useParams } from 'react-router-dom';

function Userchangedata() {
    let { usr } = useParams() //the name much be what you declared in route

    const [open, setOpen] = React.useState(false);
    const [datao, setDatao] = React.useState(0);
    const [email_, setEmail_] = React.useState(0);
    const [pass_, setPass_] = React.useState(0);

    useEffect(() => {
        // 
        console.log("in use effect")
        const ENDPOINT = "http://127.0.0.1:5000/user/"+usr
        fetch(ENDPOINT, {
            method: 'POST',
            mode: 'cors'
          })
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
            setEmail_(data[0]["email"])
            setPass_(data[0]["password"])
          })
          .catch(error => {
            console.error("Error Fetching data" , error);
          })
          //console.log("datao = ",datao[0].forexName.zigzig_parameter_aka_603015)//example of grab json data to habe only from hight to low to frrom low to hight
      },[]);

    const handleClickOpen = () => {
        let email = document.getElementById("email").value
        let psd = document.getElementById("password").value
        console.log(email,psd)
            // 
        const ENDPOINT = "http://127.0.0.1:5000/email_cc/"+usr+"/"+email
        fetch(ENDPOINT, {
            method: 'POST',
            mode: 'cors'
            })
            .then( response =>{
            if(response.ok){
                console.log("In OK fetch")
                return response.json()
            }
            throw response
            })
            .then(data =>{
            // console.log("DATA = ",data);
            // setDatao(data);
            })
            .catch(error => {
            console.error("Error Fetching data" , error);
            })
            //console.log("datao = ",datao[0].forexName.zigzig_parameter_aka_603015)//example of grab json data to habe only from hight to low to frrom low to hight

        const ENDPOINT_pass = "http://127.0.0.1:5000/psw_cc/"+usr+"/"+datao[0]["password"]+"/"+psd
        fetch(ENDPOINT_pass, {
            method: 'POST',
            mode: 'cors'
            })
            .then( response =>{
            if(response.ok){
                console.log("In OK fetch")
                return response.json()
            }
            throw response
            })
            .then(data =>{
            // console.log("DATA = ",data);
            // setDatao(data);
            })
            .catch(error => {
            console.error("Error Fetching data" , error);
            })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [value2, setValue2] = React.useState(0);





    const handleClick = () => {
        setOpen(!open);
    };
    const [Frame, setAge] = React.useState('M5');

    const handleChange = (event) => {
        setAge(event.target.value);
    };


    return (

        <div>


            <Navebar />

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"แก้ไขข้อมูลสำเร็จ"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ได้ทำการแก้ไขข้อูลผู้ใช้สำเร็จแล้วกดยืนยันเพื่อปิดข้อความนี้
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                  
                    <Button onClick={handleClose} autoFocus>
                        ยืนยัน
                    </Button>
                </DialogActions>
            </Dialog>

            <div>
                <div className='Top-position' />

                <div className='insite'>




                    <div className='BG-zigzag BG-zigzag2'>
                        <h3 className='' ><PersonOutlineIcon style={{ width: "35px", height: "35px", position: "relative", top: "10px", marginRight: "10px" }} />Chakphet Wongmanee</h3>
                        <div style={{ height: "10px" }} />
                        <div style={{ height: "20px" }} />
                        <h4 className='font fontupdate' >แก้ไขข้อมูล</h4>

                        <div style={{ height: "10px" }} />
                        <Paper elevation={2}>
                            <div className='BG-zigzag Update-site'>


                                <Grid container>
                                    <Grid item xl={12}>
                                        { datao &&
                                        <div>

                                            <p className='font' style={{ color: "#000", marginBottom: "10px" }}>Username:</p>

                                            <TextField disabled variant="outlined" value={datao[0]["name"]} style={{ marginRight: "10px", marginBottom: "10px", width: "270px" }} />

                                            <p className='font' style={{ color: "#000", marginBottom: "10px" }}>Email:</p>

                                            <TextField id="email" variant="outlined" value={email_} onChange={e => setEmail_(e.target.value)} style={{ marginRight: "10px", marginBottom: "10px", width: "270px" }} />

                                            <div className='textfield-inline'>
                                                <p className='font' style={{ color: "#000", marginBottom: "10px" }}>รหัสผ่าน:</p>

                                                <TextField id="password" variant="outlined" value={pass_} onChange={e => setPass_(e.target.value)} style={{ marginRight: "10px", marginBottom: "10px", width: "270px" }} />

                                        </div>








                                            <div style={{ height: "10px" }} />

                                            <div >
                                                <Button variant="contained" style={{ width: "150px", height: "40px", marginRight: "30px" }} onClick={handleClickOpen}>ยืนยัน</Button>
                                            </div>
                                        </div>
                                        }
                                    </Grid>

                                </Grid>





                            </div>
                        </Paper>




                    </div>
                </div>
            </div>

            <div style={{ height: "100px" }} />

        </div>






    );
}

export default Userchangedata;