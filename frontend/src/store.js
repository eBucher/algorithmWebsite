import {createStore, combineReducers} from "redux";
import {enableBatching} from 'redux-batched-actions';
import Algorithm from 'reducers/AlgorithmReducer.js';

export default createStore(
    enableBatching(
        combineReducers({
            //Put the reducers in here separated by commas
            Algorithm
        })
    )
);
