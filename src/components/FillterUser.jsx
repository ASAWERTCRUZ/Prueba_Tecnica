import "../styles/FilterUser.css";

function FilterUser({ users, value, onChange }) {
  return (
    <select
    className="filter-user control-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ margin: "10px", padding: "5px" }}
    >
      <option value="">Todos los usuarios</option>
      {users.map((u) => (
        <option key={u.id} value={u.id}>
          {u.name}
        </option>
      ))}
    </select>
  );
}

export default FilterUser;
