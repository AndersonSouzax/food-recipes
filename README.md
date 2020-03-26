# food-recipes
	A recipes portal with a lot of taste and delights

# The Application

## How to get it runnig?

	Download the project, go to food-recipes folder and install the project dependecies.
	With dependencies installed, run `yarn start` to get the application running. The application should open in default browser after running the command.

## Login

	The page responsible for users authentication. The user must enter with its email and password to have access to the recipes portal. The path to the page is: __/login__

## Recipes Listing

	After log in to the application, the recipes listing is displayed.
	The default list is a "general" recipes list, i.e, recipes created by other users.
	This list is also accessible by clicking __RECIPES__ button on the page header.

### Page Header

	The header has 4 buttons, respectively: __RECIPES__, __MY RECIPES__, __CREATE A RECIPE__ and __LOGOUT__. With the respective actions performed:

	* List recipes

		List the general recipes from API

	* List __MY__ recipes

		List the actions owned by the user

	* Create a new recipe

		Create a new recipe to be owned by the user

	* Log out the application

		Log out the application and return to login page