import { createContext, useCallback, useMemo, useState } from "react";
import { useSearchQuery } from "../lib/hooks";
import {
  TSortingMethod,
  TPaginationDirection,
  TJobItemBrief,
} from "../lib/types";
import { useSearchTextContext } from "./context-hooks";

type TJobItemsContext = {
  jobItems: TJobItemBrief[];
  jobItemsSortedAndSliced: TJobItemBrief[];
  isLoading: boolean;
  totalJobItems: number;
  currentPage: number;
  totalPages: number;
  sortBy: TSortingMethod;
  handlePageChange: (direction: TPaginationDirection) => void;
  handleSortByChange: (sortBy: TSortingMethod) => void;
};

export const JobItemsContext = createContext<TJobItemsContext | null>(null);

type JobItemsContextProviderProps = {
  children: React.ReactNode;
};

export default function JobItemsContextProvider({
  children,
}: JobItemsContextProviderProps) {
  const { debouncedSearchText } = useSearchTextContext();

  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);

  const [sortBy, setSortBy] = useState<TSortingMethod>("relevant");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 7;
  const totalPages = Math.ceil((jobItems?.length || 0) / pageSize);
  const totalJobItems = jobItems?.length || 0;

  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])].sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else {
          return a.daysAgo - b.daysAgo;
        }
      }),
    [jobItems, sortBy]
  );

  const jobItemsSortedAndSliced = useMemo(
    () =>
      jobItemsSorted.slice(
        currentPage * pageSize - pageSize,
        currentPage * pageSize
      ),
    [jobItemsSorted, currentPage, pageSize]
  );

  const handlePageChange = useCallback(
    (direction: TPaginationDirection) => {
      if (direction === "next") {
        setCurrentPage((page) => page + 1);
      } else {
        setCurrentPage((page) => page - 1);
      }
    },
    [setCurrentPage]
  );

  const handleSortByChange = useCallback(
    (sortBy: TSortingMethod) => {
      setSortBy(sortBy);
      setCurrentPage(1);
    },
    [setSortBy, setCurrentPage]
  );

  const contextValue = useMemo(
    () => ({
      jobItems,
      jobItemsSortedAndSliced,
      isLoading,
      totalJobItems,
      currentPage,
      totalPages,
      sortBy,
      handlePageChange,
      handleSortByChange,
    }),
    [
      jobItems,
      jobItemsSortedAndSliced,
      isLoading,
      totalJobItems,
      currentPage,
      totalPages,
      sortBy,
      handlePageChange,
      handleSortByChange,
    ]
  );

  return (
    <JobItemsContext.Provider value={contextValue}>
      {children}
    </JobItemsContext.Provider>
  );
}
