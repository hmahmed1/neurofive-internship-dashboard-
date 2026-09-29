interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}: SearchBarProps) {
  return (
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      style={{
        padding: "10px 14px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        fontSize: "15px",
        minWidth: "280px",
        outline: "none",
      }}
    />
  );
}

export default SearchBar;