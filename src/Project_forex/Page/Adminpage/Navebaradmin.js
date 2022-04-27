import * as React from 'react';
import '../../../App.css';
import Avatar from '@mui/material/Avatar';
import Logo from '../../Img/Logo.png';
import Greenlogo from '../../Img/Greenlogo.png'
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import X2 from '../../Img/Profile.jpg';
import MenuIcon from '@mui/icons-material/Menu';

import { IconContext } from 'react-icons';
import { useState } from 'react';
import DnsIcon from '@mui/icons-material/Dns';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import FeedIcon from '@mui/icons-material/Feed';


function Navebar() {

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);


  return (

    <div>

      <>
        <IconContext.Provider value={{ color: '#fff' }}>

          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items Services'   >

              <div style={{ height: "90px" }} />
           


              <div>
               

                <div style={{ height: "1px" }} />
             
                <div className='Services'>
                  <Link to="/Index/Admin/" style={{ textDecoration: "none" }}><p className='font ser1 hover-services'><span title='บริการต่างข้อมูลหุ้น'><PersonOutlineIcon className='icon-services' style={{ fontSize: "22px" }} /></span><span className='services-mt font'>ข้อมูลผู้ใช้งาน</span></p></Link>
                  <Link to="/Index/Database/" style={{ textDecoration: "none" }}><p className='font ser1 hover-services' style={{ marginTop: "-15px" }}><span title='Forex'><FeedIcon className='icon-services' style={{ fontSize: "22px" }} /></span><span className='services-mt font'>อัพเดทสถิติการกลับตัว</span></p></Link>
                    
                  <Link to="/Index/Updatedata/" style={{ textDecoration: "none" }}><p className='font ser1 hover-services' style={{ marginTop: "-15px" }}><span title='Forex'><SystemUpdateAltIcon className='icon-services' style={{ fontSize: "22px" }} /></span><span className='services-mt font'>อัพเดทสถิติการกลับตัว</span></p></Link>
                    

                </div>

                <hr className='line' />

                <div style={{ height: "1px" }} />
             
                <div className='Services'>
                  <Link to="/" style={{ textDecoration: "none" }}><p className='font ser1 hover-services'><LogoutIcon className='icon-services' style={{ fontSize: "22px" }} /><span className='services-mt font'>ออกจากระบบ</span></p></Link>
                  
                </div>


              </div>


            </ul>
          </nav>

        </IconContext.Provider>

      </>

      <div className='Navebar zinx'>

        <div >
          <button className='MB' onClick={showSidebar}><MenuIcon /></button>
          <img src={Logo} className=" x10" />
          <img src={Greenlogo} className="LogoHome" />

        </div>

        <div>

         
        </div>
      </div>

    </div>

  );
}

export default Navebar;