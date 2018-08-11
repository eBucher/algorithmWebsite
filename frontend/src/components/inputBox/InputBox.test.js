import React from 'react';
import InputBox from './InputBox.js';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WarningIcon from 'assets/WarningIcon.svg';
import ToolTip from 'components/toolTip/ToolTip.js';

Enzyme.configure({ adapter: new Adapter() });

describe('Testing <InputBox/>', () => {

    function setup(props){
        return shallow(<InputBox {...props}/>).instance();
    }

    test('constructor should set the initial state', () => {
        var props = {
            onChangeHandler: () => {},
        }
        const inst = setup(props);
        expect(inst.state).toEqual({toolTipIconColor: "grey"});
    });

    test('getWidth(): subtract correct spacing', () => {
        var props = {
            onChangeHandler: () => {},
            width: 200,
        }
        const inst = setup(props);
        const retVal = inst.getWidth();
        expect(retVal).toEqual(170);
    });

    test('errorMsgVisibility(): invisible when no error', () => {
        var props = {
            onChangeHandler: () => {},
            hasError: false
        }
        const inst = setup(props);
        const retVal = inst.errorMsgVisibility();
        expect(retVal).toEqual({visibility: "hidden"});
    });

    test('errorMsgVisibility(): visibile when there is an error', () => {
        var props = {
            onChangeHandler: () => {},
            hasError: true
        }
        const inst = setup(props);
        const retVal = inst.errorMsgVisibility();
        expect(retVal).toEqual({display: "inline"});
    });

    test("toolTipIconEnterHandler(): state's icon changes to selected one", () => {
        var props = {
            onChangeHandler: () => {},
        }
        const inst = setup(props);
        inst.toolTipIconEnterHandler();
        expect(inst.state).toEqual({toolTipIconColor: "orange"});
    });

    test("toolTipIconExitHandler(): state's icon changes to unselected one", () => {
        var props = {
            onChangeHandler: () => {},
        }
        const inst = setup(props);
        inst.toolTipIconExitHandler();
        expect(inst.state).toEqual({toolTipIconColor: "grey"});
    });

    test("getInputStyle(): returns error style when there is an error", () => {
        var props = {
            onChangeHandler: () => {},
            hasError: true,
            width: 200,
        }
        const inst = setup(props);
        const retVal = inst.getInputStyle();
        expect(retVal).toEqual({width: "170px", backgroundImage: "url(" + WarningIcon + ")"});
    });

    test("getInputStyle(): returns a non-error style when there is no error", () => {
        var props = {
            onChangeHandler: () => {},
            hasError: false,
            width: 200,
        }
        const inst = setup(props);
        const retVal = inst.getInputStyle();
        expect(retVal).toEqual({width: "170px"});
    });

    test("optionalToolTip(): an empty string if no tooltip should be displayed", () => {
        var props = {
            onChangeHandler: () => {},
        }
        const inst = setup(props);
        const retVal = inst.optionalToolTip();
        expect(retVal).toEqual("");
    });

    test("optionalToolTip(): a tooltip should be returned", () => {
        var props = {
            onChangeHandler: () => {},
            tooltip: "some tooltip text",
        }
        const inst = setup(props);
        const retVal = inst.optionalToolTip();
        expect(retVal.props.className).toEqual("toolTipIconPositioning");
    });

    test("render(): the component can be rendered with the minimum required props", () => {
        var props = {
            onChangeHandler: () => {},
        }
        const wrapper = shallow(<InputBox {...props}/>);
        expect(wrapper.exists()).toEqual(true);
    });
});
