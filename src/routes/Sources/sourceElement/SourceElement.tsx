import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Source } from "../../../interfaces/sources.interface";
import './SourceElement.css'

interface propsType {
    source: Source;
}

export function SourceElement(props: propsType) {
    const { source } = props;

    return (
        <div className="sourceElement">
            <div className="mb-2">
                <h3>{source.name}</h3>
                <p>{source.description}</p>
            </div>
            <Link to={`${source.id}`}>Vai al dettaglio</Link>
        </div>
    )
}

SourceElement.prototype = {
    source: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        language: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired
    }).isRequired
}