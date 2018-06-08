import { combineReducers } from 'redux';
import userReducer from './userReducer';
import sessionReducer from './sessionReducer';
// import postsReducer from './postsReducer';
// import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
  // form: formReducer,
  user: userReducer,
  session: sessionReducer,
//   loading: loadingReducer
});

export default rootReducer;