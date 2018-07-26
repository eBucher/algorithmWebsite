import CodeBox from './CodeBox.js';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';

Enzyme.configure({ adapter: new Adapter() });

describe('Testing <CodeBox/>', () => {
    const code = [
        "zero",
        "    one",
        "        two",
        "      three",
    ];


    //Expected: each set of four spaces should be replaced with space unicode chars.
    test('CodeBox: cleanLine() when there are no spaces', () => {
        const wrapper = shallow(<CodeBox linesOfCode={code}/>).instance();
        expect(wrapper.cleanLine(code[0])).toEqual("zero");
    });

    test('CodeBox: cleanLine() when there are four spaces', () => {
        const wrapper = shallow(<CodeBox linesOfCode={code}/>).instance();
        expect(wrapper.cleanLine(code[1])).toEqual("\u00A0\u00A0\u00A0\u00A0one");
    });

    test('CodeBox: cleanLine() when there are eight spaces', () => {
        const wrapper = shallow(<CodeBox linesOfCode={code}/>).instance();
        var expected = "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0two";
        expect(wrapper.cleanLine(code[2])).toEqual(expected);
    });

    test('CodeBox: cleanLine() when the number of spaces mod 4 is not 0', () => {
        const wrapper = shallow(<CodeBox linesOfCode={code}/>).instance();
        expect(wrapper.cleanLine(code[3])).toEqual("\u00A0\u00A0\u00A0\u00A0  three");
    });

    test('CodeBox: buildLine() that is a highlighted line', () => {
        const wrapper = shallow(<CodeBox linesOfCode={code} highlightedLine={1}/>).instance();
        var output = wrapper.buildLine(1);
        console.log(output.props.style);
        expect(output.props.style.backgroundColor).not.toBeUndefined();
    });

    test('CodeBox: buildLine() that is not a highlighted line', () => {
        const wrapper = shallow(<CodeBox linesOfCode={code} highlightedLine={1}/>).instance();
        var output = wrapper.buildLine(2);
        console.log(output.props.style);
        expect(output.props.style.backgroundColor).toBeUndefined();
    });

    test('CodeBox: render()', () => {
        const wrapper = shallow(<CodeBox linesOfCode={code} highlightedLine={1}/>);
        expect(wrapper.exists()).toEqual(true);
    });
});
