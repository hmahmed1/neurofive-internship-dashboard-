import { useMemo, useState } from "react";
import { useInternships } from "../context/InternshipsContext";
import { useDebounce } from "../hooks/useDebounce";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import FilterSelect from "../components/FilterSelect";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

function HomePage() {
  const { internships, status, error, reload } = useInternships();

  // Search + Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Debounced search (300ms wait)
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Filter options nikalo (duplicate hata kar)
  const locationOptions = useMemo(
    () => Array.from(new Set(internships.map((item) => item.location))).sort(),
    [internships]
  );

  const categoryOptions = useMemo(
    () => Array.from(new Set(internships.map((item) => item.category))).sort(),
    [internships]
  );

  // AND logic: Search + Location + Category sab match hone chahiye
  const visibleInternships = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    return internships.filter((item) => {
      const matchesSearch =
        query.length === 0 ||
        item.title.toLowerCase().includes(query) ||
        item.company.toLowerCase().includes(query);

      const matchesLocation =
        locationFilter === "" || item.location === locationFilter;

      const matchesCategory =
        categoryFilter === "" || item.category === categoryFilter;

      return matchesSearch && matchesLocation && matchesCategory;
    });
  }, [internships, debouncedSearch, locationFilter, categoryFilter]);

  const hasActiveFilters =
    searchTerm !== "" || locationFilter !== "" || categoryFilter !== "";

  function clearFilters() {
    setSearchTerm("");
    setLocationFilter("");
    setCategoryFilter("");
  }

  // Loading state
  if (status === "loading") {
    return <LoadingState />;
  }

  // Error state
  if (status === "error") {
    return <ErrorState message={error ?? "Unknown error"} onRetry={reload} />;
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
      <h1>Open Internships</h1>
      <p style={{ color: "#666" }}>
        {visibleInternships.length} of {internships.length} postings
      </p>

      {/* Toolbar: Search + Filters */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          alignItems: "flex-end",
          marginTop: "20px",
          marginBottom: "24px",
        }}
      >
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by title or company..."
        />
        <FilterSelect
          label="Location"
          value={locationFilter}
          options={locationOptions}
          onChange={setLocationFilter}
        />
        <FilterSelect
          label="Category"
          value={categoryFilter}
          options={categoryOptions}
          onChange={setCategoryFilter}
        />
      </div>

      {/* List ya Empty State */}
      {visibleInternships.length === 0 ? (
        <EmptyState
          title="No internships match your search"
          message="Try a different keyword or clear the filters."
          actionLabel={hasActiveFilters ? "Clear Filters" : undefined}
          onAction={hasActiveFilters ? clearFilters : undefined}
        />
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {visibleInternships.map((internship) => (
            <Card key={internship.id} internship={internship} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;