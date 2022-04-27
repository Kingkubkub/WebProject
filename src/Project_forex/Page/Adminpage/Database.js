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
import FeedIcon from '@mui/icons-material/Feed';



const values = {
    someDate: ""
};

function Database() {
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [loadingupdate, setLoadingupdate] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const timer = React.useRef();



    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            setLoadingupdate(true)
            setOpen2(false);
            timer.current = window.setTimeout(() => {
                setSuccess(true);
                setLoading(false);
                setLoadingupdate(false);
                setOpen2(true);
            }, 2000);
        }
        
    };


    const handleClose = () => {
        setOpen2(true);
    };
  

    const [select, setSelect] = React.useState('');

    const handleChange2 = (event) => {
        setSelect(event.target.value);
    };




    const [value2, setValue2] = React.useState(0);



    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    const [Frame, setFrame] = React.useState('');

    const handleChange = (event) => {
        setFrame(event.target.value);
    };


    return (

        <div>


            <Navebar />


            <div>
            

                <div className='insite'>


                    <div className='Top-position' />

                    <div className='BG-zigzag BG-zigzag2'>
                        
                        <div />
                        <h4 className='font font-Homeh2' >ข้อมูลผู้สถิติการกลับตัว<FeedIcon style={{ position: "relative", top: "5px", left: "5px" }} /></h4>
                        <div style={{ height: "20px" }} />

                        <div >



                            <Accordion style={{ paddingLeft: "20px" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography sx={{ width: '33%', flexShrink: 0 }} variant="h6" style={{ fontSize: "110%" }}>Eurusdgmp</Typography>
                                    <Typography sx={{ color: 'text.secondary' }}>22/11/2022 ถึง 22/11/2021</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        API
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

export default Database;