import React from 'react';     
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import { deleteAuth, authenticated } from './auth';

import './css/general.css';

const useStyles = makeStyles(theme => ({
  headerRoot: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  userName: {
  	position: 'relative',
  	marginLeft: '2%',
  	marginRight: '5px'
  },
  userImage:{
  	position: 'relative',
  	marginRight: '1%',
  }
}));

export default function Header(){

	const classes = useStyles();

	const userPresent = JSON.parse(authenticated());

	return (

		<header className={classes.headerRoot}>
		  <AppBar position="static" className="general-color" boxshadow={3}>
			  <Toolbar>
			    <Typography variant="h6" className={classes.title}>
			      Food Recipes
			    </Typography>
			     { 
			     	userPresent ? 
			     		<>
					     	<Button color="inherit">Recipes</Button>
					     	<Button color="inherit">My Recipes</Button>
					     	<Button color="inherit">Create a Recipe</Button>

			          <Typography variant="h6" noWrap className={classes.userName}>
			            {( userPresent.name ? userPresent.name : "User").toUpperCase() }
			          </Typography>

					     	<Avatar alt={userPresent.name} src={userPresent.image} className={classes.userImage}/>

					      <Button color="inherit">Logout</Button>
			      	</>
			      	: <></>
			     }
			  </Toolbar>
			</AppBar>
		</header>
	);
}