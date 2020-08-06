import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Snackbar from '@material-ui/core/Snackbar';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

import { authenticated, getRecipe } from './storage';
import HttpRequest from './HTTPRequests';
import Logout from './logout';

import './css/general.css';
import { singleRClasses } from './styles';

import yakisoba from './yakisoba.jpg';

export default function Recipe(){

	const classes = singleRClasses();
	const userInfo = authenticated();
	const history = useHistory();
	const inter = getRecipe();

	const imageUrl = inter && inter.category ? inter.category.image : null;

	const [recipe, setRecipe] = useState(inter || {});

	const [category, setCategory] = useState( 
		recipe && recipe.category  ? 
			recipe.category.id ? 
				recipe.category.id.toString() : recipe.category
		: 
			''
	);

	const [loading, setLoading] = useState({ isLoading : false, fail : '' });

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

		const userInfo = authenticated();
		const recipe = getRecipe();

		const viewing = recipe 
	 				&& recipe.user 
	 				&& recipe.user.id !== userInfo.id;

 		if(viewing){ return; }

 		try{

 			const reponse = await HttpRequest.APIGetRequest('category', userInfo.token);

 			if(response.ok){

 				const data = await response.json();

 				setCategories(data);

 			}else{

 				let message = `error fetching categories [Status] ${response.statusText}`;

				setsnackbarState({ ...snackbarState, open: true, message : message });

 			}

 		}catch(e){

 			let message = `Exception fetching categories: ${e}. Reload the page...`;

			setsnackbarState({ ...snackbarState, open: true, message : message });
 		}

	}, []);

 	useEffect(() => {

 		if(loading.isLoading){

 			setsnackbarState({ ...snackbarState, open: false });

 		}else{

 			if(loading.fail){

 				setsnackbarState({...snackbarState, 
 					open : true, 
 					message : loading.fail 
 				});

 			}
 		}
 	}, [loading]);

	useEffect(() => {
		setRecipe(recipe => { recipe.category = category; return recipe; });
	},[category]);

	const handleClose = () => {
      setsnackbarState({ ...snackbarState, open: false });
  };

  const handleChange = prop => event => {
    setRecipe({ ...recipe, [prop]: event.target.value || '' });
  };

  const handleCategoryChange = event => {
    setCategory(event.target.value);
  };

  const goBack = () => {
  	history.goBack();
  };

  // @type : 0 = save, 1 = update, 2  = delete
  const handleRecipe = async (type) => {

  	if(loading.isLoading){ return; }

  	setLoading({  isLoading : true, fail : '' });

  	try{

	  	const method = requests[type];
	  	const url = method === 'POST' ? 'recipe/' : `recipe/${recipe.id}/`
	  	const bodyR = method !== 'DELETE' ? Object.assign( {}, recipe) : null;
	  	const operation = method !== 'DELETE' ? 
	  		( method === 'POST' ? 'creating' : 'updating') 
	  		: 'deleting';

			/* 
				title* : String
		  	description*: String
		  	category*: ID
		  	user*: ID

	 			*required
	 		*/

	  	if(bodyR){
	  		bodyR.user = userInfo.id;
	  	}

	  	const response = await HttpRequest.APIMultiRequest(url, 
	  		userInfo.token, method, bodyR);

	  	if(response.ok){

	  		setLoading({ isLoading : false, fail : `Success ${operation} recipe` });

				history.push("/recipes");

	  	}else{

	  		let message = `error ${operation} recipe on 
	  			the server: ${response.status}`;

				setLoading({ isLoading : false, fail : message });
	  	}

  	}catch(e){

  		let message = `Exception raised while ${operation} 
  			on the server: ${e}`;

			setLoading({ isLoading : false, fail : message });

  	}

  };

	return (

		<>
      
      <CssBaseline />
      
      <header className={classes.headerRoot}>
			  <AppBar position="static" className="general-color" boxshadow={3}>
				  <Toolbar>

          <IconButton
          		className={classes.backIcon}
          		edge="start"
              aria-label="go back"
              onClick={ goBack }>
          	<ArrowBackIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
			      Go Back
			    </Typography>

          <Typography variant="h6" noWrap className={classes.userName}>
            { ( userInfo.name ? userInfo.name : "User").toUpperCase() }
          </Typography>

		     	<Avatar alt={userInfo.name} src={userInfo.image} className={classes.userImage}/>

					<Logout />

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
				          image={imageUrl || yakisoba }
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

							  	<p className={classes.textArea}>
						        Category : 
						      </p>
						  			
						  	</Grid>

						  	<Grid item xs={6} md={6} lg={6}>

							  	<p className={classes.textArea}>
						        { recipe.category ? recipe.category.name : "No Category Information" }
						      </p>

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

							    <p className={classes.textArea}>
							      { recipe.description }
							    </p>
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
							      		onDoubleClick={e => handleRecipe(editing ? 1 : 0) }
							      		startIcon={<SaveIcon />}>
							      		Save
							      	</Button>

							        { loading.isLoading && <CircularProgress size={24} className={classes.buttonProgress} /> }

							      </div>

						    	</div>

			        	</Grid>
		      	}

		      </Grid>

      		</CardContent>

      	</Card>

	      {

	      	editing && 

			      <Button
			        variant="contained"
			        color="default"
			        onDoubleClick={e => handleRecipe(2)}
			        className={classes.deleteButton}
			        startIcon={<DeleteIcon />}
			      >        
			     Delete Recipe
		      </Button>	
	      }

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