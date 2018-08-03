import React from 'react';
import AlgDisplay from './AlgDisplay.js';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Testing <AlgDisplay/>', () => {

    test('renderContent() shows the children when started is true', () => {
        var props = {
            started: true,
            children: <div></div>,
        }
        const wrapper = shallow(<AlgDisplay {...props}/>);
        const retValue = wrapper.instance().renderContent();
        expect(retValue.props.className).toEqual("algDisplayHelper");
    });

    test('renderContent() shows the grey cover when started is false', () => {
        var props = {
            started: false,
            children: <div></div>,
        }
        const wrapper = shallow(<AlgDisplay {...props}/>);
        const retValue = wrapper.instance().renderContent();
        expect(retValue.props.className).toEqual("greyCover");
    });

    test("render(): the component can be rendered when started", () => {
        var props = {
            children: <div></div>,
            started: true,
        }
        const wrapper = shallow(<AlgDisplay {...props}/>);
        expect(wrapper.exists()).toEqual(true);
    });

    test("render(): the component can be rendered when not started", () => {
        var props = {
            children: <div></div>,
            started: false,
        }
        const wrapper = shallow(<AlgDisplay {...props}/>);
        expect(wrapper.exists()).toEqual(true);
    });
});
