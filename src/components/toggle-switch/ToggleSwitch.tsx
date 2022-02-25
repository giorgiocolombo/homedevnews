import PropTypes from "prop-types";
import { ChangeEventHandler } from "react";
import "./ToggleSwitch.css"

interface PropsType {
    changeMoreRecentValue: ChangeEventHandler<HTMLInputElement>;
}
export function ToggleSwitch(props: PropsType) {
    const { changeMoreRecentValue } = props;

    return (
        <div className="d-flex align-items-center jutify-content-center">
            <small className="p-0 m-0 mr-3"><i>I più letti</i></small>
            <label className="switch">
                <input type="checkbox" onChange={changeMoreRecentValue} />
                <span className="slider round"></span>
            </label>
            <small className="p-0 m-0 ml-3"><i>I più recenti</i></small>
        </div>
    )
}

ToggleSwitch.proptype = {
    changeMoreRecentValue: PropTypes.func.isRequired,
}