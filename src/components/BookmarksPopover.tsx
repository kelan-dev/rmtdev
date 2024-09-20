import { createPortal } from "react-dom";
import { useBookmarksContext } from "../contexts/context-hooks";
import JobList from "./JobList";
import { forwardRef } from "react";

type BookmarksPopoverProps = {
  // Unused prop demonstrating how to type props with forwardRef()
  sampleProp?: number;
};

const BookmarksPopover = forwardRef<HTMLDivElement, BookmarksPopoverProps>(
  function (_props, ref) {
    const { bookmarkedJobItems, isLoading } = useBookmarksContext();

    // Common technique for popovers or modals; relocates the component in the DOM
    return createPortal(
      <div ref={ref} className="bookmarks-popover">
        <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />
      </div>,
      document.body
    );
  }
);

export default BookmarksPopover;
