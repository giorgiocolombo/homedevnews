import PropTypes from "prop-types";
import { Article } from "../../../interfaces/articles.interface";
import './NewsElement.css'
interface propsType {
    article: Article;
}

export function NewsElement(props: propsType) {
    const { article } = props;

    return (
        <div className="newselement">{article.title}</div>
    )
}

NewsElement.prototype = {
    article: PropTypes.shape({
        author: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        publishedAt: PropTypes.string.isRequired,
        source: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string.isRequired
        }),
        id: PropTypes.number,
        name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        urlToImage: PropTypes.string.isRequired,
    }).isRequired
}