import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import type { ApplicationFormData } from "../types";

type FieldName = keyof ApplicationFormData;
type FieldErrors = Partial<Record<FieldName, string>>;

const INITIAL_VALUES: ApplicationFormData = {
  name: "",
  email: "",
  coverNote: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_NOTE = 20;
const MAX_NOTE = 500;

function validate(values: ApplicationFormData): FieldErrors {
  const errors: FieldErrors = {};

  const name = values.name.trim();
  if (!name) {
    errors.name = "Name is required.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  const note = values.coverNote.trim();
  if (!note) {
    errors.coverNote = "Cover note is required.";
  } else if (note.length < MIN_NOTE) {
    errors.coverNote = `Cover note must be at least ${MIN_NOTE} characters.`;
  } else if (note.length > MAX_NOTE) {
    errors.coverNote = `Cover note must be under ${MAX_NOTE} characters.`;
  }

  return errors;
}

interface ApplyFormProps {
  internshipId: string;
  internshipTitle: string;
}

function ApplyForm({ internshipId, internshipTitle }: ApplyFormProps) {
  const [values, setValues] = useState<ApplicationFormData>(INITIAL_VALUES);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => validate(values), [values]);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(field: FieldName) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setValues((prev) => ({ ...prev, [field]: value }));
    };
  }

  function handleBlur(field: FieldName) {
    return () => setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function errorFor(field: FieldName): string | undefined {
    return touched[field] || submitAttempted ? errors[field] : undefined;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitAttempted(true);
    if (!isValid) return;
    setSubmitted(true);
  }

  function handleReset() {
    setValues(INITIAL_VALUES);
    setTouched({});
    setSubmitAttempted(false);
    setSubmitted(false);
  }

  // Success Screen
  if (submitted) {
    return (
      <div
        style={{
          background: "#f0fdf4",
          border: "1px solid #86efac",
          borderRadius: "12px",
          padding: "24px",
        }}
      >
        <h3 style={{ margin: "0 0 8px", color: "#166534" }}>
          ✅ Application Submitted!
        </h3>
        <p style={{ color: "#166534", margin: "0 0 8px" }}>
          Shukriya <strong>{values.name.trim()}</strong>! Tumhara application{" "}
          <strong>{internshipTitle}</strong> ke liye record ho gaya hai.
        </p>
        <p style={{ color: "#666", fontSize: "13px", margin: "0 0 12px" }}>
          Reference: {internshipId} · Stored in component state only (no backend yet).
        </p>
        <button
          type="button"
          onClick={handleReset}
          style={{
            padding: "8px 16px",
            background: "#3b5bfd",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  const nameError = errorFor("name");
  const emailError = errorFor("email");
  const noteError = errorFor("coverNote");
  const noteLength = values.coverNote.trim().length;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <h3 style={{ margin: 0 }}>Apply for this role</h3>

      {/* Name */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label htmlFor="applicant-name" style={{ fontSize: "13px", fontWeight: "600", color: "#333" }}>
          Full Name
        </label>
        <input
          id="applicant-name"
          type="text"
          value={values.name}
          onChange={handleChange("name")}
          onBlur={handleBlur("name")}
          style={{
            padding: "10px 12px",
            border: nameError ? "1px solid #d92d20" : "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "14px",
            background: "#fff",
            color: "#000",
            outline: "none",
          }}
        />
        {nameError && (
          <p style={{ margin: 0, color: "#d92d20", fontSize: "12px" }}>{nameError}</p>
        )}
      </div>

      {/* Email */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label htmlFor="applicant-email" style={{ fontSize: "13px", fontWeight: "600", color: "#333" }}>
          Email
        </label>
        <input
          id="applicant-email"
          type="email"
          value={values.email}
          onChange={handleChange("email")}
          onBlur={handleBlur("email")}
          style={{
            padding: "10px 12px",
            border: emailError ? "1px solid #d92d20" : "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "14px",
            background: "#fff",
            color: "#000",
            outline: "none",
          }}
        />
        {emailError && (
          <p style={{ margin: 0, color: "#d92d20", fontSize: "12px" }}>{emailError}</p>
        )}
      </div>

      {/* Cover Note */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label htmlFor="applicant-note" style={{ fontSize: "13px", fontWeight: "600", color: "#333" }}>
          Cover Note
        </label>
        <textarea
          id="applicant-note"
          rows={5}
          value={values.coverNote}
          onChange={handleChange("coverNote")}
          onBlur={handleBlur("coverNote")}
          style={{
            padding: "10px 12px",
            border: noteError ? "1px solid #d92d20" : "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "14px",
            background: "#fff",
            color: "#000",
            outline: "none",
            fontFamily: "inherit",
            resize: "vertical",
          }}
        />
        <p style={{ margin: 0, color: "#666", fontSize: "12px", textAlign: "right" }}>
          {noteLength} / {MAX_NOTE} characters
        </p>
        {noteError && (
          <p style={{ margin: 0, color: "#d92d20", fontSize: "12px" }}>{noteError}</p>
        )}
      </div>

      <button
        type="submit"
        style={{
          padding: "12px",
          background: "#3b5bfd",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "15px",
          fontWeight: "600",
        }}
      >
        Submit Application
      </button>
    </form>
  );
}

export default ApplyForm;