import HttpRequest from './HTTPRequests';
import { saveAuth } from './storage';

import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green, blue } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';

import clsx from 'clsx';
import './css/general.css';

const useStyles = makeStyles(theme => ({
  headerRoot: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  margin: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: '16%'
  },
  textField: {
    width: '25ch',
  },
  iconButton: {
  	color: 'black',
  },
	progressRoot: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '30px',
    position: 'relative',
    marginLeft: '30%'
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: blue[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
}));

export default function Login(){

  const history = useHistory();

	const classes = useStyles();

	const snackRef = useRef(null);

  const[login, setLoginInformations] = useState({ email : '', password : '' });

  const [snackbarState, setsnackbarState] = useState({
      open: false,
      vertical: 'bottom', 
      horizontal: 'center',
      message : ''
  });

	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const buttonClassname = clsx({
  	[classes.buttonSuccess]: success,
  	'general-color' : true
	});

  const handleChange = prop => event => {
    setLoginInformations({ ...login, [prop]: event.target.value });
  };

   const handleClickShowPassword = () => {
    setLoginInformations({ ...login, showPassword: !login.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleClose = () => {
      setsnackbarState({ ...snackbarState, open: false });
  };

  const handleButtonClick = () => {

    if (!loading) {

      setSuccess(false);
      setLoading(true);

      setsnackbarState({ ...snackbarState, open: false });

     HttpRequest.loginAuth({ 
            username : login.email, 
            password : login.password 
        })
	    .then((response) => {

	        setLoading(false);

	        if (!response.ok) {

	            let message = 'Login error! Invalid credentials sent';

	            setsnackbarState({ ...snackbarState, open: true, message : message });

	            return null;
	        }

	        return response.json();

	    })
	    .then((myUser) => {
	       
	        if(myUser){

							setSuccess(true);

	            saveAuth(myUser);

	            history.push("/recipes");

	        }else{

	            let message = 'Login error! Invalid credentials sent';

	            setsnackbarState({ ...snackbarState, open: true, message : message });
	        }
	    })
	    .catch((error) => {
	        
	        setLoading(false);

	        let message = 'There has been a problem when connecting to server: ' + error;

	        setsnackbarState({ ...snackbarState, open: true, message : message });

	    });
    }
  };


	return (

		<React.Fragment>

      <CssBaseline />
      
      <header className={classes.headerRoot}>
			  <AppBar position="static" className="general-color" boxshadow={3}>
				  <Toolbar>
				    <Typography variant="h6" className={classes.title}>
				      Food Recipes
				    </Typography>
				  </Toolbar>
				</AppBar>
			</header>

      <Container maxWidth="sm" style={{ textAlign : 'center' }}>

      	<div style={{ position: "relative", marginTop: "15%" }}>
      		<Typography variant="h5" gutterBottom>
		        Login in Your Account for Delights
		      </Typography>
      	</div>

        <form noValidate autoComplete="off" style={{ position: "relative", marginTop: "15%" }}>

		      <div className={classes.margin}>

		        <Grid container spacing={1} alignItems="flex-end">

		          <Grid item>

		            <IconButton
		            	className={classes.iconButton}
		              aria-label="toggle email visibility"
		              onMouseDown={handleMouseDownPassword}>
									<AccountCircle />
		            </IconButton>
		            
		          </Grid>

		          <Grid item>
		            <TextField 
		            	id="input-with-icon-grid" 
		            	label="User Email" 
		            	value={login.email}
		            	onChange={handleChange('email')}/>
		          </Grid>

		        </Grid>
		      </div>


		      <div className={classes.margin}>

		        <Grid container spacing={1} alignItems="flex-end">

		        	<Grid item>
                <IconButton
                	className={classes.iconButton}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}>

                  {login.showPassword ? <Visibility /> : <VisibilityOff />}

                </IconButton>
		          </Grid>

		          <Grid item>
		            
		            <TextField
		            	id="standard-adornment-password" 
		            	label="User Password" 
		            	type={login.showPassword ? 'text' : 'password'}
		            	value={login.password}
		            	onChange={handleChange('password')}
		            	/>

		          </Grid>

		        </Grid>

		      </div>

		      <div className={classes.progressRoot}>

			      <div className={classes.wrapper}>

			        <Button
			          variant="contained"
			          color="secondary"
			          className={buttonClassname}
			          disabled={ loading || !login.email || !login.password }
			          onClick={handleButtonClick}>
			          {success && <CheckIcon />}
			          Confirm
			        </Button>

			        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}

			      </div>

		    	</div>

				</form>

      </Container>

      <Snackbar
      	ref={snackRef} 
        anchorOrigin={ snackbarState }
        key={`${snackbarState.vertical},${snackbarState.horizontal}`}
        open={snackbarState.open}
        onClose={handleClose}
        message={snackbarState.message}/>

    </React.Fragment>
	);
}