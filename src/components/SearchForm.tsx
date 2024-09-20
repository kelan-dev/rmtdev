import { useSearchTextContext } from "../contexts/context-hooks";

export default function SearchForm() {
  const { searchText, handleSearchTextChange } = useSearchTextContext();

  return (
    <form onSubmit={(e) => e.preventDefault()} action="#" className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={searchText}
        onChange={(e) => handleSearchTextChange(e.target.value)}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
