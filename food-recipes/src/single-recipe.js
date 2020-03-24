import React, { useState, useEffect, useRef } from 'react';
import { Route } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CssBaseline from '@material-ui/core/CssBaseline';
import Snackbar from '@material-ui/core/Snackbar';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { authenticated, getRecipe } from './storage';
import HttpRequest from './HTTPRequests';
import './css/general.css';

const useStyles = makeStyles(theme => ({
	infoGrid : {
		flexGrow: 1,
		margin: theme.spacing(2),
		 textAlign: 'center',

	},
  headerRoot: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  backIcon: {
  	color: '#ffffff',
  },
  userName: {
  	position: 'relative',
  	marginLeft: '2%',
  	marginRight: '5px'
  }
}));

export default function Recipe(){

	const classes = useStyles();

	const userInfo = authenticated();

	const recipe = getRecipe();

	const snackRef = useRef(null);

	const viewing = recipe 
 				&& recipe.user 
 				&& recipe.user.id !== userInfo.id;

 	const editing = recipe 
 				&& recipe.user 
 				&& recipe.user.id === userInfo.id;

  const [snackbarState, setsnackbarState] = useState({
      open: false,
      vertical: 'bottom', 
      horizontal: 'center',
      message : ''
  });

  const [categories, setCategories] = useState([]);

 	useEffect(() => {

 		if(viewing){ return; }

		HttpRequest
			.APIGetRequest('category', userInfo.token)
			.then((response) =>	{

				if(response.ok){

					return response.json();

				}else{

					let message = 'error fetching categories from server [Status] ' + response.statusText;

					setsnackbarState({ ...snackbarState, open: true, message : message });

				}

			})
			.then((data) => {

				if(data){

					setCategories(data);

				}

			})
			.catch((error) => {

				let message = 'Exception fetching USER recipes from server [Error]' + error;

				setsnackbarState({ ...snackbarState, open: true, message : message });

			});

	}, []);

	const handleClose = () => {
      setsnackbarState({ ...snackbarState, open: false });
  };

	return (

		<React.Fragment>
      
      <CssBaseline />
      
      <header className={classes.headerRoot}>
			  <AppBar position="static" className="general-color" boxshadow={3}>
				  <Toolbar>

	        <Route render={ ({ history }) => (
	        	<>
	            <IconButton
	            		className={classes.backIcon}
	            		edge="start"
	                aria-label="go back"
	                onClick={ () => history.goBack() }>
	            	<ArrowBackIcon />
	            </IconButton>

		          <Typography variant="h6" className={classes.title}>
					      Go Back
					    </Typography>
				    </>
          )}/>

          <Typography variant="h6" noWrap className={classes.userName}>
            { ( userInfo.name ? userInfo.name : "User").toUpperCase() }
          </Typography>

		     	<Avatar alt={userInfo.name} src={userInfo.image} className={classes.userImage}/>

					<Button color="inherit">Logout</Button>

				  </Toolbar>
				</AppBar>
			</header>

      <Container maxWidth="sm" style={{ textAlign : 'center' }}>

        <div style={{ position: "relative", marginTop: "4%" }}>
      		<Typography variant="h5" gutterBottom>
		        { viewing ? 'Recipe Details' : ( editing ? 'Update Recipe Informations' : 'Creating a New Recipe' ) }
		      </Typography>
      	</div>

      	<div className={classes.infoGrid} boxshadow={3}>
		      <Grid container spacing={3}>
		        <Grid item xs={12}>
		          <Paper className={classes.paper}>xs=12</Paper>
		        </Grid>
		        <Grid item xs={6}>
		          <Paper className={classes.paper}>xs=6</Paper>
		        </Grid>
		        <Grid item xs={6}>
		          <Paper className={classes.paper}>xs=6</Paper>
		        </Grid>
		        <Grid item xs={3}>
		          <Paper className={classes.paper}>xs=3</Paper>
		        </Grid>
		        <Grid item xs={3}>
		          <Paper className={classes.paper}>xs=3</Paper>
		        </Grid>
		        <Grid item xs={3}>
		          <Paper className={classes.paper}>xs=3</Paper>
		        </Grid>
		        <Grid item xs={3}>
		          <Paper className={classes.paper}>xs=3</Paper>
		        </Grid>
		      </Grid>
    		</div>

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