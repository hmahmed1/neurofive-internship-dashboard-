interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <label
        style={{
          fontSize: "13px",
          color: "#333",
          fontWeight: "600",
        }}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        style={{
          padding: "10px 14px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          fontSize: "15px",
          background: "#ffffff",
          color: "#000000",
          cursor: "pointer",
          outline: "none",
          minWidth: "160px",
        }}
      >
        <option value="" style={{ background: "#ffffff", color: "#000000" }}>
          All
        </option>
        {options.map((option) => (
          <option
            key={option}
            value={option}
            style={{ background: "#ffffff", color: "#000000" }}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterSelect;