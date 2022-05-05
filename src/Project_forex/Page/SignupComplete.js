import * as React from 'react';

import PPmb from '../Img/PPmb.png'
import BGM5 from '../Img/BGM6.jpg';
import { Link } from 'react-router-dom';
import { Container, Grid, Paper } from '@mui/material';




function SignupComplete() {

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



                        <div style={{textAlign:"center"}}>

                        <img src={PPmb} className="imx2" style={{marginTop:"50px",marginLeft:"-20px"}}/>



                        <div style={{textAlign:"center",marginLeft:"-20px"}}>
                            <h5 className='font'style={{fontSize:"105%"}}>สมัครสมาชิกสำเร็จ</h5>
                        </div>

                        <div style={{height:"20px"}}/>

                                <div>
                                    <Link to="/" className='linklog'  >
                                        <button className="Btsignin linkx" >
                                        <p className='font-continue'>Sign in</p>
                                        </button><br /><br />
                                    </Link>
                                </div>







                            </div>




                        </div>


                    </div>


                </Grid>
            </Grid>



        </div >


    );
}


export default SignupComplete;