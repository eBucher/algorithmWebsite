import React from "react";
import "./Button.css";
import PropTypes from "prop-types";

const propTypes = {
    clickHandler: PropTypes.func,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    size: PropTypes.string,
    shape: PropTypes.string,
    type: PropTypes.string,
}

const defaultProps = {
    color: "orange",
    disabled: false,
    size: "small",
    shape: "rectangle",
    type: "button",
}



class Button extends React.Component{

    /** @return the color scheme for the button */
    getColor = () => {
        switch(this.props.color){
            case "orange":
                return "btn-orange";
            case "blue":
                return "btn-blue";
            default:
                return "";
        }
    }

    getSize = () => {
        if(this.props.shape === "circle"){
            switch(this.props.size){
                case "mini":
                    return "btn-circle-tiny";
                case "small":
                    return "btn-circle-small";
                case "medium":
                    return "btn-circle-medium";
                default:
                    return "";
            }
        }
        switch(this.props.size){
            case "mini":
                return "btn-reactangle-tiny";
            case "small":
                return "btn-reactangle-small";
            case "medium":
                return "btn-reactangle-medium";
            default:
                return "";
        }
    }

    getShape = () => {
        switch(this.props.shape){
            case "circle":
                return "btn-circle";
            default:
                return "btn-rectangle";
        }
    }

    getStyle = () => {
        return "btn " +
            this.getColor() + " " +
            this.getSize() + " " +
            this.getShape();
    }

    render(){
        return(
            <button
                className={this.getStyle()}
                disabled={this.props.disabled}
                onClick={this.props.clickHandler}
                type={this.props.type}
            >
                {this.props.children}
            </button>
        )
    }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
