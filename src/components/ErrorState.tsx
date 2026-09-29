interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div style={{ padding: "40px", textAlign: "center", color: "#d92d20" }}>
      <h2>❌ Something went wrong</h2>
      <p>{message}</p>
      <button
        onClick={onRetry}
        style={{
          padding: "10px 20px",
          marginTop: "10px",
          background: "#3b5bfd",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        🔄 Try Again
      </button>
    </div>
  );
}

export default ErrorState;