import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../../../components/ui/Button";
import { useAuth } from "../../../../hooks/useAuth";
import type { Product } from "../../../../types/product";
import AdminListLayout from "../../components/AdminListLayout";
import ProductForm from "../components/ProductForm";
import { GetProduct } from "../services/productsApi";

export default function EditProductPage() {
  const { productId } = useParams();
  const { token } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    if (!productId || !token) return;
    let active = true;
    GetProduct(productId, token).then((product) => { if (active) setProduct(product); })
      .catch((error) => { if (active) setError(error instanceof Error ? error.message : "No se pudo cargar el producto."); });
    return () => { active = false; };
  }, [productId, token, retry]);

  return (
    <AdminListLayout title="Modificar producto" backTo="/admin/stock">
      {error ? <div role="alert" className="text-sm text-red-700"><p>{error}</p><Button onClick={() => { setError(""); setRetry(retry + 1); }} className="mt-3">Reintentar</Button></div>
        : product && product.fischer_code === Number(productId) ? <ProductForm key={product.fischer_code} product={product} /> : <p role="status" className="text-sm">Cargando producto…</p>}
    </AdminListLayout>
  );
}