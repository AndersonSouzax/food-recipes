import React, { useState, useEffect, useRef } from 'react';
import { Route } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import { blue } from '@material-ui/core/colors';
import SaveIcon from '@material-ui/icons/Save';

import { authenticated, getRecipe } from './storage';
import HttpRequest from './HTTPRequests';
import './css/general.css';
import yakisoba from './yakisoba.jpg';

const useStyles = makeStyles(theme => ({
	infoGrid : {
		flexGrow: 1,
		margin: theme.spacing(2),
		textAlign: 'center',
		minWidth: 200,
		maxWidth: 700,
	},
  headerRoot: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  textField: {
    width: '45ch',
  },
  textArea:{
  	fontSize: 14,
  	fontFamily : 'roboto'
  },
  backIcon: {
  	color: '#ffffff',
  },
  userName: {
  	position: 'relative',
  	marginLeft: '2%',
  	marginRight: '5px'
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
    left: '37%'
  },
  button : {
  	backgroundColor: '#ea1d2c',
  	color: 'white',
  	'&:hover': {
      backgroundColor: '#ea1a1a',
      borderColor: '#ea0f0f',
      boxShadow: 'none',
    }
  },
	media: {
		height: 140,
  },
}));

export default function Recipe(){

	const classes = useStyles();

	const userInfo = authenticated();

	const [recipe, setRecipe] = useState(getRecipe() || {});

	const [category, setCategory] = useState( 
		recipe && recipe.category  ? 
			recipe.category.id ? 
				recipe.category.id.toString() : recipe.category
		: 
			''
	);

	const snackRef = useRef(null);

	const [loading, setLoading] = useState(false);

	const [success, setSuccess] = useState(false);

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

  const requests = ['POST','PUT','DELETE'];

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

	useEffect(() => {
		setRecipe({ ...recipe, category : category });
	},[category]);

	const handleClose = () => {
      setsnackbarState({ ...snackbarState, open: false });
  };

  const handleChange = prop => event => {
    setRecipe({ ...recipe, [prop]: event.target.value });
  };

  const handleCategoryChange = event => {
    setCategory(event.target.value);
  };

  // @type : 0 = save, 1 = update, 2  = delete
  const handleRecipe = type => {

  	if(loading){ return; }

  	const method = requests[type];
  	const url = method === 'POST' ? 'recipe' : 'recipe/' + recipe.id
  	const bodyR = method !== 'DELETE' ? recipe : null;

  	HttpRequest
			.APIMultiRequest(url, userInfo.token, method, bodyR)
			.then((response) =>	{

				setLoading(false);

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

				setLoading(false);

				let message = 'Exception fetching USER recipes from server [Error]' + error;

				setsnackbarState({ ...snackbarState, open: true, message : message });
			});
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

      	<Card className={classes.infoGrid}>
      		
      		<CardContent>

		      <Grid container spacing={3}>
		        <Grid item xs={12} md={12} lg={12}>
		          
		          {

		          	viewing ? 

		          		<Typography variant="h6" gutterBottom>
						        {recipe.title}
						      </Typography>			
		          	 : 

		          	 <TextField
		          	 	className={classes.textField}
		            	id="recipe-title" 
		            	label="Recipe Title" 
		            	type='text'
		            	value={recipe.title}
		            	onChange={handleChange('title')}
		            	/>

		          }
		        </Grid>

		        { 
		        	( editing || viewing ) && 
		        	<Grid item xs={12} md={12} lg={12}>
				        <CardMedia
				          className={classes.media}
				          image={recipe.category.image || yakisoba }
				          title={recipe.title}
				        />
		        	</Grid>
 						}

		        <Grid item xs={12} md={12} lg={12}>

						{
							!viewing ? 

								<>
							    <InputLabel id="simple-select-label">Recipe Category</InputLabel>

							    <Select
							      labelId="simple-select-label"
							      id="simple-select"
							      value={category}
							      onChange={handleCategoryChange}>

							      {
							      	categories.map( cat => (
							      		 <MenuItem value={cat.id} key={cat.id}>{cat.name}</MenuItem>
							      	))
							      }
							      
							    </Select>
						    </>
						  :

						  <Grid container spacing={3}>

						  	<Grid item xs={6} md={6} lg={6}>

							  	<Typography variant="p" className={classes.textArea}>
						        Category : 
						      </Typography>
						  			
						  	</Grid>

						  	<Grid item xs={6} md={6} lg={6}>

							  	<Typography variant="p" className={classes.textArea}>
						        { recipe.category ? recipe.category.name : 'No Category Information' }
						      </Typography>

						  	</Grid>

						  </Grid>

						}

		        </Grid>

		        <Grid item xs={12} md={12} lg={12}>
          		<Typography variant="h6">
				       	Description
				      </Typography>
		        </Grid>

		        <Grid item xs={12}>

							{
								!viewing ?

				          <TextField
			          	 	className={classes.textField}
			            	id="recipe-description" 
			            	multiline
			            	label="Recipe Description" 
			            	type='text'
			            	value={recipe.description}
			            	onChange={handleChange('description')}
				            />

								 :

							    <Typography variant="p" className={classes.textArea}>
							      { recipe.description }
							    </Typography>
							}
		        </Grid>
		        
		        {
		        	!viewing 
		        		&& recipe.title 
		        		&& recipe.description 
		        		&& recipe.category &&

			          <Grid item xs={12} style={{ textAlign : 'center' }}>
			          
				          <div className={classes.progressRoot}>

							      <div className={classes.wrapper}>

							      	<Button 
							      		color="inherit"
							      		variant="contained"
							      		className={classes.button}
							      		startIcon={<SaveIcon />}>
							      		Save
							      	</Button>

							        { loading && <CircularProgress size={24} className={classes.buttonProgress} /> }

							      </div>

						    	</div>

			        	</Grid>
		      	}

		      </Grid>

      		</CardContent>

      	</Card>

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