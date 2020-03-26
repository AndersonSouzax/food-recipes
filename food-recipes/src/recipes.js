import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
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
import { blue } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';

import { authenticated, saveRecipe, deleteRecipe } from './storage';
import HttpRequest from './HTTPRequests';
import Logout from './logout';

import yakisoba from './yakisoba.jpg';

const useStyles = makeStyles(theme => ({
	card: {
		maxWidth: 345,
	},
	media: {
		height: 140,
  },
  root: {
    flexGrow: 1,
    position: 'relative',
    marginTop: '4%'
  },
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
  },
  buttonProgress: {
    color: blue[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  progressRoot: {
    display: 'flex',
    alignItems: 'center'
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  }
}));

export default function Recipes(){

	const classes = useStyles();

  const history = useHistory();

	const userInfo = authenticated();

	const snackRef = useRef(null);

  const [snackbarState, setsnackbarState] = useState({
      open: false,
      vertical: 'bottom', 
      horizontal: 'center',
      message : ''
  });

	const [recipes, setRecipesState] = useState([]);

	const [loading, setLoading] = useState(false);

	const [myRecsLoading, setMyRecsLoading] = useState(false);

  const handleClose = () => {
      setsnackbarState({ ...snackbarState, open: false });
  };

  function loadAllRecipes(){

  	HttpRequest
			.APIGetRequest('recipe', userInfo.token)
			.then((response) =>	{

				setLoading(false);

				if(response.ok){

					return response.json();

				}else{

					let message = 'error fetching recipes from server [Status] ' + response.statusText;

					setsnackbarState({ ...snackbarState, open: true, message : message });

				}

			})
			.then((data) => {

				if(data){

					setRecipesState(data);

				}

			})
			.catch((error) => {

				setLoading(false);

				let message = 'Exception fetching recipes from server [Error]' + error;

				setsnackbarState({ ...snackbarState, open: true, message : message });

			});
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

		if(!loading){

			setLoading(true);

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

	function loadMyRecipes(){

		HttpRequest
			.APIGetRequest(`recipe?user=${userInfo.id}`, userInfo.token)
			.then((response) =>	{

				setMyRecsLoading(false);

				if(response.ok){

					return response.json();

				}else{

					let message = 'error fetching USER recipes from server [Status] ' + response.statusText;

					setsnackbarState({ ...snackbarState, open: true, message : message });

				}

			})
			.then((data) => {

				if(data){

					setRecipesState(data);

				}

			})
			.catch((error) => {

				setMyRecsLoading(false);

				let message = 'Exception fetching USER recipes from server [Error]' + error;

				setsnackbarState({ ...snackbarState, open: true, message : message });

			});
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

					        { loading && <CircularProgress size={24} className={classes.buttonProgress} /> }

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
	      	ref={snackRef} 
	        anchorOrigin={ snackbarState }
	        key={`${snackbarState.vertical},${snackbarState.horizontal}`}
	        open={snackbarState.open}
	        onClose={handleClose}
	        message={snackbarState.message}/>

		</React.Fragment>
	);

}