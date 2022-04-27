import * as React from 'react';
import { Container, Grid, Paper } from '@mui/material';
import '../../App.css';
import BGM5 from '../Img/BGM6.jpg';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router, Switch,
  Route, Redirect, useHistory
} from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';

function Index() {
  const history = useHistory();
  const [error, setError] = useState(false);

  const handleUsernamePassword = (e) => {
    e.preventDefault()
    let u = document.getElementById("usr").value
    //document.getElementById("test_usr").innerHTML=u
    let l = document.getElementById("psw").value
    //document.getElementById("test_psw").innerHTML=l
    let api_take = "none"
    const ENDPOINT = "http://118.173.233.163:5000/login/" + u + "/" + l
    fetch(ENDPOINT, {
      method: 'POST',
      mode: 'cors',
      // headers: {
      //   'Content-Type': 'application/json'
      //   // 'Content-Type': 'application/x-www-form-urlencoded',
      // },
      // body: JSON.stringify({a: 1, b: 'Textual content'})
    })
      .then(response => {
        if (response.ok) {
          console.log("In OK fetch")
          return response.json()
        }
        throw response
      })
      .then(data => {
        //console.log("DATA = ",data);
        api_take = data
        //document.getElementById("sever_test").innerHTML=api_take.status //debug
        if (api_take.status == true) {
          //console.log("pop")
          localStorage.setItem('username', u);
          history.push("/Index/Home/")
        }
        else {
          setError(true)
        }
      })
      .catch(error => {
        console.error("Error Fetching data", error);
      })
  }

  return (
    <div>



      <Grid container>


        <Grid item xs={12} sm={12} md={6}>
          <section class="showcase inbgset2">
            <img src={BGM5} className="im" />
            <div class="overlay"></div>
            <div class="text">
              <h2>Start trading </h2>
              <h3>and enjoy new things.</h3>
              <p>
                Increase your income anywhere with our services.</p>

            </div>
          </section>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>



          <div class="indexlogin-bg">

            <div class="" >



              <div >
                <h3>Sign in</h3><br />
                <form >
                  <TextField InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }} autoFocus required error={error} type='text' name='nm' id="usr" label="Username" variant="standard" color='primary' style={{ width: "100%" }} /><br /><br />
                  <p id="test_usr"></p>
                  <TextField InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }} required error={error} helperText={error ? "invalid username or password" : ""} type='password' id="psw" label="Password" variant="standard" style={{ width: "100%" }} /><br /><br />
                  <p id="test_psw"></p>

                  <Link to='Index/Home'>
                    <button type='submit' className="Btsignin linkx">
                      <p className='font-continue'>Continue</p>
                    </button><br /><br />
                  </Link>

                </form>

                <p id="sever_test"></p>
                <div >
                  <p className='P1' style={{ marginTop: "-10px" }}>Forgot Password? <Link to="/Index/Reset" className='linklog'><span className='linklog'>Reset Password</span></Link> </p>


                </div>

                <p className='P1' >No account? <Link to="/Index/Signup" className='linklog'>Create now</Link></p>
                <div style={{ height: "20px" }} />




              </div>




            </div>


          </div>


        </Grid>
      </Grid>



    </div >







  );
}

export default Index;