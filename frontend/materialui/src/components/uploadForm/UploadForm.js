import React, { Component } from "react";
import Dropzone from "../dropzone/Dropzone";
import styles from "./Styles.js";
import { withStyles } from '@material-ui/styles';
import Progress from "../progress/Progress";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@mdi/react';
import { mdiCheck } from '@mdi/js';

class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }

  updateTitle(e){
    this.setState({title: e.target.value});
  }

  updateDescription(e){
    this.setState({description: e.target.value});
  }

  updateMore(e){
    this.setState({more: e.target.value});
  }

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach(file => {
        let newPostData = {
          file: file
        }
        promises.push(this.sendRequest(newPostData));
    });
    await Promise.all(promises);
    this.setState({ successfullUploaded: true, uploading: false });
    if (promises.length !== 0) {
      this.props.startGettingPostsData();
      window.location.reload();
    }
  }

  sendRequest(newPostData) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[newPostData.file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...this.state.uploadProgress };
        copy[newPostData.file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[newPostData.file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();
      formData.append("file", newPostData.file);
      formData.append("path", this.props.path);

      req.open("POST", "http://localhost:3001/upload");
      req.send(formData);
    });
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div>
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <Icon color="green" size={1} path={mdiCheck} />
        </div>
      );
    }
  }

  renderActions() {
    const { classes } = this.props;
    if (this.state.successfullUploaded) {
      return (
        <Button
          variant="contained"
          color="secondary"
          className={classes.UploadButton}
          onClick={() =>
            this.setState({ files: [], successfullUploaded: false })
          }
        >
          <Typography variant="h6">Clear</Typography>
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="secondary"
          className={classes.UploadButton}
          disabled={this.state.files.length < 0 || this.state.uploading}
          onClick={this.uploadFiles}
        >
          <Typography variant="h6">Send!</Typography>
        </Button>
      );
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.Upload}>
        <div>
          <div className={classes.AllInputs}>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfullUploaded || this.state.files.length > 0}
            />
          </div>
          <div>
          <br/>
            {this.state.files.map(file => {
              return (
                <div key={file.name}>
                  <span>{file.name}</span>
                  {this.renderProgress(file)}
                </div>
              );
            })}
          </div>
        </div>
        <div>{this.renderActions()}</div>
      </div>
    );
  }
}

export default withStyles(styles)(UploadForm);
