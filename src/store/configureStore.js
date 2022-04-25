import { createStore, applyMiddleware } from 'redux';
import reducers from '../store/reducers';
import reduxThunk from 'redux-thunk';

const middleware = applyMiddleware(reduxThunk);

const store = createStore(reducers, middleware);

export default store;
