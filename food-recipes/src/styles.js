import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { green, blue } from '@material-ui/core/colors';

export const loginClasses = makeStyles(theme => ({
  headerRoot : { flexGrow: 1 },
  title : { flexGrow: 1 },
  margin : {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: '16%'
  },
  textField : { width : '25ch' },
  iconButton : { color : 'black' },
	progressRoot : {
    display: 'flex',
    alignItems: 'center',
    marginTop: '30px',
    position: 'relative',
    marginLeft: '30%'
  },
  wrapper : {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess : {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress : {
    color: blue[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  
}));