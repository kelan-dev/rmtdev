import { useJobItemsContext } from "../contexts/context-hooks";
import { TSortingMethod } from "../lib/types";

export default function SortingControls() {
  const { sortBy, handleSortByChange } = useJobItemsContext();

  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButton
        sortBy="relevant"
        active={sortBy === "relevant"}
        onClick={handleSortByChange}
      />
      <SortingButton
        sortBy="recent"
        active={sortBy === "recent"}
        onClick={handleSortByChange}
      />
    </section>
  );
}

type SortingButtonProps = {
  sortBy: TSortingMethod;
  active: boolean;
  onClick: (sortBy: TSortingMethod) => void;
};

function SortingButton({ sortBy, active, onClick }: SortingButtonProps) {
  return (
    <button
      onClick={() => onClick(sortBy)}
      className={`sorting__button sorting__button--${sortBy} ${
        active ? "sorting__button--active" : ""
      }`}
    >
      {sortBy === "relevant" ? "Relevant" : "Recent"}
    </button>
  );
}
