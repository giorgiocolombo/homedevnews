export function request(endpoint:string, params?: string[]){
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const headers = new Headers();

    return fetch(`${BASE_URL}/${endpoint}&apiKey=${API_KEY}`, {headers})
    .then(response => {
        if (!response.ok){
            throw new Error(response.statusText);
        }
        return response.json();
    })
}