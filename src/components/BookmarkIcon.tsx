import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "../contexts/context-hooks";

type BookmarkIconProps = {
  jobItemId: number;
};

export default function BookmarkIcon({ jobItemId }: BookmarkIconProps) {
  const { bookmarkedIds, handleToggleBookmark } = useBookmarksContext();

  const bookmarked = bookmarkedIds.includes(jobItemId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleToggleBookmark(jobItemId);
      }}
      className="bookmark-btn"
    >
      <BookmarkFilledIcon className={`${bookmarked ? "filled" : ""}`} />
    </button>
  );
}
