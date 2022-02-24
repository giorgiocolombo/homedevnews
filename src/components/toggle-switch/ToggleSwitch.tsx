import React from "react";
import "./ToggleSwitch.css"

export function ToggleSwitch () {
    return (
        <React.Fragment>
            <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
            </label>
        </React.Fragment>
    )
}