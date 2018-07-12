import CodeBox from './CodeBox.js';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';

Enzyme.configure({ adapter: new Adapter() });

describe('Testing <CodeBox/>', () => {
    var code = [
        "zero",
        "    one",
        "        two"
    ];
    beforeEach(() => {

    });


    //Expected: each set of four spaces should be replaced with space unicode chars.
    test('CodeBox: cleanLine()', () => {
        const wrapper = shallow(<CodeBox linesOfCode={code} highlightedLines={1}/>).instance();
        expect(wrapper.cleanLine(code[0])).toEqual("zero");
        expect(wrapper.cleanLine(code[1])).toEqual("\u00A0\u00A0\u00A0\u00A0one");
        expect(wrapper.cleanLine(code[2])).toEqual("\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0two");
    });


    //Expected: each set of four spaces should be replaced with space unicode chars.
    test('CodeBox: buildLine()', () => {
        const wrapper = shallow(<CodeBox linesOfCode={code} highlightedLines={1}/>).instance();
        var output = wrapper.generateLinesOfCode();
        var expected = [
            <div style={{"whiteSpace": "pre-line"}}>zero</div>,
            <div style={{"backgroundColor": "#ffc947", "whiteSpace": "pre-line"}}>    one</div>,
            <div style={{"whiteSpace": "pre-line"}}>        two</div>
        ]
        expect(output).toEqual(expected);
    });
});
