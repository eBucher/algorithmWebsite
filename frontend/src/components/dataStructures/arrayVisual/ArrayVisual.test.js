import React from 'react';
import ArrayVisual from './ArrayVisual.js';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Square from 'components/shapes/square/Square.js';

Enzyme.configure({ adapter: new Adapter() });

function setup(props){
    return shallow(<ArrayVisual {...props}/>);
}

describe('ArrayVisual Component', () => {
    test('render', () => {
        var props = {
            arrayModel: [],
            center: {x: 10, y: 10},
        };
        const wrapper = setup(props);
        expect(wrapper.exists()).toBe(true)
    });
});

describe('ArrayVisual renders an array', () => {
    test('When the arrayModel prop is empty', () => {
        var props = {
            arrayModel: [],
            center: {x: 10, y: 10},
        };
        const wrapper = setup(props);
        expect(wrapper.find("Square").length).toEqual(0);
    });

    test('When the arrayModel has an odd length', () => {
        var props = {
            arrayModel: [
                {value: 5, color: "green"},
                {value: 10, color: "red"},
                {value: 15, color: "blue"},
            ],
            center: {x: 500, y: 500}
        };
        const wrapper = setup(props);
        expect(wrapper.find("Square").length).toEqual(3);
    });

    test('When the arrayModel has an even length', () => {
        var props = {
            arrayModel: [
                {value: 5, color: "green"},
                {value: 10, color: "red"},
                {value: 15, color: "green"},
                {value: 20, color: "red"},
            ],
            center: {x: 500, y: 500}
        };
        const wrapper = setup(props);
        expect(wrapper.find("Square").length).toEqual(4);
    });
});

describe('ArrayVisual renders pointers', () => {
    test('Point to a normal element', () => {
        var props = {
            arrayModel: [
                {value: 50, color: "green"},
                {value: 100, color: "red"},
                {value: 150, color: "blue"},
            ],
            center: {x: 100, y: 100},
            pointers: [
                {index: 1, position: "TOP", text: "j"},
                {index: 2, position: "BOTTOM", text: "i"}
            ]
        };
        const wrapper = setup(props);
        expect(wrapper.find("Pointer").length).toEqual(2);
    });

    test('no pointers are rendered', () => {
        var props = {
            arrayModel: [
                {value: 50, color: "green"},
                {value: 100, color: "red"},
                {value: 150, color: "blue"},
            ],
            center: {x: 100, y: 100},
        };
        const wrapper = setup(props);
        expect(wrapper.find("Pointer").length).toEqual(0);
    });
});
