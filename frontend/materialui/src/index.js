import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App.js';
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core'
import {blue, yellow} from '@material-ui/core/colors'
import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./redux/reducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

const theme = createMuiTheme({
    palette:{
        primary: {
            main: blue[700],
            light:blue[500],
            dark: blue[900]
        },
        secondary: {
            main: yellow[700],
            light:yellow[500],
            dark: yellow[900]
        }
    }
})

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
