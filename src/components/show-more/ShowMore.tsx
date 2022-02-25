import PropTypes from "prop-types";
import { MouseEventHandler } from "react";

interface propsType {
    showMore: MouseEventHandler<HTMLButtonElement>;
}

export function ShowMore(props: propsType) {
    const { showMore } = props;

    return (
        <div className="newspaper">
            <button type="button" onClick={showMore}>Mostra altri</button>
        </div>
    )
}

ShowMore.prototype = {
    showMore: PropTypes.func.isRequired,
}