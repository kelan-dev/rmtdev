import { RefObject, useEffect, useState } from "react";
import { TJobItemDetail, TJobItemBrief } from "./types";
import { BASE_API_URL } from "./constants";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useActiveIdContext } from "../contexts/context-hooks";

// ################################################################################

type TSearchQueryAPIResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: TJobItemBrief[];
};

const fetchWithSearchQuery = async (
  searchText: string
): Promise<TSearchQueryAPIResponse> => {
  const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error("Error fetching job items: " + error.description);
  }
  const data = await response.json();
  return data;
};

export function useSearchQuery(searchText: string | null) {
  const { data, isInitialLoading } = useQuery(
    ["jobItems", searchText],
    () => (searchText ? fetchWithSearchQuery(searchText) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!searchText,
    }
  );

  return {
    jobItems: data?.jobItems || [],
    isLoading: isInitialLoading,
  } as const;
}

// ################################################################################

type TJobItemAPIResponse = {
  public: boolean;
  jobItem: TJobItemDetail;
};

const fetchJobItem = async (id: number): Promise<TJobItemAPIResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  if (!response.ok) {
    const data = await response.json();
    throw new Error("Error fetching job item: " + data.description);
  }
  const data = await response.json();
  return data;
};

export function useJobItem(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["jobItem", id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!id,
    }
  );

  return {
    jobItem: data?.jobItem || null,
    isLoading: isInitialLoading,
  } as const;
}

export function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["jobItem", id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!id,
    })),
  });

  const jobItems = results
    .map((result) => result.data?.jobItem || null)
    .filter((item) => item !== null) as TJobItemDetail[];

  const isLoading = results.some((result) => result.isLoading);

  return { jobItems, isLoading };
}

// ################################################################################

export function useActiveJobItem() {
  const { activeId } = useActiveIdContext();
  const { jobItem, isLoading } = useJobItem(activeId);
  return { jobItem, isLoading };
}

// ################################################################################

export function useDebounce<T>(sourceValue: T, timeout = 1000): T {
  const [debouncedValue, setDebouncedValue] = useState(sourceValue);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(sourceValue);
    }, timeout);
    return () => clearTimeout(timerId);
  }, [sourceValue, timeout]);

  return debouncedValue;
}

// ################################################################################

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}

// ################################################################################

export function useOnClickOutside(
  refs: RefObject<HTMLElement>[],
  callback: () => void
) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        !refs.some((ref) => ref.current?.contains(e.target as Node))
      )
        callback();
    };

    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [refs, callback]);
}
