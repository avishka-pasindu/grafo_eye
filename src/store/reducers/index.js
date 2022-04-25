import { combineReducers } from 'redux';
import countReducer from '../reducers/countReducer';
import predictionReducer from '../reducers/predictionReducer';


const reducers = combineReducers(
    { countReducer, predictionReducer }
);

export default reducers;
