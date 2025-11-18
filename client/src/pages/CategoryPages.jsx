import { useState } from "react";
import CategoryList from "../components/CategoryList";
import CategoryForm from "../components/CategoryForm";

const CategoryPage = () => {
  const [editData, setEditData] = useState(null);
  const [reload, setReload] = useState(false);

  const handleEdit = (category) => {
    setEditData(category);
  };

  const handleSuccess = () => {
    setEditData(null); // reset form setelah tambah/edit
    setReload((prev) => !prev); // trigger reload list
  };

  return (
    <div className="container py-4">
      <CategoryForm category={editData} onSuccess={handleSuccess} />
      <CategoryList onEdit={handleEdit} reload={reload} />
    </div>
  );
};

export default CategoryPage;
