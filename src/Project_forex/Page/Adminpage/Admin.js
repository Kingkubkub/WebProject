import { Avatar, Container, Grid } from '@mui/material';
import '../../../App.css';
import Navebar from './Navebaradmin';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import React, { useState, useEffect } from 'react';
import { textAlign } from '@mui/system';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#006400',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const columns = [
    { id: 'Username', label: 'Name', minWidth: 170 },
    { id: 'Name', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'Email',
        label: 'Email',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Password',
        label: 'Password\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Change',
        label: 'Change',
        minWidth: 100,
        align: 'left',
        format: (value) => value.toFixed(2),
    },


];
function createData(Username, Name, Email, Password, Change) {

    return { Username, Name, Email, Password, Change };
}

const rows = [
    createData('Frozen yoghurt', 99, 6.0, 24, <Link to='/Index/Userchangedata/' style={{textDecoration:"none"}}><Button style={{paddingLeft:"10%",paddingRight:"10%"}} variant="contained" >เลือก</Button></Link>),
    createData('Ice cream sandwich', 237, 9.0, 37, <div ><Button style={{paddingLeft:"10%",paddingRight:"10%"}} variant="contained" >เลือก</Button></div>),
    createData('Eclair', 262, 16.0, 24, <div ><Button style={{paddingLeft:"10%",paddingRight:"10%"}} variant="contained" >เลือก</Button ></div>),
   
];


function Admin() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [datao, setDatao] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        // 
        console.log("in use effect")
        const ENDPOINT = "http://127.0.0.1:5000/alluser"
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
          })
          .catch(error => {
            console.error("Error Fetching data" , error);
          })
          //console.log("datao = ",datao[0].forexName.zigzig_parameter_aka_603015)//example of grab json data to habe only from hight to low to frrom low to hight
      },[]);



    return (

        <div>


            <Navebar />

            <div>
                <div className='Top-position' />

                <div className='insite'>


                    <div style={{ height: "0px" }} />

                    <div className='BG-zigzag BG-zigzag2'>
                        <h4 className='font font-Homeh2' >ข้อมูลผู้ใช้งาน<PersonOutlineIcon style={{ position: "relative", top: "5px", left: "5px" }} /></h4>
                        <div style={{ height: "15px" }} />
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 1040 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Index</StyledTableCell>
                                            <StyledTableCell align="left">Username</StyledTableCell>
                                            <StyledTableCell align="left">Password</StyledTableCell>
                                            <StyledTableCell align="left">Email</StyledTableCell>
                                            <StyledTableCell align="left">แกไขข้อมูล</StyledTableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody >
                                        {datao&&
                                            datao.map((row, index) => {

                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                        <TableCell key={index} >
                                                            {index+1}
                                                        </TableCell>
                                                        {Object.values(datao[index]).map((c,index) =>{
                                                            //console.log(c)
                                                            return (
                                                                <TableCell key={index} >
                                                                    {c}
                                                                </TableCell>
                                                            )
                                                        })}
                                                        <TableCell key={"button"+index} >
                                                            <Link to={'/Index/Userchangedata/'+row["name"]} style={{textDecoration:"none"}}>
                                                                <Button style={{paddingLeft:"10%",paddingRight:"10%"}} variant="contained" >เลือก</Button>
                                                            </Link>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>

                    </div>
                </div>
            </div>

            <div style={{ height: "100px" }} />

        </div>






    );
}

export default Admin;