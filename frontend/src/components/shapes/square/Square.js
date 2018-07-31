import React from 'react';
import PropTypes from 'prop-types';
import {toHex} from 'utils/Colors.js';

const propTypes = {
    /** The width and height of the square. This includes the border size. */
    size: PropTypes.number,
    /** The center coordinate */
    center: PropTypes.object.isRequired,
    /** The border color */
    color: PropTypes.string,
    /** Thickness of the border */
    thickness: PropTypes.number,
    /** Text to appear above the square */
    topText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Text to appear below the square */
    bottomText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Text to appear inside the square */
    centerText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Font size for top and bottom text */
    centerFontSize: PropTypes.number,
    /** Front size for text inside the square */
    outerFontSize: PropTypes.number,
}

export const squareDefaultProps = {
    size: 50,
    color: "white",
    thickness: 1,
    topText: null,
    bottomText: null,
    centerText: null,
    centerFontSize: 25,
    outerFontSize: 16,
}

/** Renders an SVG object that is a square with various labels */
class Square extends React.Component{

    constructor(props) {
        super(props);
    }

    drawSquare = () => {
        var center = this.props.center;
        var size = this.props.size;
        var thickness = this.props.thickness;
		return (
			<rect   x={center.x - size/2 + thickness/2}
                    y={center.y - size/2 + thickness/2}
                    height={size - thickness + 1}
                    width={size - thickness + 1}
                    fill={toHex(this.props.color)}
					style={{
						strokeWidth : thickness,
						stroke : "#000000"
					}}
			/>
		)
	}

    drawCenterText = () => {
		if(this.props.centerText !== null){
			return (
				<text
					x={this.props.center.x}
					y={this.props.center.y}
					fill="#000000"
					textAnchor="middle"
					dominantBaseline="middle"
					style= {{
						font :  this.props.centerFontSize + "px Arial",
					}}
				>
					{this.props.centerText}
				</text>
			)
		}
	}

    drawTopText = () => {
		if(this.props.topText !== null){
			return(
				<text
					x={this.props.center.x}
					y={this.props.center.y - this.props.size/2 - 5}
					fill="#000000"
					textAnchor="middle"
					dominantBaseline="bottom"
					style= {{
						font :  this.props.outerFontSize + "px Arial",
					}}
				>
					{this.props.topText}
				</text>
			)
		}
	}

    drawBottomText = () => {
		if(this.props.bottomText !== null){
			return(
				<text
					x={this.props.center.x}
					y={this.props.center.y + this.props.size/2}
					fill="#000000"
					textAnchor="middle"
					dominantBaseline="hanging"
					style= {{
						font :  this.props.outerFontSize + "px Arial",
					}}
				>
					{this.props.bottomText}
				</text>
			)
		}
	}

    render(){
		return (
			<g>
				{this.drawSquare()}
                {this.drawCenterText()}
                {this.drawTopText()}
                {this.drawBottomText()}
			</g>
		)
    }
}

Square.propTypes = propTypes;
Square.defaultProps = squareDefaultProps;

export default Square;
