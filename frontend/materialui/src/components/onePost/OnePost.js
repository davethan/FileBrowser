import React from 'react';
import Card from '@material-ui/core/Card';
import {Link} from 'react-router-dom';
import useStyles from './Style.js';
import Icon from '@mdi/react';
import { mdiFolderOutline } from '@mdi/js';
import { mdiFileDocumentOutline } from '@mdi/js';

export default function OnePost(props) {
  const classes = useStyles();
  const handleClick = () => {
    props.startUpdatingDirectory(props.path,props.name)
  }
  if (props.name.includes(".")){
    return (
        <Link to={`/post/${props.id}`} className={classes.link}>
          <Card className={classes.card}>
            <Icon color="black" size={2.5} path={mdiFileDocumentOutline} />
            {props.name}
          </Card>
        </Link>
    );
  }
  else{
    return (
        <Card className={classes.card}>
          <Icon onClick={handleClick} color="black" size={2.5} path={mdiFolderOutline} />
          {props.name}
        </Card>
    );
  }
}
