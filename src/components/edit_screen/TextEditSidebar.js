/**
 * To Do:
 * 1. In componentDidMount, we must insert every attribute that user can customize in the setState call
 */

import React, { Component } from 'react'

class TextEditSidebar extends Component {
    constructor() {
        super();

        // WE'LL MANAGE THE UI CONTROL
        // VALUES HERE
        this.state = {
            textColor : "#FF0000",
            fontSize :  24,
        }
    }



    componentDidMount(){
        /* Very necessary to stop default state values from taking over appearance of logo, 
        (ie: if we alter textColor and fontSize is to be displayed, we want it to be the logo's most 
        recent one, not the default state value) */
        this.setState({
            textColor: this.props.logo.textColor ||  "#FF0000",
            fontSize: this.props.logo.fontSize || 24,
            text: this.props.logo.text || "logoText"
        });
    }


    

    handleUndo = () => {
        this.props.undoCallback();
    }

    handleRedo = () => {
        this.props.redoCallback();
    }


    handleTextChange = (event) => {
        let rawInput = prompt("Enter your new logo text (it must contain at least 1 character).", this.props.logo.text || "Title");
        let text = rawInput.trim(); 

        if(text.length == 0){
            alert("Your logo text could not be set. The minimum length is 1 character");
            return;
        }

         this.completeUserEditing(text)

    }

    handleTextColorChange = (event) => {
        console.log("handleTextColorChange to " + event.target.value);
        this.setState({ textColor: event.target.value }, this.completeUserEditing);
    }

    handleFontSizeChange = (event) => {
        console.log("handleTextColorChangeComplete to " + event.target.value);
        this.setState({ fontSize: event.target.value }, this.completeUserEditing);
    }

    completeUserEditing = (text) => {
        console.log("completeUserEditing");
        this.props.changeLogoCallback(this.props.logo, this.props.logo.key,  text || this.props.logo.text, this.state.textColor, this.state.fontSize);
    }

    

    render() {
        let undoDisabled = !this.props.canUndo();
        let redoDisabled = !this.props.canRedo();
        let undoClass = "waves-effect waves-light btn-small";
        let redoClass = "waves-effect waves-light btn-small";



        if (undoDisabled)
            undoClass += " disabled";

        if (redoDisabled)
            redoClass += " disabled";

        
        return (
            <div className="card-panel col s4">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <button className="waves-effect waves-light btn-small" onClick={this.handleTextChange}>&#9998;</button>
                        <button className={undoClass} onClick={this.handleUndo}>Undo</button>
                        <button className={redoClass} onClick={this.handleRedo}>Redo</button>
                    </div>
                </div>

 


                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Text</span>
                        <div className="row">
                            <div className="col s4">Color:</div>
                            <div className="col s8">
                                <input type="color"
                                        onChange={this.handleTextColorChange}
                                        value={this.props.logo.textColor}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s4">Font Size:</div>
                            <div className="col s8">
                                <input type="range" min="4" max="144" 
                                    onChange={this.handleFontSizeChange}
                                    value={this.props.logo.fontSize} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TextEditSidebar