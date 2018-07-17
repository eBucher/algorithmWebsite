import React, {Component} from "react";
import "./ExpandableContainer.css";

class ExpandableContainer extends React.Component{

    static defaultProps = {
        height: "auto",
        width: "100%",
        open: false,
    }


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

export default ExpandableContainer;
