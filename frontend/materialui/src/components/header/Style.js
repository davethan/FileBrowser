import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'fixed',
    bottom: 'auto',
    top: 0,
    height: '3.5rem'
  },
  toolbar:{
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 'auto',
    marginBottom: 'auto',
    minHeight:'2.5rem',
  },
  h2:{
    textAlign: 'center',
    fontWeight: 100,
    fontSize: '2rem',
    margin:0,
    fontStyle: 'normal',
  },
  a:{
    color:'white',
    textDecoration:'none',
  },
  link:{
    textTransform:'none',
    textDecoration:'none',
    color:'white'
  }
}));

export default useStyles
