import * as React from 'react';
import { Grid } from '@mui/material';
import BGM5 from '../Img/CDS.jpg';
import MSD1 from '../Img/MSD1.jpg';
import MSD2 from '../Img/MSD2.jpg';
import MSD3 from '../Img/MSD3.jpg';
import Logo from '../Img/Logow.png';
import Greenlogo from '../Img/GreenW.png'

import { Link } from 'react-router-dom';
import Navebar from './Navebar';
import '../../App.css'
import { BrowserRouter as Router, Switch, 
  Route, Redirect,useHistory} from "react-router-dom";

export default function ButtonAppBar() {

  //let { username } = useParams()
  

  
  
  return (

    <div>

      <Navebar/>

      <div className='zin'>


        <section class="showcase showcase2">

          <img src={BGM5} className="im" />
          <div class="overlay"></div>

          <div class="text textcom-Home">
            <img src={Logo} className="Malee" />
            <img src={Greenlogo} className="Malx" />
            <h2>Welcome to Website </h2>
            
            <p className='font'>
              ใช้บริการต่างๆของเว็บไซต์เราได้ที่นี้</p>

          </div>


        </section>

        <div className="maincon">
          <h2 className='font-Homeh2 font'>บริการภายในเว็บไซต์</h2>
          <div style={{ height: "20px" }} />
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4} xl={3}>
              <div className="BGX" >

                <img src={MSD1} alt={<a href="http://www.freepik.com">Designed by pch.vector / Freepik</a>} className="im2" /><br /><div style={{ height: "10px" }} />
                <h3 className='font size'>บริการข่าวสารหุ้นแบบครบวงจร</h3>
                <p className="positiontext font ">ข่าวสารเกี่ยวกับหุ้นต่างๆและ Forex ที่ช่วยให้ได้รู้ข่าวสารและช่วยให้คุณตัดสินใจในการซื้อหุ้นหรือค่าเงินได้ดีขึ้น</p>

                <Link to="/stockk/home" className='Textstart'>
                  <p className="positiontext positiontext2 font size ">เริ่มใช้งาน </p>
                </Link>

              </div>
            </Grid>

            <Grid item xs={12} lg={4} xl={3}>

              <div className="BGX">
                <img src={MSD2} className="im2" /><br /><div style={{ height: "10px" }} />
                <h3 className='font size'>Forex</h3>
                <p className="positiontext font">ดูข้อมูลคู่เงิน Forex ที่ท่านต้องการเช่นข้อมูล Bid/Ask หรือสถิติการกลับตัวของคู่เงิน Forex ของคู่เงินนั้นๆ</p>

                <Link to="/Index/Forex" className='Textstart'>
                  <p className="positiontext positiontext2 font size ">เริ่มใช้งาน </p>
                </Link>

              </div>
            </Grid>

            <Grid item xs={12} lg={4} xl={3}>

              <div className="BGX">
                <img src={MSD3} className="im2" /><br /><div style={{ height: "10px" }} />
                <h3 className='font size'>Ai Forex</h3>
                  <p className="positiontext font">เทรด Forex ด้วยระบบ Ai เพื่ออำนวยความสะดวกและเพิ่มรายได้ในการเทรดให้กับคุณในทุกๆสถานที่ทุกเวลา</p>
                  <p className="positiontext text3 font size">ไม่พร้อมใช้งาน </p>

              </div>

            </Grid>

            <Grid item xs={12} lg={4} xl={3} >
              <div className="BGX">
                <img src={MSD3} className="im2" /><br /><div style={{ height: "10px" }} />
                <p><h3 className='font size'>บริการต่างๆในอนาคต</h3>
                  <p className="positiontext font">บริการต่างๆในอนาคตที่จะทำให้ผู้ใช้มีความสะดวกสบายมากยิ่งขึ้น เช่น ระบบเทรดด้วยระบบ Ai หรือระบบอื่นๆ </p>

                  <p className="positiontext text3 font size">ไม่พร้อมใช้งาน </p></p>
              </div>
            </Grid>

            <Grid item xs={12} lg={4} xl={3}>
              <div className="BGX">
                <img src={MSD3} className="im2" /><br /><div style={{ height: "10px" }} />
                <p><h3 className='font size'>บริการต่างๆในอนาคต</h3>
                  <p className="positiontext font">บริการต่างๆในอนาคตที่จะทำให้ผู้ใช้มีความสะดวกสบายมากยิ่งขึ้น เช่น ระบบเทรดด้วยระบบ Ai หรือระบบอื่นๆ </p>

                  <p className="positiontext text3 font size">ไม่พร้อมใช้งาน </p></p>
              </div>
            </Grid>

            <Grid item xs={12} lg={4} xl={3}>
              <div className="BGX">
                <img src={MSD3} className="im2" /><br /><div style={{ height: "10px" }} />
                <p><h3 className='font size'>บริการต่างๆในอนาคต</h3>
                  <p className="positiontext font">บริการต่างๆในอนาคตที่จะทำให้ผู้ใช้มีความสะดวกสบายมากยิ่งขึ้น เช่น ระบบเทรดด้วยระบบ Ai หรือระบบอื่นๆ </p>

                  <p className="positiontext text3 font size">ไม่พร้อมใช้งาน </p></p>
              </div>
            </Grid>

            <Grid item xs={12} lg={4} xl={3}>
              <div className="BGX">
                <img src={MSD3} className="im2" /><br /><div style={{ height: "10px" }} />
                <p><h3 className='font size'>บริการต่างๆในอนาคต</h3>
                  <p className="positiontext font">บริการต่างๆในอนาคตที่จะทำให้ผู้ใช้มีความสะดวกสบายมากยิ่งขึ้น เช่น ระบบเทรดด้วยระบบ Ai หรือระบบอื่นๆ </p>

                  <p className="positiontext text3 font size">ไม่พร้อมใช้งาน </p></p>
              </div>
            </Grid>


          </Grid>

        </div>




        <div style={{ height: "100px" }} />
      </div>

    </div>

  );
}
