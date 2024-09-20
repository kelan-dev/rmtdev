import { createContext } from "react";
import { useLocalStorage, useJobItems } from "../lib/hooks";
import { TJobItemDetail } from "../lib/types";

type TBookmarksContext = {
  bookmarkedIds: number[];
  handleToggleBookmark: (id: number) => void;
  bookmarkedJobItems: TJobItemDetail[];
  isLoading: boolean;
};

export const BookmarksContext = createContext<TBookmarksContext | null>(null);

type BookmarksContextProviderProps = {
  children: React.ReactNode;
};

export default function BookmarksContextProvider({
  children,
}: BookmarksContextProviderProps) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    "bookmarkedIds",
    []
  );

  const { jobItems: bookmarkedJobItems, isLoading } =
    useJobItems(bookmarkedIds);

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((state) => state.filter((i) => i !== id));
    } else {
      setBookmarkedIds((state) => [...state, id]);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedIds,
        handleToggleBookmark,
        bookmarkedJobItems,
        isLoading,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
