import '../styles/SearchBar.css'
function SearchBar({ value, onChange }) {
  return (
    <input
    className='search-bar control-input'
      type="text"
      placeholder="Buscar por título o contenido..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ margin: "10px", padding: "5px", width: "60%" }}
    />
  );
}

export default SearchBar;
