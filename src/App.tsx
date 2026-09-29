import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { InternshipsProvider } from "./context/InternshipsContext";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";

function App() {
  return (
    <BrowserRouter>
      <InternshipsProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/internships" element={<HomePage />} />
            <Route path="/internships/:id" element={<DetailsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </InternshipsProvider>
    </BrowserRouter>
  );
}

export default App;