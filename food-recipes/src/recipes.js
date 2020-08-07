import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Container from '@material-ui/core/Container';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';

import { authenticated, saveRecipe, deleteRecipe } from './storage';
import HttpRequest from './HTTPRequests';
import Logout from './logout';

import yakisoba from './yakisoba.jpg';

import { recipesStyles }  from './styles';

export default function Recipes(){

	const classes = recipesStyles();

  const history = useHistory();

	const userInfo = authenticated();

  const [snackbarState, setsnackbarState] = useState({
      open: false,
      vertical: 'bottom', 
      horizontal: 'center',
      message : ''
  });

	const [recipes, setRecipesState] = useState([]);

	const [loading, setLoading] = useState({ isLoading : false, fail : '' });

	const [myRecsLoading, setMyRecsLoading] = useState(false);

	useEffect(() => {

 		if(loading.isLoading){

 			setsnackbarState({ ...snackbarState, open: false });

 		}else{

 			if(loading.fail){

 				showMessage(loading.fail)

 			}
 		}
 	}, [loading]);

	const showMessage = (message) => {

		setsnackbarState({...snackbarState, 
			open : true, 
			message : message 
		});

	};

  const handleClose = () => {
      setsnackbarState({ ...snackbarState, open: false });
  };

  const loadAllRecipes = async () => {

  	if(loading.isLoading){ return; }

  	try {

  		setLoading({ isLoading : true, fail : '' });

  		const response = await HttpRequest.APIGetRequest('recipe', userInfo.token);

  		if(response.ok){

  			setLoading({ isLoading : false, fail : '' });

  			const data = await response.json();

  			setRecipesState(data);

  		}else{

  			let message = 'error fetching recipes: ' + response.statusText;

				setLoading({ isLoading : false, fail : message });

  		}

  	}catch(e){

  		let message = 'Exception fetching recipes from server: ' + e;

			setLoading({ isLoading : false, fail : message });

  	}
  }

	useEffect(() => {

		loadAllRecipes();	

	}, []);

	const handleLoadMy = (e) => {

		e.preventDefault();

		if(!myRecsLoading){

			setMyRecsLoading(true);

			loadMyRecipes();	
		}

	};

	const handleLoadAll = (e) => {

		e.preventDefault();

		if(!loading.isLoading){

			loadAllRecipes();

		}

	};

	const handleDoubleClick = recipe => {
			saveRecipe(recipe);
			history.push("/single-recipe");
	};

	const handleCreate = () => {
			deleteRecipe();
			history.push("/single-recipe");
	}	

	const loadMyRecipes = async () => {

		if(myRecsLoading){ return; }

		try{

			setMyRecsLoading(true);

			const response = await HttpRequest.APIGetRequest(
				`recipe?user=${userInfo.id}`,
				userInfo.token);

			setMyRecsLoading(false);

			if(response.ok){

				const data = await response.json();

				setRecipesState(data);

			}else{

				let message = 'error fetching USER recipes: ' + response.statusText;

				showMessage(message);

			}

		}catch(e){

			setMyRecsLoading(false);

			let message = 'Exception fetching USER recipes from server [Error]' + e;

			showMessage(message);

		}
	}

	return (

		<React.Fragment>

			<CssBaseline />

				<header className={classes.headerRoot}>

				  <AppBar position="static" className="general-color" boxshadow={3}>
					  <Toolbar>
					    <Typography variant="h6" className={classes.title}>
					      Food Recipes
					    </Typography>

						 	<div className={classes.progressRoot}>

					      <div className={classes.wrapper}>

					      	<Button color="inherit" onClick={handleLoadAll}>Recipes</Button>

					        { loading.isLoading && <CircularProgress size={24} className={classes.buttonProgress} /> }

					      </div>

				    	</div>

				    	<div className={classes.progressRoot}>

					      <div className={classes.wrapper}>

					      	<Button color="inherit" onClick={handleLoadMy}>My Recipes</Button>
					      	
					        { myRecsLoading && <CircularProgress size={24} className={classes.buttonProgress} /> }

					      </div>

				    	</div>

			            <Button
			            	color="inherit"
			              aria-label="create a recipe"
			              onClick={ handleCreate }>
										Create a Recipe
			            </Button>


		          <Typography variant="h6" noWrap className={classes.userName}>
		            { ( userInfo.name ? userInfo.name : "User").toUpperCase() }
		          </Typography>

				     	<Avatar alt={userInfo.name} src={userInfo.image} className={classes.userImage}/>

				      <Logout />

					  </Toolbar>
					</AppBar>
				</header>

		    <div style={{ position: "relative", marginTop: "2%", textAlign : 'center' }}>
      		<Typography variant="h5" gutterBottom>
		        Recipes
		      </Typography>
      	</div>

				<Container maxWidth="lg">

			    <div className={classes.root}>

			      <Grid container spacing={3}>

							{	recipes.map( recipe => (

				        <Grid item xs={12} sm={3} lg={4} key={recipe.id}>

		              <Card className={classes.card} onDoubleClick={ e => handleDoubleClick(recipe) }>

							      <CardActionArea>

							        <CardMedia
							          className={classes.media}
							          image={recipe.category.image || yakisoba }
							          title={recipe.title}
							        />
							        <CardContent>
							          <Typography gutterBottom variant="h5" component="h2">
							            {recipe.title}
							          </Typography>
							          <Typography variant="body2" color="textSecondary" component="p">
							            { ( recipe.description ) ? recipe.description.substring(0,200).concat("...") : "" }
							          </Typography>
							        </CardContent>
							      </CardActionArea>
							      <CardActions>
							        <Button size="small" color="primary">
							          Details
							        </Button>
							      </CardActions>
							    </Card>
				        </Grid>

								)) }

								{ recipes.length === 0 && 
		      				<Typography variant="h5" gutterBottom style={{color:'gray'}}>
				        		No recipes received...
				      		</Typography>
      					}

			      </Grid>
			    </div>
				</Container>

				<Snackbar
	        anchorOrigin={ snackbarState }
	        key={`${snackbarState.vertical},${snackbarState.horizontal}`}
	        open={snackbarState.open}
	        onClose={handleClose}
	        message={snackbarState.message}/>

		</React.Fragment>
	);

}