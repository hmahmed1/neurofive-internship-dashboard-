interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

function EmptyState({
  title = "No results found",
  message = "Try changing your search or filters.",
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div style={{ padding: "60px 20px", textAlign: "center" }}>
      <h2 style={{ margin: "0 0 8px", color: "#333" }}>🔍 {title}</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>{message}</p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          style={{
            padding: "10px 20px",
            background: "#3b5bfd",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: "600",
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;