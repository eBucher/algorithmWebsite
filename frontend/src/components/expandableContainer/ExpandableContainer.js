import React from "react";
import "./ExpandableContainer.css";
import PropTypes from 'prop-types';

const propTypes = {
    /** The height when opened. Must be a specific value. Anything else will still
     *  allow the container to open, but there will not be a slide animation.
    */
    height: PropTypes.string,
    /** the width of the content area*/
    width: PropTypes.string,
    /** whether it should be expanded or not*/
    open: PropTypes.bool,
}

const defaultProps = {
    height: "auto",
    width: "100%",
    open: false,
}

/** A container that can shink to be invisible or expand to display its children*/
class ExpandableContainer extends React.Component{
    getDimensions = () => {
        return {
            height: this.props.height,
            width: this.props.width,
        }
    }


    render(){
        if (this.props.open === true){
            return (
                <div className="ExpandableContainerOpened"
                    style={this.getDimensions()}
                >
                    {this.props.children}
                </div>
            )
        } else {
            return (
                <div className="ExpandableContainerClosed"
                    style={{width: this.props.width}}></div>
            )
        }
    }
}

ExpandableContainer.propTypes = propTypes;
ExpandableContainer.defaultProps = defaultProps;

export default ExpandableContainer;
