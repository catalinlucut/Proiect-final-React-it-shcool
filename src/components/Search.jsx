import "./Search.css";
import { Wrap } from "./Wrap";

export function Search({ setSearch, search, searchOpen, setSearchOpen }) {
  return (
    <Wrap
      onClickOutside={() => setSearchOpen(false)}
      show={searchOpen}
      type={"wrap-search"}
    >
      <div className="search-container">
        <input
          className="search"
          type="text"
          placeholder="Search Posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </Wrap>
  );
}
