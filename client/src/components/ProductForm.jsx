import { useState, useEffect } from "react";
import { getCategories, createProducts, updateProducts } from "../service/api";

const ProductForm = ({ product, onSuccess }) => {
  const [formData, setFormData] = useState({
    nama: "",
    price: "",
    stock: "",
    CategoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load data saat edit
  useEffect(() => {
    if (product) {
      setFormData({
        nama: product.nama || "",
        price: product.price || "",
        stock: product.stock || "",
        CategoryId: product.CategoryId || product.categoryId || "",
      });
    }
  }, [product]);

  // Load categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        nama: formData.nama, // ✅ Kirim sebagai 'nama'
        price: parseInt(formData.price),
        stock: parseInt(formData.stock),
        CategoryId: parseInt(formData.CategoryId),
      };

      console.log("Data yang dikirim:", data); // Debug

      if (product) {
        await updateProducts(product.id, data);
        alert("Produk berhasil diupdate!");
      } else {
        await createProducts(data);
        alert("Produk berhasil ditambahkan!");
      }

      // Reset form
      setFormData({
        nama: "",
        price: "",
        stock: "",
        CategoryId: "",
      });

      onSuccess();
    } catch (error) {
      alert("Gagal menyimpan data: " + (error.response?.data?.message || error.message));
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      nama: "",
      price: "",
      stock: "",
      CategoryId: "",
    });
    onSuccess();
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{product ? "Edit" : "Tambah"} Produk</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nama</label>
            <input
              type="text"
              className="form-control"
              value={formData.nama} // ✅ FIXED: nama bukan name
              onChange={handleChange}
              name="nama" // ✅ FIXED: nama bukan name
              placeholder="Masukkan nama produk"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Stok</label>
            <input type="number" className="form-control" value={formData.stock} onChange={handleChange} name="stock" placeholder="Masukkan jumlah stok" min="0" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Harga</label>
            <input type="number" className="form-control" value={formData.price} onChange={handleChange} name="price" placeholder="Masukkan harga produk" min="0" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Kategori</label>
            <select name="CategoryId" className="form-select" value={formData.CategoryId} onChange={handleChange} required>
              <option value="">Pilih Kategori</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title || c.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>

          {product && (
            <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>
              Batal
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
