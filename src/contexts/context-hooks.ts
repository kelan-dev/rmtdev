import { useContext } from "react";
import { BookmarksContext } from "./BookmarksContextProvider";
import { ActiveIdContext } from "./ActiveIdContextProvider";
import { SearchTextContext } from "./SearchTextContextProvider";
import { JobItemsContext } from "./JobItemsContextProvider";

export function useBookmarksContext() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error(
      "useBookmarks must be used within a BookmarksContextProvider"
    );
  }
  return context;
}

export function useActiveIdContext() {
  const context = useContext(ActiveIdContext);
  if (!context) {
    throw new Error(
      "useActiveId must be used within a ActiveIdContextProvider"
    );
  }
  return context;
}

export function useSearchTextContext() {
  const context = useContext(SearchTextContext);
  if (!context) {
    throw new Error(
      "useSearchText must be used within a SearchTextContextProvider"
    );
  }
  return context;
}

export function useJobItemsContext() {
  const context = useContext(JobItemsContext);
  if (!context) {
    throw new Error(
      "useJobItems must be used within a JobItemsContextProvider"
    );
  }
  return context;
}
