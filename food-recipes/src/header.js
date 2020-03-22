import React from 'react';     
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { deleteAuth, authenticated } from './auth';

import './css/general.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  }
}));

export default function Header(){

	const classes = useStyles();

	const userPresent = authenticated();

	return (

		<div className={classes.root}>
		  <AppBar position="static" className="general-color" boxshadow={3}>
				  <Toolbar>
				    <Typography variant="h6" className={classes.title}>
				      Food Recipes
				    </Typography>
				     { 
				     	userPresent ? 


				      	<Button color="inherit">Logout</Button>
				      	: <></>
				     }
				  </Toolbar>
			</AppBar>
		</div>
	);
}