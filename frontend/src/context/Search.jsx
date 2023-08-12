import { useState, useContext, createContext } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
    const [search, setSearch] = useState({
        key: '',
        results: [],
    });
    return (
        <SearchContext.Provider value={[search, setSearch]}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearch = () => useContext(SearchContext)