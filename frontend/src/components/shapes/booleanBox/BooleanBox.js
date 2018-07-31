import React from 'react';
import PropTypes from 'prop-types';
import Square, {squareDefaultProps} from 'components/shapes/square/Square.js';
import XSymbol from 'components/shapes/xSymbol/XSymbol.js';
import CheckMark from 'components/shapes/checkMark/CheckMark.js';

const propTypes = {
    /** true will result in a check mark. false is an X. null is an empty box. */
    status: PropTypes.bool,
    /** The center position of the box */
    center: PropTypes.object.isRequired,
    /** Text to display above the box. null creates no text. */
    topText: PropTypes.string,
    /** The height and width of the box */
    size: PropTypes.number,
}


export const booleanBoxDefaultProps = {
    status: null,
    topText: null,
    size: squareDefaultProps.size,
}

/** Renders a box with an X or check mark in it to represent a true or false value. */
class BooleanBox extends React.Component{

    //Creates an X
    falseSymbol = () => {
        return (
            <XSymbol
                color="red"
                height={this.props.size * .8}
                center={this.props.center}
            />
        )
    }


    //Creates a check symbol
    trueSymbol = () => {
        return (
            <CheckMark
                color="green"
                height={this.props.size * .9}
                center={this.props.center}
            />
        )
    }


    getSymbol = () => {
        if(this.props.status === true)
            return this.trueSymbol();
        else if (this.props.status === false)
            return this.falseSymbol();
        else
            return "";
    }


    render(){
        var bottomText = null;
        if(this.props.status === true){
            bottomText = "true";
        } else if (this.props.status === false){
            bottomText = "false";
        }

        return (
            <g>
                <Square
                    color="white"
                    center={this.props.center}
                    topText={this.props.topText}
                    size={this.props.size}
                    bottomText={bottomText}
                />
                {this.getSymbol()}
            </g>
        )
    }
}

BooleanBox.propTypes = propTypes;
BooleanBox.defaultProps = booleanBoxDefaultProps;

export default BooleanBox;
