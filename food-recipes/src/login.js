import HttpRequest from './HTTPRequests';
import { saveAuth } from './storage';

import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';

import './css/general.css';
import { loginClasses } from './styles';

export default function Login(){

  const history = useHistory();

	const classes = loginClasses();

  const[login, setLoginInformations] = useState({ email : '', password : '' });

  const [snackbarState, setsnackbarState] = useState({
      open: false,
      vertical: 'bottom', 
      horizontal: 'center',
      message : ''
  });

	const [loading, setLoading] = useState({ isLoading : false, fail : '' });

  useEffect(() => {

    if(loading.isLoading){

      setsnackbarState({ ...snackbarState, open: false });

    }else{

      if(loading.fail){

        setsnackbarState({...snackbarState, open : true, message : loading.fail });  

      }

    }

  }, [loading]);

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

  const handleButtonClick = async () => {

    if (!loading.isLoading) {

      try{

        setLoading({ fail : '' , isLoading : true });

        const response = await HttpRequest.loginAuth({ 
          username : login.email, 
          password : login.password 
        });

        if(response.ok){

          let user = await response.json();

          saveAuth(user);

          history.push("/recipes");

        }else{

          setLoading({ isLoading : false, 
            fail : 'Login Error, check your email and password'});
        }

      }catch(e){
        
        setLoading({ isLoading : false, 
         fail : 'There was a problem connecting to server: ' + e });

      }
    }
  };


	return (

		<>

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
                className="general-color"
			          disabled={ loading.isLoading || !login.email || !login.password }
			          onClick={handleButtonClick}>
			          Confirm
			        </Button>

			        {loading.isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}

			      </div>

		    	</div>

				</form>

      </Container>

      <Snackbar
        anchorOrigin={ snackbarState }
        key={`${snackbarState.vertical},${snackbarState.horizontal}`}
        open={snackbarState.open}
        onClose={handleClose}
        message={snackbarState.message}/>

    </>
	);
}