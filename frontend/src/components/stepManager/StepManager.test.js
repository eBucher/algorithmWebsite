import React from 'react';
import { shallow } from 'enzyme';
import {createStore, combineReducers} from "redux";
import {enableBatching} from 'redux-batched-actions';
import StepManager from './StepManager.js';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureStore();
var store = mockStore();


describe('Testing <StepManager/>', () => {
    beforeEach(() => {
        store.clearActions();
    });


    //Expected: Increase the step number by 1 if it's in the middle of the steps
    test('StepManager: nextStep() middle of steps', () => {
        store = mockStore({
            Algorithm: {
                stepNum: 1,
                steps: [{}, {}, {}],
            }
        });
        const wrapper = shallow(<StepManager store={store}/>).dive().instance();
        wrapper.nextStep();
        const actions = store.getActions();
        const expectedPayload = { type: 'SET_STEP_NUM', payload: 2 };
        expect(actions).toEqual([expectedPayload]);
    });


    //Expected: Don't change anything if the stepNum is the last step
    test('StepManager: nextStep() end of steps', () => {
        store = mockStore({
            Algorithm: {
                stepNum: 2,
                steps: [{}, {}, {}],
            }
        });
        const wrapper = shallow(<StepManager store={store}/>).dive().instance();
        wrapper.nextStep();
        const actions = store.getActions();
        expect(actions).toEqual([]);
    });


    //Expected: Increase the step number to 1 if it's at the beginning of the steps.
    test('StepManager: nextStep() beginning of steps', () => {
        store = mockStore({
            Algorithm: {
                stepNum: 0,
                steps: [{}, {}, {}, {}, {}],
            }
        });
        const wrapper = shallow(<StepManager store={store}/>).dive().instance();
        wrapper.nextStep();
        const actions = store.getActions();
        const expectedPayload = { type: 'SET_STEP_NUM', payload: 1 };
        expect(actions).toEqual([expectedPayload]);
    });


    //Expected: Don't make any changes if trying to go to a previous step while on
    //the first one.
    test('StepManager: previousStep() beginning of steps', () => {
        store = mockStore({
            Algorithm: {
                stepNum: 0,
                steps: [{}, {}, {}, {}, {}],
            }
        });
        const wrapper = shallow(<StepManager store={store}/>).dive().instance();
        wrapper.previousStep();
        const actions = store.getActions();
        expect(actions).toEqual([]);
    });


    //Expected: Go to a previous step if in the middle of the steps.
    test('StepManager: previousStep() middle of steps', () => {
        store = mockStore({
            Algorithm: {
                stepNum: 3,
                steps: [{}, {}, {}, {}, {}],
            }
        });
        const wrapper = shallow(<StepManager store={store}/>).dive().instance();
        wrapper.previousStep();
        const actions = store.getActions();
        const expectedPayload = { type: 'SET_STEP_NUM', payload: 2 };
        expect(actions).toEqual([expectedPayload]);
    });


    //Expected: Go to a previous step if on the last step
    test('StepManager: previousStep() on the last step', () => {
        store = mockStore({
            Algorithm: {
                stepNum: 4,
                steps: [{}, {}, {}, {}, {}],
            }
        });
        const wrapper = shallow(<StepManager store={store}/>).dive().instance();
        wrapper.previousStep();
        const actions = store.getActions();
        const expectedPayload = { type: 'SET_STEP_NUM', payload: 3 };
        expect(actions).toEqual([expectedPayload]);
    });
});
