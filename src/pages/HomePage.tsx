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

  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 300);

  const locationOptions = useMemo(
    () => Array.from(new Set(internships.map((i) => i.location))).sort(),
    [internships]
  );

  const categoryOptions = useMemo(
    () => Array.from(new Set(internships.map((i) => i.category))).sort(),
    [internships]
  );

  const visibleInternships = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    return internships.filter((item) => {
      const matchesSearch =
        query.length === 0 ||
        item.title.toLowerCase().includes(query) ||
        item.company.toLowerCase().includes(query);
      const matchesLocation = locationFilter === "" || item.location === locationFilter;
      const matchesCategory = categoryFilter === "" || item.category === categoryFilter;
      return matchesSearch && matchesLocation && matchesCategory;
    });
  }, [internships, debouncedSearch, locationFilter, categoryFilter]);

  // Stat numbers
  const stats = useMemo(
    () => [
      { label: "Total Internships", value: internships.length },
      { label: "Remote", value: internships.filter((i) => i.location === "Remote").length },
      { label: "Locations", value: new Set(internships.map((i) => i.location)).size },
      { label: "Categories", value: new Set(internships.map((i) => i.category)).size },
    ],
    [internships]
  );

  const hasActiveFilters =
    searchTerm !== "" || locationFilter !== "" || categoryFilter !== "";

  function clearFilters() {
    setSearchTerm("");
    setLocationFilter("");
    setCategoryFilter("");
  }

  if (status === "loading") return <LoadingState />;
  if (status === "error") return <ErrorState message={error ?? "Unknown error"} onRetry={reload} />;

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Dashboard</h1>
      <p style={{ color: "#5a6070", marginTop: "-8px" }}>
        {visibleInternships.length} of {internships.length} internships shown
      </p>

      {/* Stat Cards */}
      <section className="stats-grid" aria-label="Overview">
        {stats.map((stat) => (
          <article key={stat.label} className="stat-card">
            <p className="stat-card__label">{stat.label}</p>
            <p className="stat-card__value">{stat.value}</p>
          </article>
        ))}
      </section>

      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          alignItems: "flex-end",
          marginBottom: "24px",
        }}
      >
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search by title or company..." />
        <FilterSelect label="Location" value={locationFilter} options={locationOptions} onChange={setLocationFilter} />
        <FilterSelect label="Category" value={categoryFilter} options={categoryOptions} onChange={setCategoryFilter} />
      </div>

      {/* Cards */}
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