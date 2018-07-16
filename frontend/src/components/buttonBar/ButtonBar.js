import React from 'react';
import "pages/styles.css";
import "./ButtonBar.css";
import LinkGenerator from "./buttons/LinkGenerator.js";

class ButtonBar extends React.Component{

    constructor(){
        super();
        this.buttons = [
            new LinkGenerator(),
        ];
        this.bottomContent = null;
        this.state = {
            opened: false,
            displayedIdx: null,
        }
    }


    /*  Returns an array of the buttons that will appear in the bar
    */
    generateButtons = () => {
        var btns = [];
        for(var i = 0; i < this.buttons.length; i++){

            var nextButton =
                <div class="buttonBarButton"
                    style={this.selectedButtonStyle(i)}
                    onClick={this.setBottomContent.bind(this, i)}
                    key={"buttonBarButton" + i}
                >
                    {this.buttons[i].getLabel()}
                </div>
            btns.push(nextButton);
        }
        return btns;
    }


    /*  If the given index i is the same as the button that has been the most
        recently pressed, an object with a special style for that button is
        returned. Otherwise, an empty object is returned.
    */
    selectedButtonStyle = (i) => {
        if(this.state.displayedIdx === i){
            return {borderBottom: "4px solid #e9711c"};
        }
        return {};
    }


    /*  Changes the state to indicate whether the bottom content should be
        displayed or not and which button's content should be displayed.
    */
    setBottomContent = (i) => {
        if(this.state.opened === false){
            this.setState({
                opened: true,
                displayedIdx: i,
            })
        } else {
            if(this.state.displayedIdx === i){
                this.setState({
                    opened: false,
                    displayedIdx: null,
                })
            } else{
                this.setState({
                    opened: true,
                    displayedIdx: i,
                })
            }
        }
    }

    /*  If the bottom content should be opened, the content for the i'th button
        will be returned. If the botto conent is closed, a single div with no
        height is returned.
    */
    showBottomContent = (i) => {
        if (this.state.opened === true){
            return (
                <div class="buttonBarContentOpen">
                    {this.buttons[this.state.displayedIdx].getContent()}
                </div>
            )
        } else {
            return (
                <div class="buttonBarContentClosed"></div>
            )
        }
    }


	render(){
		return (
			<div class="ButtonBarContainer">
                <div class="ButtonBarButtonsRow">
                    {this.generateButtons()}
                </div>
                <div>
                    {this.showBottomContent()}
                </div>
            </div>
		)
	}
}


export default ButtonBar;
