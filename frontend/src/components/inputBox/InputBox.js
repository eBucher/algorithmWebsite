import React, {Component} from 'react';
import './InputBox.css';

class InputBox extends React.Component{


    getWidth = () => {
        if(this.props.width){
            return this.props.width;
        }
        return 140; //default is 150, but there is padding
    }

    render(){
        return(
            <React.Fragment>
                <label class="inputBoxLabel">{this.props.label}</label>
                <br/>
                <input
                    type="text"
                    style={{width: this.getWidth() + "px"}}
                    onChange={this.props.onChangeHandler}
                />
            </React.Fragment>
        )
    }
}

export default InputBox;
