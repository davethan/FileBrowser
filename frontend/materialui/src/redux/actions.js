export function startGettingPostsData() {
  return dispatch => {
    return fetch('http://localhost:3001/browse/')
    .then(response => response.json())
    .then(data => {
        dispatch(loadPostsData(data)); //trigger the action
    });
  };
}

export function loadPostsData(data) {
  return {
    type: "GET_POSTS_DATA",
    state: data
  };
}

export function startUpdatingDirectory(path, name) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open("POST", "http://localhost:3001/updateDirectory");

      const formData = new FormData();
      formData.append("path", path);
      formData.append("name", name);

      req.send(formData);
      req.onload = () => {
        let resp = JSON.parse(req.response);
        dispatch(updateDirectory(resp));
      }
    });
  };
}

export function updateDirectory(data) {
  return {
    type: "GET_POSTS_DATA",
    state: data
  };
}

export function startDeletingPost(path, name) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      const formData = new FormData();
      formData.append("name", name);
      formData.append("path", path);

      req.open("POST", "http://localhost:3001/remove");
      req.send(formData);
    });
  };
}

export function setStateOfMenu(stateofMenu){
  return {
    type: "SET_STATE_OF_MENU",
    state: stateofMenu
  }
}

export function downloadFile(path, name) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      const formData = new FormData();
      formData.append("name", name);
      formData.append("path", path);

      req.open("POST", "http://localhost:3001/download");
      req.send(formData);
      req.onload = () => {
      //   let resp = JSON.parse(req.response);
      //   console.log(resp);
          console.log(req.response);
      }
    });
  };
}
