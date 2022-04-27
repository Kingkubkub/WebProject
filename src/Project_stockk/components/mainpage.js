import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import {link} from 'react-router-dom'

class mainpage extends Component {
  render() {
    return(
      <div style={{width: '200%', margin: 'auto'}}>
        <Grid className="landing-grid">
          <Cell col={12}>
            <img
              src="https://cdn.iconscout.com/icon/free/png-512/avatar-372-456324.png"
              alt="avatar"
              className="avatar-img"
              />

            <div className="banner-text">
              <h1>One Stock Data-Service Web</h1>

            <hr/>

            <p>เว็บให้บริการข้อมูลหุ้นแบบเบ็ดเสร็จ</p>
            <a type="button" class="btn btn-primary btn-lg btn-block" href="/home">เข้าสู่ระบบ</a>

        
            </div>
          </Cell>
        </Grid>
      </div>
    )
  }
}

export default mainpage;
