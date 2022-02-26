import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { Loader } from "../../components/loader/Loader";
import { NewsList } from "../../components/news-list/NewsList";
import { Article, Articles } from "../../interfaces/articles.interface";
import { sourceRequest } from "../../services/source-request";

export function SourceDetail() {
    const params = useParams();
    const navigate = useNavigate();
    const [ isLoading, setIsLoading]: [boolean, Function]  = useState(false);
    const [articles, setArticles]: [Article[], Function] = useState([]);
    const [pageSize, setPageSize]: [number, Function]  = useState(20);

    useEffect(()=>{
        setIsLoading(true);
        sourceRequest(params.id, pageSize)
        .then((articles: Articles) => {
            setArticles(articles.articles);
            setIsLoading(false)
          }
        )
        .catch(() => {
            setIsLoading(false);
            navigate(`/sources`);
        });
      },[params.id, pageSize, navigate])

    const showMore = () => {
        setPageSize(pageSize + 20);
    }

    return (
        <React.Fragment>
            <div className="container">
                <div className="mt-3">
                    <Link to="/">Torna alla homepage</Link>
                </div>
                <div className="row">
                    <h1 className="col-12 mt-4 mb-5">{articles[0].source.name}</h1>
                </div>
                <div className="row mt-3">
                    <div className="col-7 col-lg-8">
                        <NewsList articles={articles} selectedNewspapers={[]} />
                    {
                        pageSize < 100 && !!articles.length && 
                        <div className="col-12 d-flex justify-content-center mt-4 mb-5">
                        <Button inputFunc={showMore}>Mostra altri</Button>
                        </div>
                    }
                    </div>
                </div>
            </div>
            {isLoading && <Loader />}
        </React.Fragment>
    )
}