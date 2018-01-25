import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import reduxPromise from 'redux-promise';
import reduxMulti from 'redux-multi';
import reduxThunk from 'redux-thunk';

import reducers from './redux';
import { App as SimplesVet } from './containers';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

const store = applyMiddleware(reduxPromise, reduxMulti, reduxThunk)(createStore);

const App = () => (
  <Provider store={store(reducers, devTools)}>
    <SimplesVet />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));
