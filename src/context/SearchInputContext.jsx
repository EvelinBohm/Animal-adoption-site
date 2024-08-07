import { createContext, useState } from "react";

const SearchInputContext = createContext();

export const SearchInputProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <SearchInputContext.Provider value={{ searchInput, setSearchInput }}>
      {children}
    </SearchInputContext.Provider>
  );
};

export default SearchInputContext;
