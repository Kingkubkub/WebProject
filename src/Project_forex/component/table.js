import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function create_row(direction){
    let to_ = ""
    if(direction == "from_high"){
        to_ = "⭸ "
    }
    else{
        to_ = "⭷ "
    }
    let buffer = []
    buffer.push(<TableCell style={{position: "sticky", left: 0, zIndex: 4, padding:"5px 15px", backgroundColor:"#4DD69E", color:"white"}} align='center' size='small' >GC table</TableCell> )
    for(let i = 0; i<20; i++){
        let str_=(i+1)+"00"
        buffer.push(<TableCell style={{padding:"5px 0px", backgroundColor:"#4DD69E"}} className='tablestyle' size='small' align='center'> <span  style={{color:"white"}}>{to_}</span> {str_} </TableCell>)
    }
    return <>{buffer}</>
}

function ThisIs_create_row_for_data( direction, index , data2D_for_table){
    let from_ = ""
    if(direction == "from_high"){
        from_ = "⭷"
    }
    else{
        from_ = "⭸"
    }

    let buffer = []
    let max = 0
    let str_ = (index+1)+"00"
    buffer.push(<TableCell style={{position: "sticky", left: 0, backgroundColor: "#4DD69E", padding:"5px 1px"}} size='small' key={"name"+index} align="center"> <span  style={{color:"white"}}>{from_}</span> {str_}</TableCell>)
    for(let i = 0; i<20; i++){
        let str_=data2D_for_table[index][i]
        if(str_ > max){
            max = str_
        }
    }

    if(max == 0){
        for(let i = 0; i<20; i++){
            let str_=data2D_for_table[index][i]
            buffer.push(<TableCell size='small' style={{color: "white", padding:"0px", backgroundColor:"#4D8DD6"}} key={i} align="center">{str_}</TableCell>)
        }
    }else{
        for(let i = 0; i<20; i++){
            let str_=data2D_for_table[index][i]
            if(str_ == max){
                buffer.push(<TableCell size='small' style={{color: "white", padding:"0px", backgroundColor:"#D64D4D"}} key={i} align="center">{str_}</TableCell>)
            }else{
                buffer.push(<TableCell size='small' style={{padding:"0px"}} key={i} align="center">{str_}</TableCell>)
            }
        }
    }

    return <>{buffer}</>
}

function stat_data_util(data_i, to_, have_data){
    let result = []
    if(have_data == false){
        for(let i = 0; i<20; i++){
            result.push(0)
        }
        //console.log("in have_data == false")
        return result
    }
    else{
        for(let i = 0; i<20; i++){
            let str_ = to_+"_"+(i+1)+"00"
            try{
                let leaf_data = data_i[str_]
                if(leaf_data == undefined){
                    result.push(0)
                }
                else{
                    result.push(leaf_data)
                }
            }catch(e){
                console.log("error "+e)
            }
        }
        //console.log("in have_data == true")
        return result
    }
}

function stat_data(datao, timeframe, zigzag, direction, gc){
    let data = datao[0]["timeframe"][`${timeframe}`][zigzag][gc]
    let result = [[]]
    let to_ = ""
    if(direction == "from_high"){
        to_ = "to_low"
    }
    else{
        to_ = "to_high"
    }
    for(let i =  0; i<20; i++){
        let direction_i = direction+"_"+(i+1)+"00"
        try{
            let data_i = data[direction_i]
            if(data_i == undefined){
                //console.log("No data in : "+direction_i)
                result[i] = stat_data_util(data_i, to_, false)
            }
            else{
                //console.log("have data in : "+direction_i)
                result[i] = stat_data_util(data_i, to_, true)
            }
        }catch(e){
            console.log("error "+e)
        }
    }
    //console.log(result)
    return result
}

function stat_row(datao, timeframe, zigzag, direction, gc){
    const rows_ = stat_data(datao, timeframe, zigzag, direction, gc) //return array2D of the given data (I aint got time to comment what going on sorry my future self)
    return rows_
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable(props) {
    let datao = 0
    let timeframe = 0
    let zigzag = 0
    let gc = 0
    let direction = 0
    let data2D_for_table = 0
    try{
        datao= props.datao
        timeframe= props.timeframe
        zigzag = props.zigzag
        gc = props.gc
        direction = props.direction
        data2D_for_table = stat_row(datao, timeframe, zigzag, direction, gc)
    }catch(e){
        console.log(e)
        return <h3>INVALID VALUE</h3>
    }
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader sx={{ minWidth: 650}} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            {create_row(direction)}
          </TableRow>
        </TableHead>
        <TableBody>
          {data2D_for_table.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                {ThisIs_create_row_for_data(direction, index, data2D_for_table)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}