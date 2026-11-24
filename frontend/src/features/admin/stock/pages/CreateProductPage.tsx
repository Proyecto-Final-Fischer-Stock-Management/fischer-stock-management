import AdminListLayout from "../../components/AdminListLayout";
import ProductForm from "../components/ProductForm";

export default function CreateProductPage() {
  return (
    <AdminListLayout title="Crear producto" backTo="/admin/stock">
      <ProductForm />
    </AdminListLayout>
  );
}