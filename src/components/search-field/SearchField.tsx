import PropTypes from "prop-types";
import React from "react";

interface propsType {
    searchValue: string;
    setSearchValue: Function
}

export function SearchField(props: propsType) {
    const {searchValue, setSearchValue} = props;
    let inputValue = searchValue;
    
    const setInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        inputValue = event.target.value;
    }

    return (
        <React.Fragment>
            <div className="input-group mb-3 mt-2">
                <input type="text" className="form-control" placeholder="Cerca un argomento" aria-label="Cerca un argomento" onChange={setInputValue}  />
                <div className="input-group-append">
                    <button className="btn btn-outline-primary" type="button" onClick={() => {setSearchValue(inputValue)}}>Cerca</button>
                </div>
            </div>

        </React.Fragment>
    )
}

SearchField.prototype = {
    searchValue: PropTypes.string.isRequired,
    setSearchValue: PropTypes.func.isRequired
}