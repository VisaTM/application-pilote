
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';


const logger = (store) => (next) => (action) => {
  if (typeof action !== "function") {
    console.log('dispatching:', action);
  }
  return next(action);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(/*logger,*/ thunk))
);

export default store;
