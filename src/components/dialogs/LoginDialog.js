import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import JwtService from '../../service/JwtServices';
import cookie from 'react-cookies';
import { JWT_TOKEN_COOKIE_NAME } from '../../constants';

export default function LoginDialog(props) {
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false); 

  return (
    <div>
      <Dialog open={props.openDialog} onClose={props.onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Log In</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            fullWidth
            onChange={event => setUsername(event.target.value)}
            disabled={isLoading}
          />
            <TextField
            margin="dense"
            id="password"
            label="Password"
            fullWidth
            type="password"
            onChange={event => setPassword(event.target.value)}
            disabled={isLoading}
          />
          <DialogContentText color="error">
            {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={login} color="primary">
            Log In
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  function login() {
    // send request to server (axios -> xhr)
    // 1. if succeeded, store jwt token in cookie (token received through response)
    // 2. if failed, display an error message
    setIsLoading(true);
    JwtService.login(username, password)
      .then(response => {
        cookie.save(JWT_TOKEN_COOKIE_NAME, response.data.access);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
        setErrorMessage(error.response.data.detail);
      })
      .finally(() => setIsLoading(false));
  }
}
