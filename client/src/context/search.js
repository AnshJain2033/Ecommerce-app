import React from "react";
import { useContext, createContext, useState } from "react";
const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        keyword: '',
        results: [],

    })

    return (
        <SearchContext.Provider value={[auth, setAuth]}>
            {children}
        </SearchContext.Provider>
    )
}
//custom Hook
const useSearch = () => useContext(SearchContext)
export { useSearch, SearchProvider }