import { Link } from "react-router-dom";
import type { Internship } from "../types";
import Badge from "./Badge";

interface CardProps {
  internship: Internship;
}

function Card({ internship }: CardProps) {
  const { id, title, company, location, category, tags } = internship;

  return (
    <article
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <h3 style={{ margin: 0, fontSize: "18px" }}>{title}</h3>

      <p style={{ margin: 0, color: "#3b5bfd", fontWeight: "bold" }}>
        {company}
      </p>

      <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
        📍 {location} · {category}
      </p>

      <div>
        {tags.map((tag) => (
          <Badge key={tag} label={tag} />
        ))}
      </div>

      <Link
        to={`/internships/${id}`}
        style={{
          marginTop: "10px",
          color: "#3b5bfd",
          fontWeight: "bold",
          textDecoration: "none",
        }}
      >
        View details →
      </Link>
    </article>
  );
}

export default Card;