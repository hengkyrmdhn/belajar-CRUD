import { useState, useEffect } from "react";
import { getProducts, deleteProducts } from "../service/api";

const ProductList = ({ onEdit, reload }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [reload]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah anda ingin menghapus data?")) {
      try {
        await deleteProducts(id);
        alert("Data berhasil dihapus!");
        fetchProducts();
      } catch (error) {
        console.error("Error deleting:", error);
        alert("Gagal menghapus data");
      }
    }
  };

  // ✅ Function untuk format Rupiah
  const formatRupiah = (angka) => {
    if (!angka) return "Rp 0";
    return `Rp ${parseInt(angka).toLocaleString("id-ID")}`;
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;

  if (products.length === 0) {
    return <div className="text-center p-4">Tidak ada data produk</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>NO</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => (
            <tr key={product.id}>
              <td>{i + 1}</td>
              <td>{product.nama || "-"}</td>
              <td className="text-end">{formatRupiah(product.price)}</td>
              <td className="text-center">{product.stock || 0}</td>
              <td>{product.category?.title || product.category?.name || "-"}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(product)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
