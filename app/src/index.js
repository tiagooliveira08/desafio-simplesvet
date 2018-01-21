import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import ReduxMulti from 'redux-multi';
import ReduxThunk from 'redux-thunk';

import { App as SimplesVet } from './containers';
import Reducers from './reducers';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

const Store = applyMiddleware(ReduxPromise, ReduxMulti, ReduxThunk)(createStore)(Reducers, devTools);

const App = props => (
    <Provider store={ Store }>
        <SimplesVet />
    </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));
