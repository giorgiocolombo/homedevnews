import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import { Loader } from './components/loader/Loader';
import { Newspapers } from './components/newspapers/Newspapers';
import { SearchField } from './components/search-field/SearchField';
import { ShowMore } from './components/show-more/ShowMore';
import { ToggleSwitch } from './components/toggle-switch/ToggleSwitch';
import { Articles } from './interfaces/articles.interface';
import { request } from './services/request';

function App() {
  const [searchValue, setSearchValue]: [string, Function]  = useState('');
  const [newspapers, setNewspapers]: [string[], Function] = useState([]);
  const [selectedNewspapers, setSelectedNewspapers]: [string[], Function]  = useState([]);
  const [moreRecent, setMoreRecent]: [boolean, Function]  = useState(false);
  const [isLoading, setIsLoading]: [boolean, Function]  = useState(false);
  const [pageSize, setPageSize]: [number, Function]  = useState(20);

  useEffect(()=>{
    setIsLoading(true);
    request(moreRecent, searchValue, pageSize)
    .then((articles:Articles) => setNewspapers(
      articles.articles
      .map(article => article.source.name)
      .sort()
      .filter((value, pos, ary) => !!value && (!pos || value !== ary[pos - 1]))
      )
    )
    .then(() => setIsLoading(false))
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
      <div className="row mt-3">
        <div className="col-4">
          <SearchField searchValue={searchValue} setSearchValue={changeValue}/>
        </div>
        <div className="col-4">
          <ToggleSwitch searchValue={searchValue} changeMoreRecentValue={changeMoreRecentValue}/>
        </div>
        <div className="col-8">
          <Newspapers newspapers={newspapers} selectedNewspapers={selectedNewspapers} setSelectedNewspapers={changeSelectednewspapers}/>
        </div>
          <div className="col-8">
            <ShowMore showMore={showMore} />
          </div>
      </div>
    </div>
    {isLoading && <Loader />}
    </React.Fragment>
  );
}

export default App;
