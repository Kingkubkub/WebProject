import { Avatar, Container, Grid } from '@mui/material';
import '../../App.css';
import Forexbg3 from '../Img/Forexbg3.jpg';
import Navebar from './Navebar';
import SearchIcon from '@mui/icons-material/Search';
import data from './data';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Forex() {

  const [filter, setFilter] = useState('');

  const SearchText = (e) => {
    setFilter(e.target.value);
  }

  let dataSearch = data.card.filter(item => {

    return Object.keys(item).some(key =>

      item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())

    )


  });




  return (

    <div>


      <Navebar />

      <div>



        <section class="showcase5 showcase5-insite">

          <img src={Forexbg3} className='im' />
          <div class="overlay"></div>
          <div className="maincon-Zigzag">

            <div class="text textcom-forexai" style={{ textAlign: "center" }}>
              <div style={{ height: "0px" }} />
              <h4 className='font colortext'>Forex และ สถิติการกลับตัว</h4>



            </div>

            <div style={{ height: "10px" }} />

            <p className='font' style={{ color: "#fff", textAlign: "center" }}>เลือกดูข้อมูลคู่เงินที่ท่านต้องการ</p>

            <div style={{ height: "10px" }} />
            <div style={{ textAlign: "center" }}>
              <input
                type="text"
                className='ABC'
                placeholder='ค้นหา...'
                value={filter}
                onChange={SearchText.bind(this)}


              />

              <SearchIcon className='icon-search'/>



            </div>
          </div>
        </section>

        <div className='insite'>


          <div style={{ height: "0px" }} />

          <div className='BG-zigzag BG-zigzag2'>
            <h4 className='font font-Homeh2 font-forex' >คู่เงินทั้งหมด</h4>
            <div style={{ height: "20px" }} />
            <Grid container spacing={2}>
              {dataSearch.map((item, index) => {

                return (


                  <Grid item xs={6} md={3} lg={2} xl={1.7}>

                    <Link to={item.pathname} style={{textDecoration:"none"}}>
                     

                        <div className='BG-Forex'>

                          <h3 className="font Forexeu" style={{ color: "#111" }}>{item.title}</h3>

                        </div>

                     
                    </Link>
                  </Grid>


                )


              })}

            </Grid>

          </div>
        </div>
      </div>

      <div style={{ height: "100px" }} />

    </div>






  );
}

export default Forex;