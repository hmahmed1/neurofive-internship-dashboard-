interface LoadingStateProps {
  message?: string;
}

function LoadingState({ message = "Loading internships..." }: LoadingStateProps) {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>⏳ {message}</h2>
      <p style={{ color: "#666" }}>Please wait, data load ho raha hai.</p>
    </div>
  );
}

export default LoadingState;