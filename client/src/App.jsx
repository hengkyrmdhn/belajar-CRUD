import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import CategoryPage from "./pages/CategoryPages";
import ProductPage from "./pages/ProductPages";
import ProductPages from "./pages/ProductPages";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            react CRUD
          </Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/categories">
              Kategori
            </Link>
            <Link className="nav-link" to="/products">
              Produk
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container py-5 text-center">
              <h1>Selamat datang</h1>
              <p className="lead">silahkan pilih menuuuuu</p>
            </div>
          }
        />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/products" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
