// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// import rootReducer from './reducers';

// const persistConfig = {
//   key: 'root',
//   storage: storage,
//   stateReconciler: autoMergeLevel2
//  };
// const pReducer = persistReducer(persistConfig, rootReducer);
// const initialState = {};

// const middleware = [thunk];
// export const store = createStore(pReducer, initialState, compose(
//   applyMiddleware(...middleware),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// ));
// export const persistor = persistStore(store);
