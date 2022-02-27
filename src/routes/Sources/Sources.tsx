import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../../components/loader/Loader";
import { Source, SourcesInterface } from "../../interfaces/sources.interface";
import { sourceRequest } from "../../services/source-request";
import { SourceElement } from "./sourceElement/SourceElement";
import './Sources.css'

export function Sources() {
    const [ sourceList, setSourceList ] : [ Source[], Function ] = useState([]);
    const [ isLoading, setIsLoading]: [boolean, Function]  = useState(false);

    useEffect(()=>{
        setIsLoading(true);
        sourceRequest()
        .then((sources: SourcesInterface) => {
            setSourceList(sources.sources);
            setIsLoading(false)
          }
        )
        .catch(() => setIsLoading(false));
      },[])
    return (
        <div className="container">
            <div className="mt-3">
                <Link to="/">Torna alla homepage</Link>
            </div>
            <div className="row">
                <h1 className="col-12 mt-4 mb-5">Editori più letti</h1>
            </div>
            <div className="sourceList pb-5">{sourceList.map((source, i) => <SourceElement source={source} key={i} />)}</div>
            {isLoading && <Loader />}
        </div>
    )
}