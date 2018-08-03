import React from 'react';
import Pointer from './Pointer.js';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Testing Pointer.getEndCoord()', () => {

    test('Get an end for an upward arrow', () => {
        var props = {
            pointCoord: {x: 100, y: 200},
            direction: "UP",
            length: 60,
        }
        const wrapper = shallow(<Pointer {...props}/>);
        const retValue = wrapper.instance().getEndCoord();
        expect(retValue).toEqual({x: 100, y: 260});
    });

    test('Get an end for a downward arrow', () => {
        var props = {
            pointCoord: {x: 100, y: 200},
            direction: "DOWN",
            length: 60,
        }
        const wrapper = shallow(<Pointer {...props}/>);
        const retValue = wrapper.instance().getEndCoord();
        expect(retValue).toEqual({x: 100, y: 140});
    });

    test('Get an end for a leftward arrow', () => {
        var props = {
            pointCoord: {x: 100, y: 200},
            direction: "LEFT",
            length: 60,
        }
        const wrapper = shallow(<Pointer {...props}/>);
        const retValue = wrapper.instance().getEndCoord();
        expect(retValue).toEqual({x: 160, y: 200});
    });

    test('Get an end for a rightward arrow', () => {
        var props = {
            pointCoord: {x: 100, y: 200},
            direction: "RIGHT",
            length: 60,
        }
        const wrapper = shallow(<Pointer {...props}/>);
        const retValue = wrapper.instance().getEndCoord();
        expect(retValue).toEqual({x: 40, y: 200});
    });
});


describe('Testing Pointer.textPositionData()', () => {

    test('Get text position for upward arrow', () => {
        var props = {
            pointCoord: {x: 100, y: 200},
            direction: "UP",
            length: 60,
            fontSize: 15
        }
        const wrapper = shallow(<Pointer {...props}/>);
        const retValue = wrapper.instance().textPositionData({x: 100, y: 260});
        expect(retValue.position.x).toEqual(props.pointCoord.x);
        expect(retValue.position.y).toBeGreaterThan(props.pointCoord.y + length);
    });

    test('Get text position for a downard arrow', () => {
        var props = {
            pointCoord: {x: 100, y: 200},
            direction: "DOWN",
            length: 60,
            fontSize: 15
        }
        const wrapper = shallow(<Pointer {...props}/>);
        const retValue = wrapper.instance().textPositionData({x: 100, y: 140});
        expect(retValue.position.x).toEqual(props.pointCoord.x);
        expect(retValue.position.y).toBeLessThan(props.pointCoord.y - length);
    });

    test('Get text position for a left arrow', () => {
        var props = {
            pointCoord: {x: 100, y: 200},
            direction: "LEFT",
            length: 60,
            fontSize: 15
        }
        const wrapper = shallow(<Pointer {...props}/>);
        const retValue = wrapper.instance().textPositionData({x: 160, y: 200});
        expect(retValue.position.x).toBeGreaterThan(props.pointCoord.x + length);
        expect(retValue.position.y).toEqual(props.pointCoord.y);
    });

    test('Get text position for a right arrow', () => {
        var props = {
            pointCoord: {x: 100, y: 200},
            direction: "RIGHT",
            length: 60,
            fontSize: 15
        }
        const wrapper = shallow(<Pointer {...props}/>);
        const retValue = wrapper.instance().textPositionData({x: 40, y: 200});
        expect(retValue.position.x).toBeLessThan(props.pointCoord.x - length);
        expect(retValue.position.y).toEqual(props.pointCoord.y);
    });
});
