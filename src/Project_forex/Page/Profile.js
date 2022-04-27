import * as React from 'react';
import { Avatar, Container, Grid, Paper } from '@mui/material';
import '../../App.css';
import BGM5 from '../Img/BGM62.jpg';
import { Link } from 'react-router-dom';
import X2 from '../Img/Profile.jpg';
import Navebar from './Navebar';
import TextField from '@mui/material/TextField';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";

function Profile() {
  const u = localStorage.getItem('username');
  console.log(u)
  const [email, setEmail] = useState(0)
  const [error,setError] = useState(false); //technicl error
  const [perror,setPerror] = useState(false); // password wrong
  const [sperror,setSperror] = useState(false); //unsame new password error

  const emailInput = React.useRef(null);
  const pswOldInput = React.useRef(null);
  const pswInput = React.useRef(null);
  const psw_Input = React.useRef(null);

  const handleEmail_cc = (e) =>{
    e.preventDefault()
    let m = document.getElementById("email_cc").value
    const ENDPOINT = "http://118.173.233.163:5000/email_cc/"+u+"/"+m
    fetch(ENDPOINT, {
      method: 'POST',
      mode: 'cors',
    })
      .then( response =>{
        if(response.ok){
          console.log("In OK fetch")
          return response.json()
        }
        throw response
      })
      .then(data =>{
        //console.log("DATA = ",data);
        // console.log(api_take[0]["name"]+" :: "+u)
        //document.getElementById("sever_test").innerHTML=api_take.status //debug
        if(data[0]["status"] == "sucsess"){
          alert("Change email sucsess")
          setEmail(m)
          emailInput.current.value = "";
        }
        else{
          setError(true)
        }
      })
      .catch(error => {
        console.error("Error Fetching data" , error);
      })
  }

  const handlePsw_cc = (e) =>{
    e.preventDefault()
    let p_old = document.getElementById("psw_old").value
    let p = document.getElementById("psw").value
    let p_ = document.getElementById("psw_").value
    if(p!=p_){
      return setSperror(true)
    }
    setSperror(false)
    setPerror(false)
    const ENDPOINT = "http://118.173.233.163:5000/psw_cc/"+u+"/"+p_old+"/"+p
    fetch(ENDPOINT, {
      method: 'POST',
      mode: 'cors',
    })
      .then( response =>{
        if(response.ok){
          console.log("In OK fetch")
          return response.json()
        }
        throw response
      })
      .then(data =>{
        //console.log("DATA = ",data);
        // console.log(api_take[0]["name"]+" :: "+u)
        //document.getElementById("sever_test").innerHTML=api_take.status //debug
        if(data[0]["status"] == "sucsess"){
          alert("Change password sucsess")
          pswOldInput.current.value = "";
          pswInput.current.value = "";
          psw_Input.current.value = "";
          setSperror(false)
          setPerror(false)
        }
        else{
          setPerror(true)
        }
      })
      .catch(error => {
        console.error("Error Fetching data" , error);
      })
  }



  useEffect(() => {
    const ENDPOINT = "http://118.173.233.163:5000/user/"+u
    fetch(ENDPOINT, {
      method: 'POST',
      mode: 'cors',
    })
      .then( response =>{
        if(response.ok){
          console.log("In OK fetch")
          return response.json()
        }
        throw response
      })
      .then(data =>{
        //console.log("DATA = ",data);
        // console.log(api_take[0]["name"]+" :: "+u)
        //document.getElementById("sever_test").innerHTML=api_take.status //debug
        if(data[0]["name"] == u){
          setEmail(data[0]["email"])
        }
        else{
          // setError(true)
        }
      })
      .catch(error => {
        console.error("Error Fetching data" , error);
      })
  }, []);

  return (

    <div className='BGColor'>


      <Navebar />

      <div className='zin'>


        <section class="showcase3" >

          <img src={BGM5} className="imc" />


        </section>

        <div style={{ height: "30px" }} />

        <div className="maincon maincon2">

          <div >

            <Grid container>
              <Grid item xs={12} md={12} lg={12}>
                <div className='MBD'>
                  <Avatar style={{ width: "110px", height: "110px" }} className="MB2" src={X2}></Avatar>
                </div>
              </Grid>
              <Grid item xs={12} md={12} lg={12}  >
                <h2 className='NameSetting ' style={{marginTop:"-20px"}}>{u}</h2>
              </Grid>
              <Grid item xs={12} md={12} lg={12} >
                <p className='EmailSetting ' style={{marginTop:"-2px"}}><MailOutlineIcon className='IconSetting' />
                  <span>{email}</span></p>
              </Grid>
            </Grid>


          </div>


          <div style={{ height: "10px" }} />
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <div className="BG2" >
                <h3 className='font'>การตั้งค่าโปรไฟล์</h3>
                <p className="positiontext">จัดการข้อมูลติดต่อของคุณ</p>
                <div style={{ height: "10px" }} />


                <div style={{ height: "20px" }} />

                <p className='font'>เปลี่ยน Email</p><br />
                <form onSubmit={handleEmail_cc}>
                <TextField type={'email'} inputRef={emailInput} inputProps={{ pattern: "[A-Za-zก-๙0-9@.]*"}} error={error} helperText={error ? "!!":""} required id="email_cc" label="Email" variant="filled" className='MPP' /><br /><br />
                <Button type='submit' variant="contained">ยืนยันการเปลี่ยนแปลง</Button>
                </form>


              </div>
            </Grid>
          </Grid>
          <div style={{ height: "20px" }} />

          <div style={{ height: "10px" }} />
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <div className="BG2" >

                <h3 className='font'>ความปลอดภัย</h3>
                <p className="positiontext">เปลี่ยนรหัสผ่านใหม่เพื่อความปลอดภัยของบัญชีของคุณ</p>

                <div style={{ height: "20px" }} />
                <p className='font'>เปลี่ยนรหัสผ่าน</p>


                <div style={{ height: "20px" }} />

                <form onSubmit={handlePsw_cc}>
                  <TextField inputProps={{ pattern: "[A-Za-zก-๙0-9]*" }} required error={perror} helperText={perror ? "invalid password":""} inputRef={pswOldInput} type='password' id="psw_old" label="Enter the password." variant="filled" className='MPP' /><br /><br />
                  <TextField inputProps={{ pattern: "[A-Za-zก-๙0-9]*" }} required error={sperror} inputRef={pswInput}  type='password' id="psw" label="Enter new password." variant="filled" className='MPP' /><br /><br />
                  <TextField inputProps={{ pattern: "[A-Za-zก-๙0-9]*" }} required error={sperror} helperText={sperror ? "new password much be the same":""} inputRef={psw_Input} type='password' id="psw_" label="Enter new password again." variant="filled" className='MPP' /><br /><br />
                <Button type='submit' variant="contained">ยืนยันการเปลี่ยนแปลง</Button>
                </form>


              </div>
            </Grid>
          </Grid>
          <div style={{height:"20px"}}/>
        </div>






        <div style={{ height: "150px" }} />
      </div>

    </div>

  );
}

export default Profile;