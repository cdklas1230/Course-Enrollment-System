import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function CourseTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="right">Course Name</TableCell>
            <TableCell align="right">Course Content</TableCell>
            <TableCell align="right">Course Location</TableCell>
            <TableCell align="right">Teacher ID</TableCell>
            {
              props.actionButtonLabel ? <TableCell align="right">Action</TableCell> : null    
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {props.courses.map((row, i) => (
            // key用来让react知道哪里变了  
            <TableRow key={`${row.courseName}-${row.teacherId}`}>
              <TableCell component="th" scope="row">
                {i+1}
              </TableCell>
              <TableCell align="right">{row.course_name}</TableCell>
              <TableCell align="right">{row.course_content}</TableCell>
              <TableCell align="right">{row.course_location}</TableCell>
              <TableCell align="right">{row.teacher_id}</TableCell>
              {
                props.actionButtonLabel 
                  ?
                  <TableCell align="right">
                    <Button color="primary" variant="contained" onClick={()=>props.onActionButtonClick(row)}>
                      {props.actionButtonLabel}
                    </Button>
                  </TableCell> 
                  : null              
              }
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
