import React from 'react';
import "pages/styles.css";
import "./ButtonBar.css";
import LinkGenerator from "./buttons/LinkGenerator.js";
import ExpandableContainer from "components/expandableContainer/ExpandableContainer.js";

/** A container with one or more buttons to press in it. When a button is pressed,
    it can expand a container below the list of buttons to display an Additional
    area for content. */
class ButtonBar extends React.Component{

    constructor(){
        super();
        // Any new buttons belong in this array
        this.buttons = [
            new LinkGenerator(),
        ];
        this.bottomContent = null;
        this.state = {
            opened: false,
            displayedIdx: null,
        }
    }


    /** @return An array of the button elements that will appear in the bar */
    generateButtons = () => {
        var btns = [];
        for(var i = 0; i < this.buttons.length; i++){

            var nextButton =
                <div className="buttonBarButton"
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


    /** @return An additional style for the button if it is the most recently
        selected one. If it is not selected, an empty object is returned. */
    selectedButtonStyle = (i) => {
        if(this.state.displayedIdx === i){
            return {borderBottom: "4px solid #e9711c"};
        }
        return {};
    }


    /** Changes the state to indicate whether the bottom content should be
        displayed or not and which button's content should be displayed. i is
        the index of the button in this.buttons to be displayed.
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


    /** @return The most recently selected button. If none have been selected,
        then an empty string is returned.
     */
    getBottomContent = () => {
        if(this.state.displayedIdx === null){
            return "";
        } else{
            return (
                <div className="ButtonBarCenteredContent">
                    {this.buttons[this.state.displayedIdx].getContent()}
                </div>
            )
        }
    }


	render(){
		return (
			<div className="ButtonBarContainer">
                <div className="ButtonBarButtonsRow">
                    {this.generateButtons()}
                </div>
                <ExpandableContainer open={this.state.opened} height="120px" width="100%">
                    {this.getBottomContent()}
                </ExpandableContainer>
            </div>
		)
	}
}


export default ButtonBar;
