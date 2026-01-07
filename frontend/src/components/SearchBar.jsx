const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search notes..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full md:w-80 px-4 py-2 rounded-xl bg-slate-900 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  );
};

export default SearchBar;
