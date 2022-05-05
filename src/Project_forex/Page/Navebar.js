import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Logo from '../Img/Logo.png';
import Greenlogo from '../Img/Greenlogo.png'
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import X2 from '../Img/Profile.jpg';
import MenuIcon from '@mui/icons-material/Menu';
import '../../Navbar.css';
import { IconContext } from 'react-icons';
import { useState } from 'react';
import DnsIcon from '@mui/icons-material/Dns';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import NewspaperIcon from '@mui/icons-material/Newspaper';

const clear_user = () =>{
  localStorage.clear()
}

function Navebar(props) {

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);


  return (

    <div>

      <>
        <IconContext.Provider value={{ color: '#fff' }}>

          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items Services'   >

              <div style={{ height: "95px" }} />
              <div className='Services'>
                <Link to="/Index/Home" style={{ textDecoration: "none" }}><p className='font ser1 hover-services'><span title="หน้าหลัก"><HomeIcon className='icon-services' style={{ fontSize: "22px" }} /></span><span className='services-mt font'style={{position:"relative",left:"3px"}}>หน้าหลัก</span></p></Link>
                <div className='button-setting'>
                  <Link to="/Index/Forex" style={{ textDecoration: "none" }}><p className='font ser1 hover-services' style={{ marginTop: "-15px" }}><span title='Forex'> <span title="ตั้งค่า"><SettingsIcon  className='icon-services' style={{ fontSize: "22px" }} /></span> </span><span className='services-mt font' >การตั้งค่า</span></p></Link>
                </div>
              </div>


              <div>
                <hr className='line' />

                <div style={{ height: "10px" }} />
                <div className='Services'>
                  <Link to="/stockk/home" style={{ textDecoration: "none" }}><p className='font ser1 hover-services'> <span title="บริการข่าวสารหุ้น"><NewspaperIcon className='icon-services' style={{ fontSize: "22px" }} /></span> <span className='services-mt font'>บริการข่าวสารหุ้น</span></p></Link>
                  <Link to="/Index/Forex" style={{ textDecoration: "none" }}><p className='font ser1 hover-services' style={{ marginTop: "-15px" }}> <span title="Forex"><EqualizerIcon className='icon-services' style={{ fontSize: "22px" }} /></span> <span className='services-mt font'>Forex</span></p></Link>
                  <Link to="/Index/Home" style={{ textDecoration: "none" }}><p className='font ser1 hover-services' style={{ marginTop: "-15px" }}> <span title="Ai Forex"><SmartToyIcon className='icon-services' style={{ fontSize: "22px" }} /></span> <span className='services-mt font'>Ai Forex</span></p></Link>
                  <Link to="/Index/Home" style={{ textDecoration: "none" }}><p className='font ser1 hover-services' style={{ marginTop: "-15px" }}> <span title="บริการเพิ่มเติม"><AutoAwesomeMotionIcon className='icon-services' style={{ fontSize: "22px" }} /></span> <span className='services-mt font'>บริการเพิ่มเติม</span></p></Link>
                  <Link to="/Index/Home" style={{ textDecoration: "none" }}><p className='font ser1 hover-services' style={{ marginTop: "-15px" }}> <span title="บริการเพิ่มเติม"><AutoAwesomeMotionIcon className='icon-services' style={{ fontSize: "22px" }} /></span> <span className='services-mt font'>บริการเพิ่มเติม</span></p></Link>
                  <Link to="/Index/Home" style={{ textDecoration: "none" }}><p className='font ser1 hover-services' style={{ marginTop: "-15px" }}> <span title="บริการเพิ่มเติม"><AutoAwesomeMotionIcon className='icon-services' style={{ fontSize: "22px" }} /></span> <span className='services-mt font'>บริการเพิ่มเติม</span></p></Link>
                  <Link to="/Index/Home" style={{ textDecoration: "none" }}><p className='font ser1 hover-services' style={{ marginTop: "-15px" }}> <span title="บริการเพิ่มเติม"><AutoAwesomeMotionIcon className='icon-services' style={{ fontSize: "22px" }} /></span> <span className='services-mt font'>บริการเพิ่มเติม</span></p></Link>


                </div>

                <hr className='line' />

                <div style={{ height: "10px" }} />
                <div className='Services'>
                  <Link to="/" style={{ textDecoration: "none" }}><p onClick={clear_user} className='font ser1 hover-services'> <span title="ออกจากระบบ"><LogoutIcon className='icon-services' style={{ fontSize: "22px" }} /></span> <span className='services-mt font'>ออกจากระบบ</span></p></Link>
                  
                </div>


              </div>


            </ul>
          </nav>

        </IconContext.Provider>

      </>

      <div className='Navebar zinx' >

        <div >
          <button className='MB' onClick={showSidebar}><MenuIcon  style={{marginTop:"9px"}}/></button>
          <img src={Logo} className=" x10" />
          <img src={Greenlogo} className="LogoHome" />

        </div>

        <div>
            <button className='bbt bbt2'><Avatar src={X2}>H</Avatar></button>
          <span title="ตั้งค่า">
          <Link to={"/Index/Profile"} className='Hoverline'>
            <button className='bbt bbt3'><SettingsIcon /></button>
          </Link>
          </span>
        </div>
      </div>

    </div>

  );
}

export default Navebar;