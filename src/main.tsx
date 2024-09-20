import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { handleError } from "./lib/utils.ts";
import BookmarksContextProvider from "./contexts/BookmarksContextProvider.tsx";
import ActiveIdContextProvider from "./contexts/ActiveIdContextProvider.tsx";
import SearchTextContextProvider from "./contexts/SearchTextContextProvider.tsx";
import JobItemsContextProvider from "./contexts/JobItemsContextProvider.tsx";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleError,
  }),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ActiveIdContextProvider>
        <BookmarksContextProvider>
          <SearchTextContextProvider>
            <JobItemsContextProvider>
              <App />
            </JobItemsContextProvider>
          </SearchTextContextProvider>
        </BookmarksContextProvider>
      </ActiveIdContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
