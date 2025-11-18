import { useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

const ProductPages = () => {
  const [selected, setSelected] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const handleSuccess = () => {
    setSelected(null);
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Manajemen Product</h2>
      <ProductForm product={selected} onSuccess={handleSuccess} />
      <ProductList key={refresh} onEdit={setSelected} />
    </div>
  );
};
export default ProductPages;
