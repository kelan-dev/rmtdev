import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { TPaginationDirection } from "../lib/types";
import { useJobItemsContext } from "../contexts/context-hooks";

export default function PaginationControls() {
  const { currentPage, totalPages, handlePageChange } = useJobItemsContext();

  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          direction="prev"
          currentPage={currentPage}
          onClick={handlePageChange}
        />
      )}
      {currentPage < totalPages && (
        <PaginationButton
          direction="next"
          currentPage={currentPage}
          onClick={handlePageChange}
        />
      )}
    </section>
  );
}

type PaginationButtonProps = {
  direction: TPaginationDirection;
  currentPage: number;
  onClick: (direction: TPaginationDirection) => void;
};

function PaginationButton({
  direction,
  currentPage,
  onClick,
}: PaginationButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.currentTarget.blur();
        onClick(direction);
      }}
      className={`pagination__button pagination__button--${direction}`}
    >
      {direction === "prev" && (
        <>
          <ArrowLeftIcon /> Page {currentPage - 1}
        </>
      )}
      {direction === "next" && (
        <>
          <ArrowRightIcon /> Page {currentPage + 1}
        </>
      )}
    </button>
  );
}
