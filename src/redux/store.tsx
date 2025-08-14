import React from 'react';
import { createStore, applyMiddleware } from 'redux';
const createSagaMiddleware = require('redux-saga').default;
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);



const ProviderStore = (Component: React.ComponentType<any>) => {
  return (props: any) => {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };
};

export default ProviderStore;
