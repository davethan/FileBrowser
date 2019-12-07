import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  loadingDiv:{
    width:'40px',
    height:'40px',
    margin: 'auto',
  },
  CircularProgress: {
    height: '25px',
    width: '50px',
  }
}));

export default useStyles
