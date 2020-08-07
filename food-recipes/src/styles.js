import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { green, blue } from '@material-ui/core/colors';

const headerAndTitle = {
  headerRoot : { flexGrow: 1 },
  title : { flexGrow: 1 },
};

export const loginClasses = makeStyles(theme => ({
  ...headerAndTitle,
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

export const headerClasses = makeStyles(theme => ({
  ...headerAndTitle,
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

export const singleRClasses = makeStyles(theme => ({
  infoGrid : {
    flexGrow: 1,
    margin: theme.spacing(2),
    textAlign: 'center',
    minWidth: 200,
    maxWidth: 700,
  },
  ...headerAndTitle,
  textField: { width: '45ch' },
  textArea:{
    fontSize: 14,
    fontFamily : 'roboto'
  },
  backIcon: { color: '#ffffff' },
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
  deleteButton: {
    marginTop : '6%',
    marginBottom: '5%',
  }
}));


export const recipesStyles = makeStyles(theme => ({
  card: { maxWidth: 345 },
  media: { height: 140 },
  root: {
    flexGrow: 1,
    position: 'relative',
    marginTop: '4%'
  },
  ...headerAndTitle,
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

