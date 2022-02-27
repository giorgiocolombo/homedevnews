import PropTypes from "prop-types";
import { Article } from "../../../interfaces/articles.interface";
import './NewsElement.css'
interface propsType {
    article: Article;
}

export function NewsElement(props: propsType) {
    const { article } = props;

    const convertIsoString = (date: string) => new Date(date).toLocaleDateString('it', { year: 'numeric', month: 'long', day: 'numeric'});

    return (
        <div className="newselement">
            <div className="w-100">
                {article.urlToImage && <img src={article.urlToImage} alt="" />}
                <h3 className="newselement__title">{article.title}</h3>
                <div className="d-flex align-items-center justify-content-between py-2">
                    <h6>{article.source.name}</h6>
                    <div className="mb-3 ml-2"><small>{convertIsoString(article.publishedAt)}</small></div>
                </div>
                <p className="mb-4 pt-1">{article.description}</p>
            </div>
            <div className="d-flex justify-content-center w-100"><a href={article.url} target="_blank" rel="noreferrer">Vai all'articolo</a></div>
        </div>
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