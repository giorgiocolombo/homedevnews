import PropTypes from "prop-types";
import { MouseEventHandler } from "react";
import './Button.css'

interface propsType {
    inputFunc?: MouseEventHandler<HTMLButtonElement>;
    children: React.ReactNode;
}

export function Button(props: propsType) {
    const { inputFunc, children } = props;

    return (
        <button className="show-more__btn" type="button" onClick={inputFunc}>{ children }</button>
    )
}

Button.prototype = {
    inputFunc: PropTypes.func,
    children: PropTypes.node.isRequired
}