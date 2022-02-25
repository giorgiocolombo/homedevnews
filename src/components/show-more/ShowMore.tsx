import PropTypes from "prop-types";
import { MouseEventHandler } from "react";
import './ShowMore.css'

interface propsType {
    showMore: MouseEventHandler<HTMLButtonElement>;
}

export function ShowMore(props: propsType) {
    const { showMore } = props;

    return (
            <button className="show-more__btn" type="button" onClick={showMore}>Mostra altri</button>
    )
}

ShowMore.prototype = {
    showMore: PropTypes.func.isRequired,
}