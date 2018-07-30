import React from 'react';
import {toHex} from 'utils/Colors.js';
import PropTypes from 'prop-types';

const propTypes = {
	/** The center of the X */
	center: PropTypes.object.isRequired,
	/** The color of the entire X */
	color: PropTypes.string,
	/** Distance from the top to bottom */
	height: PropTypes.number,
}

export const xSymbolDefaultProps = {
	color: "black",
	height: 45,
}

class XSymbol extends React.Component {

	render = () => {
		var height = this.props.height;
		var center = this.props.center;
		var thickness = height * .15;
		return (
		<g>
		{/*Top left to bottom right*/}
		<path
			d = {
				" M" + (center.x - height*.5) + " " + (center.y - height*.5) +
				" L" + (center.x + height*.5) + " " + (center.y + height*.5)
			}
			stroke = {toHex(this.props.color)}
			strokeWidth = {thickness}
		/>
		{/*Top right to bottom left*/}
		<path
			d = {
				" M" + (center.x + height*.5) + " " + (center.y - height*.5) +
				" L" + (center.x - height*.5) + " " + (center.y + height*.5)
			}
			stroke = {toHex(this.props.color)}
			strokeWidth = {thickness}
		/>
		</g>
		)
	}
}

XSymbol.propTypes = propTypes;
XSymbol.defaultProps = xSymbolDefaultProps;

export default XSymbol;
