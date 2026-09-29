import { useNavigate, useParams } from "react-router-dom";
import { useInternships } from "../context/InternshipsContext";
import ApplyForm from "../components/ApplyForm";
import Badge from "../components/Badge";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

function DetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { internships, status, error, reload } = useInternships();

  if (status === "loading") {
    return <LoadingState message="Loading posting..." />;
  }

  if (status === "error") {
    return <ErrorState message={error ?? "Unknown error"} onRetry={reload} />;
  }

  const internship = internships.find((item) => item.id === id);

  if (!internship) {
    return (
      <EmptyState
        title="Posting not found"
        message={`Hum ko "${id}" id wali internship nahi mili.`}
        actionLabel="Back to All Internships"
        onAction={() => navigate("/")}
      />
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "sans-serif",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "none",
          border: "none",
          color: "#3b5bfd",
          cursor: "pointer",
          fontSize: "15px",
          padding: 0,
          marginBottom: "16px",
          fontWeight: "600",
        }}
      >
        ← Back
      </button>

      <header style={{ marginBottom: "24px" }}>
        <h1 style={{ margin: "0 0 8px" }}>{internship.title}</h1>
        <p style={{ margin: "0 0 8px", color: "#3b5bfd", fontWeight: "bold", fontSize: "18px" }}>
          {internship.company}
        </p>
        <p style={{ margin: "0 0 12px", color: "#666" }}>
          📍 {internship.location} · {internship.category} · {internship.duration}
        </p>
        <div>
          {internship.tags.map((tag) => (
            <Badge key={tag} label={tag} />
          ))}
        </div>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "24px",
        }}
      >
        {/* Left: Description */}
        <div>
          <h2 style={{ fontSize: "18px", marginBottom: "8px" }}>About this role</h2>
          <p style={{ color: "#444", lineHeight: "1.6" }}>{internship.description}</p>

          <h2 style={{ fontSize: "18px", marginTop: "24px", marginBottom: "8px" }}>
            Requirements
          </h2>
          <ul style={{ color: "#444", lineHeight: "1.8", paddingLeft: "20px" }}>
            {internship.requirements.map((req) => (
              <li key={req}>{req}</li>
            ))}
          </ul>

          <div
            style={{
              marginTop: "24px",
              padding: "16px",
              background: "#f9fafb",
              borderRadius: "8px",
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: "8px 16px",
            }}
          >
            <span style={{ color: "#666" }}>Stipend:</span>
            <strong>{internship.stipend}</strong>
            <span style={{ color: "#666" }}>Duration:</span>
            <strong>{internship.duration}</strong>
            <span style={{ color: "#666" }}>Posted:</span>
            <strong>{internship.postedDate}</strong>
          </div>
        </div>

        {/* Right: Apply Form */}
        <aside>
          <ApplyForm internshipId={internship.id} internshipTitle={internship.title} />
        </aside>
      </div>
    </div>
  );
}

export default DetailsPage;