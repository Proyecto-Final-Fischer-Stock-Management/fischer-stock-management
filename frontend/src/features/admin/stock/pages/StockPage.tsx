import { useEffect, useState } from "react";
import { Button, ButtonLink } from "../../../../components/ui/Button";
import Modal from "../../../../components/ui/Modal";
import { useAuth } from "../../../../hooks/useAuth";
import type { ProductSummary } from "../../../../types/product";
import AdminListLayout from "../../components/AdminListLayout";
import { FilterButtons, SearchField } from "../../components/AdminListControls";
import ProductList from "../components/ProductList";
import { DeleteProduct, GetProducts } from "../services/productsApi";

const locations = ["Sector", "Sucursal", "Franquicia"] as const;

export default function StockPage() {
  const { token } = useAuth();
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<(typeof locations)[number]>("Sector");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [retry, setRetry] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<ProductSummary | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!token) return;
    let active = true;
    GetProducts(token).then((products) => { if (active) setProducts(products); })
      .catch((error) => { if (active) setLoadError(error instanceof Error ? error.message : "No se pudieron cargar los productos."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [token, retry]);

  const visibleProducts = products.filter((product) => String(product.fischer_code).includes(search.trim()));

  async function confirmDelete() {
    if (!selectedProduct || !token || deleting) return;
    setDeleting(true);
    setDeleteError("");
    try {
      await DeleteProduct(selectedProduct.fischer_code, token);
      setProducts(products.filter((product) => product.fischer_code !== selectedProduct.fischer_code));
      setNotice(`Se eliminó el producto ${selectedProduct.name}.`);
      setSelectedProduct(null);
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : "No se pudo eliminar el producto.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <AdminListLayout title="Catálogo de producto">
      <div className="flex flex-col gap-3">
        <SearchField label="Buscar por código de Fischer" value={search} onChange={setSearch} />
        <ButtonLink to="/admin/stock/create" fullWidth className="min-h-10 rounded-sm text-xs font-semibold">Crear producto</ButtonLink>
      </div>
      <section aria-label="Catálogo de productos" className="flex flex-col gap-5">
        <h2 className="px-1 text-xs font-normal">Productos</h2>
        <FilterButtons label="Ubicación de los productos" options={locations} selected={selectedLocation} onSelect={setSelectedLocation} />
        {loading ? <p role="status" className="text-xs">Cargando productos…</p> : loadError ? (
          <div role="alert" className="text-xs text-red-700"><p>{loadError}</p><Button className="mt-3" onClick={() => { setLoadError(""); setLoading(true); setRetry(retry + 1); }}>Reintentar</Button></div>
        ) : visibleProducts.length ? <ProductList products={visibleProducts} onDelete={(product) => { setDeleteError(""); setSelectedProduct(product); }} />
          : <p role="status" className="rounded-sm border border-gray-300 bg-white px-4 py-6 text-center text-xs text-gray-500">No se encontraron productos con ese código de Fischer.</p>}
      </section>
      <p role="status" className="text-xs text-gray-600">{notice}</p>
      {selectedProduct && (
        <Modal title="¿Eliminar producto?" danger busy={deleting} onClose={() => setSelectedProduct(null)}>
          <p className="mb-5 break-words">¿Deseás eliminar “{selectedProduct.name}” del catálogo?</p>
          <p className="mb-4 text-[11px] text-gray-600">También se eliminará su stock en las sucursales.</p>
          {deleteError && <p role="alert" className="mb-3 text-red-700">{deleteError}</p>}
          <Button fullWidth disabled={deleting} onClick={confirmDelete} className="rounded-sm text-xs font-semibold">{deleting ? "Eliminando…" : "Eliminar"}</Button>
          <Button autoFocus fullWidth variant="secondary" disabled={deleting} onClick={() => setSelectedProduct(null)} className="mt-3 rounded-sm border-red-500 text-xs font-semibold text-red-600">Cancelar</Button>
        </Modal>
      )}
    </AdminListLayout>
  );
}