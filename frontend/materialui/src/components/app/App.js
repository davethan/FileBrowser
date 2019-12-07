import React, { useEffect } from 'react';
import {Route} from 'react-router-dom';
import Header from '../header/Header.js';
import OnePost from '../onePost/OnePost.js';
import Post from '../post/Post.js';
import Loading from '../loading/Loading.js';
import UploadForm from '../uploadForm/UploadForm.js';
import useStyles from './Style.js';
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import * as actions from "../../redux/actions.js";

function App(props) {
  const classes = useStyles();

  useEffect(() => {
    if (props.getPostsDataReducer === null){
      props.startGettingPostsData()
    }
  });

  //returning every post
  const returnPosts = ()=>{
    if (props.getPostsDataReducer === null) {return(<Loading/>)}
    else {
      return(
        props.getPostsDataReducer.items.map((card,id) => (
          <OnePost key={id}
                   id={id}
                   name={props.getPostsDataReducer.items[id]}
                   path={props.getPostsDataReducer.path}
                   startUpdatingDirectory={props.startUpdatingDirectory}
          />
        ))
      );
    }
  }

  const individualPost = (params) => {
    if (props.getPostsDataReducer !== null){
      const id = Number(params.match.params.id);
      const name = props.getPostsDataReducer.items[id];
      const path = props.getPostsDataReducer.path;
      return (<Post
        startGettingPostsData={props.startGettingPostsData}
        startDeletingPost={props.startDeletingPost}
        downloadFile={props.downloadFile}
        {...params}
        name={name}
        path={path}/>);
    }
  }

  const HeaderWithProps = () => {
    if (props.getPostsDataReducer === null) {return(<Loading/>)}
    else {
      return (
        <Header path={props.getPostsDataReducer.path}
                startUpdatingDirectory={props.startUpdatingDirectory}
        />
      );
    }
  }

  const uploadFilesForm = () => {
    if (props.getPostsDataReducer === null) {return(<Loading/>)}
    else {
      return (
        <UploadForm
          path={props.getPostsDataReducer.path}
          startGettingPostsData={props.startGettingPostsData}
          />
      );
    }
  }

  return (
    <div>
      {HeaderWithProps()}

      <Route exact path="/" render={({history})=>(
        <React.Fragment>
          <div className={classes.mainPage}>
            {returnPosts()}
          </div>
          {uploadFilesForm()}
        </React.Fragment>
      )}/>

      <Route exact path="/post/:id" render={(params)=>(
        individualPost(params)
      )}/>

    </div>
  );
}

//Redux Injection!
function mapStateToProps(state) {
  return {
    getPostsDataReducer: state.getPostsDataReducer
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
