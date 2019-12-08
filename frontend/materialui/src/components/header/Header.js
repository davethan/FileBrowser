import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Link} from 'react-router-dom';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import { mdiArrowLeft } from '@mdi/js';
import Icon from '@mdi/react';
import useStyles from './Style.js';

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

export default function HideAppBar(props) {
  const classes = useStyles();
  const handleClick = () => {
    let path = props.path;
    if (!path.endsWith("../public")){
      path = path.substr(0,path.lastIndexOf("/"));
      props.startUpdatingDirectory(path,props.name);
    }
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Icon onClick={handleClick} color="white" size={1.5} path={mdiArrowLeft} />
            <Link className={classes.link} to="/">
              <h2 className={classes.h2}>File Browser</h2>
            </Link>
            <div></div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
}
