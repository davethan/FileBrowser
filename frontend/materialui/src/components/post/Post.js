import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Icon from '@mdi/react';
import { mdiFileDocumentOutline } from '@mdi/js';
import useStyles from './Style.js';

export default function Post(props) {
  const classes = useStyles();
  let path = props.path;
  let stringToRecognise = "../public";
  path = path.substring(path.indexOf(stringToRecognise)+stringToRecognise.length);
  path = "http://localhost:3001"+path+"/"+props.name;
  return(
      <Card className={classes.card}>
        <a target="_blank" href={path}>
          <CardActionArea>
            <Icon color="black" size={2.5} path={mdiFileDocumentOutline} />
            {props.name}
          </CardActionArea>
        </a>
        <CardActions>
          <Button
          size="medium"
          color="primary"
          onClick = {() => {
              props.startDeletingPost(props.path, props.name);
              props.startGettingPostsData();
              props.history.push('/');
          }}>
            Delete
          </Button>
          <Button
          size="medium"
          color="primary"
          onClick = {() => {
              props.downloadFile(props.path, props.name);
          }}>
            Download
          </Button>
          <Button
          size="medium"
          color="primary"
          onClick = {() => {
              props.history.push('/')
          }}>
            Go Back
          </Button>
        </CardActions>
      </Card>
    )
}
