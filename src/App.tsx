import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import { Loader } from './components/loader/Loader';
import { NewsList } from './components/news-list/NewsList';
import { Newspapers } from './components/newspapers/Newspapers';
import { SearchField } from './components/search-field/SearchField';
import { Button } from './components/button/Button';
import { ToggleSwitch } from './components/toggle-switch/ToggleSwitch';
import { Article, Articles } from './interfaces/articles.interface';
import { request } from './services/request';

function App() {
  const [searchValue, setSearchValue]: [string, Function]  = useState('');
  const [newspapers, setNewspapers]: [string[], Function] = useState([]);
  const [selectedNewspapers, setSelectedNewspapers]: [string[], Function]  = useState([]);
  const [moreRecent, setMoreRecent]: [boolean, Function]  = useState(false);
  const [isLoading, setIsLoading]: [boolean, Function]  = useState(false);
  const [pageSize, setPageSize]: [number, Function]  = useState(20);
  const [articles, setArticles]: [Article[], Function] = useState([]);

  useEffect(()=>{
    setIsLoading(true);
    request(moreRecent, searchValue, pageSize)
    .then((articles:Articles) => {
      setNewspapers(
        articles.articles
        .map(article => article.source.name)
        .sort()
        .filter((value, pos, ary) => !!value && (!pos || value !== ary[pos - 1]))
      )
      setArticles(articles.articles);
      setSelectedNewspapers([]);
      setIsLoading(false)
      }
    )
    .catch(() => setIsLoading(false));
  },[searchValue, moreRecent, pageSize])

  const changeValue = (event: string) => {
    setSearchValue(event);
  }

  const changeMoreRecentValue = () => {
    setMoreRecent(!moreRecent);
    setPageSize(20);
  }

  const changeSelectednewspapers = (value: string) => {
    selectedNewspapers.includes(value)
    ? setSelectedNewspapers(selectedNewspapers.filter(newspaper => newspaper !== value))
    : setSelectedNewspapers([...selectedNewspapers, value]);
  }

  const showMore = () => {
    setPageSize(pageSize+20);
  }

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <h1 className="col-12 mt-4 mb-2 d-flex justify-content-center">HomeDevNews</h1>
        </div>
        <div className="row mt-3">
          <div className="col-7 col-lg-8">
            <SearchField searchValue={searchValue} setSearchValue={changeValue}/>
          </div>
          <div className="col-5 col-lg-4 mt-2">
            <ToggleSwitch searchValue={searchValue} changeMoreRecentValue={changeMoreRecentValue}/>
          </div>
        </div>
        <div className="row mt-3">
            <div className="col-7 col-lg-8">
              <NewsList articles={articles} selectedNewspapers={selectedNewspapers} />
            {
              pageSize < 100 && !!articles.length && 
              <div className="col-12 d-flex justify-content-center mt-4 mb-5">
                <Button inputFunc={showMore}>Mostra altri</Button>
              </div>
            }
            </div>
          <div className="col-5 col-lg-4">
            <Newspapers newspapers={newspapers} selectedNewspapers={selectedNewspapers} setSelectedNewspapers={changeSelectednewspapers}/>
          </div>
        </div>
      </div>
      {isLoading && <Loader />}
    </React.Fragment>
  );
}

export default App;
