import React from 'react';

const SearchBar = ({ onChange, placeholder}) => {
    return (<div className="input-group m-1">
        <input 
            type="text" 
            className="form-control" 
            placeholder={placeholder}
            onChange={onChange}
        />
    </div>);
}

export default SearchBar;
