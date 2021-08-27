import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import LoginDialog from './dialogs/LoginDialog';
import cookie from "react-cookies";
import { JWT_TOKEN_COOKIE_NAME } from '../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuBar() {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const token = cookie.load(JWT_TOKEN_COOKIE_NAME);

  const isLogout = token ? true : false;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Course Enroll System
          </Typography>
          <Button color="inherit" component={Link} to="/">All Courses</Button>
          <Button color="inherit" component={Link} to="/enrolled_courses">Enrolled Courses</Button>
          <Button color="inherit" onClick={handleLoginButtonClick}>{isLogout ? "Logout" : "Login"}</Button>
        </Toolbar>
        <LoginDialog openDialog={openDialog} onClose={handleDialogClose}/>
      </AppBar>
    </div>
  );

  function handleDialogClose() {
    setOpenDialog(false);
  }

  function handleLoginButtonClick() {
    if (isLogout) {
      // delete token
      cookie.remove(JWT_TOKEN_COOKIE_NAME);
      window.location.reload();
    } else {
      setOpenDialog(true);
    }
  }
}
