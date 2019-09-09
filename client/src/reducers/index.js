import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import postsReducer from './postsReducer';

const rootReducer = combineReducers({
  sessionReducer,
  postsReducer
});

export default rootReducer;
