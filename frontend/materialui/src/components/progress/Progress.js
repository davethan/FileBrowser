import React, { Component } from "react";
import styles from "./Styles.js";
import { withStyles } from '@material-ui/styles';

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.ProgressBar}>
        <div
          className={classes.Progress}
          style={{ width: this.props.progress + "%" }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Progress);
