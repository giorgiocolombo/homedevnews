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

  useEffect(()=>{
    setIsLoading(true);
    request(process.env.REACT_APP_HEADLINES_ENDPOINT!)
    .then((articles:Articles) => setNewspapers(
      articles.articles
      .map(article => article.source.name)
      .sort()
      .filter((value, pos, ary) => !!value && (!pos || value !== ary[pos - 1]))
      )
    )
    .then(() => setIsLoading(false))
    .catch(() => setIsLoading(false));
  },[])

  const changeValue = (event: string) => {
    setSearchValue(event);
  }

  const changeMoreRecentValue = () => {
    setMoreRecent(!moreRecent)
  }

  const changeSelectednewspapers = (value: string) => {
    selectedNewspapers.includes(value)
    ? setSelectedNewspapers(selectedNewspapers.filter(newspaper => newspaper !== value))
    : setSelectedNewspapers([...selectedNewspapers, value]);
  }

  const showMore = () => {
    console.log('more');
    
  }

  return (
    <React.Fragment>
      <div className="container">
      <div className="row mt-3">
        <div className="col-4">
          <SearchField searchValue={searchValue} setSearchValue={changeValue}/>
        </div>
        <div className="col-4">
          <ToggleSwitch changeMoreRecentValue={changeMoreRecentValue}/>
        </div>
        <div className="col-8">
          <Newspapers newspapers={newspapers} selectedNewspapers={selectedNewspapers} setSelectedNewspapers={changeSelectednewspapers}/>
        </div>
        {
        moreRecent && 
          <div className="col-8">
            <ShowMore showMore={showMore} />
          </div>
        }
      </div>
    </div>
    {isLoading && <Loader />}
    </React.Fragment>
  );
}

export default App;
