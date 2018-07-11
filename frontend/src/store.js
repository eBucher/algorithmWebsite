import {createStore, combineReducers} from "redux";
import Algorithm from 'reducers/AlgorithmReducer.js';

export default createStore(
    combineReducers({
        //Put the reducers in here separated by commas
        Algorithm
    })
);
