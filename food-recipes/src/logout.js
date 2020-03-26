import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { deleteAuth } from './storage';



export default function Logout(){

	const history = useHistory();

	const execute = () => {

		deleteAuth();
		history.push("/login");
		
	}

	return (
		<Button 
			onDoubleClick={execute}
			color="inherit">
			Logout
		</Button>
	);
	
}
