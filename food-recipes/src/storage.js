export const authenticated = () => {
  return JSON.parse(localStorage.getItem('userInfo'));
};

export const saveAuth = (auth) => {
  localStorage.setItem('userInfo', JSON.stringify(auth));
};

export const deleteAuth = (auth) => {
	localStorage.removeItem('userInfo');
};

export const saveRecipe = (recipe) => {
		localStorage.removeItem('recipe');
		localStorage.setItem('recipe', JSON.stringify(recipe));
};

export const getRecipe = () => {
	return JSON.parse(localStorage.getItem('recipe'));
};