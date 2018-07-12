import React from 'react';
import './balloon.css';

class ToolTip extends React.Component{
    getToolTipSize = (text) => {
        if(text.length < 60)
            return "medium"
        return "large";
    }

    getCursor = () => {
        if(this.props.cursor){
            return this.props.cursor;
        }
        return "pointer"
    }

    render(){
        return(
            <div
                data-balloon={this.props.text}
                data-balloon-pos={this.props.position}
                data-balloon-length={this.getToolTipSize(this.props.text)}
                style={{display: "inline-block", cursor: this.getCursor()}}
            >
                {this.props.children}
            </div>
        )
    }
}

export default ToolTip;
