import { createContext, useState } from "react";
import { useDebounce } from "../lib/hooks";

type TSearchTextContext = {
  searchText: string;
  debouncedSearchText: string;
  handleSearchTextChange: (searchText: string) => void;
};

export const SearchTextContext = createContext<TSearchTextContext | null>(null);

type SearchTextContextProviderProps = {
  children: React.ReactNode;
};

export default function SearchTextContextProvider({
  children,
}: SearchTextContextProviderProps) {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  const handleSearchTextChange = (searchText: string) => {
    setSearchText(searchText);
  };

  return (
    <SearchTextContext.Provider
      value={{
        searchText,
        debouncedSearchText,
        handleSearchTextChange,
      }}
    >
      {children}
    </SearchTextContext.Provider>
  );
}
