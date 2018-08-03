import React from 'react';
import {toHex} from 'utils/Colors.js';
import PropTypes from 'prop-types';

const propTypes = {
    /** The color of the checkmark */
    color: PropTypes.string,
    /** The checkmark will extend approximately the same space above and below
        and to the left and right of the given center. */
    center: PropTypes.object.isRequired,
    /** How tall the checkmark should be. */
    height: PropTypes.number,
}


export const checkMarkDefaultProps = {
    color: "black",
    height: 45,
}

/** Renders a checkmark at a given position. */
class CheckMark extends React.Component {

	render = () => {
        var center = this.props.center;
        var height = this.props.height;
		var thickness = this.props.height * .15;

		return (
		<path
			d = {
				" M" + (center.x - height * .35) + " " + (center.y + height * .05) +
				" L" + (center.x - height * .1) + " " + (center.y + height * .35) +
				" L" + (center.x + height * .35) + " " + (center.y - height * .45)
			}
			stroke = {toHex(this.props.color)}
			strokeWidth = {thickness}
			fill = "none"
		/>
		)
	}
}

CheckMark.propTypes = propTypes;
CheckMark.defaultProps = checkMarkDefaultProps;

export default CheckMark;
