import { useEffect, useState } from 'react';
import './App.css';
import { Newspapers } from './components/newspapers/Newspapers';
import { SearchField } from './components/search-field/SearchField';
import { ToggleSwitch } from './components/toggle-switch/ToggleSwitch';
import { isURL } from './constants/regex.const';
import { Articles } from './interfaces/articles.interface';
import { request } from './services/request';

function App() {
  const [searchValue, setSearchValue]: [string, Function]  = useState('');
  const [newspapers, setNewspapers]: [string[], Function] = useState([]);
  const [selectedNewspapers, setSelectedNewspapers]: [string[], Function]  = useState(["b"]);

  const changeValue = (event: string) => {
    setSearchValue(event);
  }

  const changeSelectednewspapers = (value: string) => {
    selectedNewspapers.includes(value)
    ? setSelectedNewspapers(selectedNewspapers.filter(newspaper => newspaper !== value))
    : setSelectedNewspapers([...selectedNewspapers, value]);
  }

  useEffect(()=>{
    request(process.env.REACT_APP_HEADLINES_ENDPOINT!)
    .then((articles:Articles) => setNewspapers(
      articles.articles
      .map(article => article.author && article.author)
      .sort()
      .filter((value, pos, ary) => !!value && !isURL.test(value) && (!pos || value !== ary[pos - 1]))
      )
    )
  },[])

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-4">
          <SearchField searchValue={searchValue} setSearchValue={changeValue}/>
        </div>
        <div className="col-4">
          <ToggleSwitch />
        </div>
        <div className="col-8">
          <Newspapers newspapers={newspapers} selectedNewspapers={selectedNewspapers} setSelectedNewspapers={changeSelectednewspapers}/>
        </div>
      </div>
    </div>
  );
}

export default App;
