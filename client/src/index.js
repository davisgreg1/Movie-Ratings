import React from 'react';
import {render} from 'react-dom';
import {Router} from "react-router";
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import rootReducer from './reducers';
import customHistory from './history';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const middleware = [thunk];
const store = createStore(rootReducer, compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

render(
  <Provider store={store}>
  <BrowserRouter>
    {/* <Router history={customHistory}> */}
      <App/>
    {/* </Router> */}
  </BrowserRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
