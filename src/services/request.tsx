export function request(moreRecent: boolean, searchValue: string, pageSize: number){
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const endpoint = moreRecent ? process.env.REACT_APP_EVERYTHING_ENDPOINT : process.env.REACT_APP_HEADLINES_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const headers = new Headers();
    const url = new URL(`${BASE_URL}/${endpoint}&apiKey=${API_KEY}`);
    searchValue && url.searchParams.append('q', searchValue);
    pageSize && url.searchParams.append('pageSize', String(pageSize));

    return fetch(String(url), {headers})
    .then(response => {
        if (!response.ok){
            throw new Error(response.statusText);
        }
        return response.json();
    })
}