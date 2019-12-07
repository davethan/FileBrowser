import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    top: 36,
    right: 0,
    left: 0,
  },
  menuButton: {
    marginLeft: theme.spacing(10),
  },
  link:{
    textDecoration:'none',
    color:'black'
  },
}));

export default useStyles
