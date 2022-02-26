export function sourceRequest(id?: string, pageSize?: number){
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const endpoint = id ? process.env.REACT_APP_EVERYTHING_ENDPOINT : process.env.REACT_APP_SOURCE_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const headers = new Headers();
    const url = new URL(`${BASE_URL}/${endpoint}&apiKey=${API_KEY}`);
    id && url.searchParams.append('sources', id);
    pageSize && url.searchParams.append('pageSize', String(pageSize));

    return fetch(String(url), {headers})
    .then(response => {
        if (!response.ok){
            throw new Error(response.statusText);
        }
        return response.json();
    })
}