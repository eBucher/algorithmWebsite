import React from "react";
import ShareIcon from "assets/ShareIcon.svg";
import "../ButtonBar.css";
import store from "store.js";
import "pages/styles.css";
import "./LinkGenerator.css";

class LinkGenerator {
    /*  Returns the text/icon that should be displayed on the button
    */
    getLabel = () => {
        return (
            <div>
                <img src={ShareIcon} className="btnIcon" alt="share icon"/>
                <span className="btnFont">Get link to this visualization</span>
            </div>
        )
    }


    /*  Returns the content that will be displayed when the button is pressed
    */
    getContent = () => {
        return(
            <div>
                <span className="smallLabelText">Link</span>
                <br/>
                <input type="text" className ="textField linkGeneratorTextArea"
                    id="LinkGeneratorUrl" value={this.buildLink()}
                    readOnly="true"
                >
                </input>
                <button id="LinkGeneratorCopyButton" onClick={this.copyText} className="smallBtn orangeBtn">
                    Copy to clipboard
                </button>
                <br/>
                <span className="noteText">
                This link will allow you or a friend to return to this page with the<br/>same
                input that you most recently entered.
                </span>
            </div>
        )
    }


    /*  Copies the text in the LinkGeneratorUrl input field to the clipboard
        changes the LinkGeneratorCopyButton to say "Copied!"
    */
    copyText = () => {
        var text = document.getElementById("LinkGeneratorUrl");
        text.select();
        document.execCommand("copy");
        document.getElementById("LinkGeneratorCopyButton").innerHTML = "Copied!";
    }


    /*  Returns a string that is a url that contains the current page's path and
        the algorithm's parameters.
    */
    buildLink = () => {
        return encodeURI("localhost:3000" + store.getState().AppStatus.pagePath + "?" +
            this.buildParamString(store.getState().Algorithm.algParams)
        );
    }


    /*  Returns a string that contains all of the algorithm parameters formatted
        as "name=value&name=value...&name=value"
    */
    buildParamString = (params) => {
        var paramString = "";
        for (var propertyName in params) {
            if (params.hasOwnProperty(propertyName)) {
                paramString = paramString + propertyName + "=" +
                    store.getState().Algorithm.algParams[propertyName] + "&";
            }
        }
        paramString = paramString.slice(0, -1); //Remove the extra & symbol at the end
        return paramString;
    }
}

export default LinkGenerator;
