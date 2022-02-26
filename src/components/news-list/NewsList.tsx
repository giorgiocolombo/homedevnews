import PropTypes, { string } from "prop-types";
import React from "react";
import { useEffect, useState } from "react";
import { Article } from "../../interfaces/articles.interface";
import { NewsElement } from "./newsElement/NewsElement";
import './NewsList.css'

interface propsType {
    articles: Article[];
    selectedNewspapers: string[];
}

export function NewsList(props: propsType) {
    const { articles, selectedNewspapers } = props;
    const [ filteredArticles, setFilteredArticles ]: [Article[], Function] = useState([]);

    useEffect(()=>{
        if(selectedNewspapers.length){
            setFilteredArticles(articles.filter(article => selectedNewspapers.includes(article.source.name)))
        } else {
            setFilteredArticles(articles);
        }
    },[articles, selectedNewspapers])

    return (
        <React.Fragment>
            {
                filteredArticles.length
                ? <div className="newslist">{filteredArticles.map((article, i) => <NewsElement key={i} article={article} />)}</div>
                : <h3><i>Nessun articolo trovato</i></h3>
            }
        </React.Fragment>
    )
}

NewsList.prototype = {
    articles: PropTypes.arrayOf((PropTypes.shape({
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
    }))).isRequired,
    selectedNewspapers: PropTypes.arrayOf(string)
}