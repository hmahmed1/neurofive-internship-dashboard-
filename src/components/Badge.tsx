interface BadgeProps {
  label: string;
}

function Badge({ label }: BadgeProps) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: "999px",
        fontSize: "12px",
        background: "#eef1ff",
        color: "#3b5bfd",
        marginRight: "6px",
        marginTop: "4px",
        fontWeight: "600",
      }}
    >
      {label}
    </span>
  );
}

export default Badge;