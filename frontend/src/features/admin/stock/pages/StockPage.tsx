import { useState } from "react";
import { ButtonLink } from "../../../../components/ui/Button";
import AdminListLayout from "../../components/AdminListLayout";
import { FilterButtons, SearchField } from "../../components/AdminListControls";
import { demoProducts, type DemoProduct } from "../../data/demoData";
import ProductList from "../components/ProductList";

const locations = ["Sector", "Sucursal", "Franquicia"] as const;

export default function StockPage() {
  const [products, setProducts] = useState(demoProducts);
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<(typeof locations)[number]>("Sector");
  const [notice, setNotice] = useState("");
  const query = search.trim();
  const visibleProducts = products.filter((product) => product.fischerCode.includes(query));

  function deleteProduct(product: DemoProduct) {
    if (!window.confirm(`¿Eliminar el producto de ejemplo "${product.name}"?`)) return;
    setProducts((current) => current.filter((item) => item.id !== product.id));
    setNotice(`Se eliminó el producto de ejemplo ${product.name} de esta vista.`);
  }

  return (
    <AdminListLayout title="Catálogo de producto">
      <div className="flex flex-col gap-3">
        <SearchField label="Buscar por código de Fischer" value={search} onChange={setSearch} />
        <ButtonLink to="/admin/stock/create" fullWidth className="min-h-10 rounded-sm text-xs font-semibold">
          Crear producto
        </ButtonLink>
      </div>
      <section aria-label="Catálogo de productos" className="flex flex-col gap-5">
        <h2 className="px-1 text-xs font-normal">Productos</h2>
        <FilterButtons label="Ubicación de los productos" options={locations} selected={selectedLocation} onSelect={setSelectedLocation} />
        {visibleProducts.length > 0 ? (
          <ProductList products={visibleProducts} onDelete={deleteProduct} />
        ) : (
          <p role="status" className="rounded-sm border border-gray-300 bg-white px-4 py-6 text-center text-xs text-gray-500">
            {query ? "No se encontraron productos con ese código de Fischer." : "No hay productos para mostrar."}
          </p>
        )}
      </section>
      <p role="status" className="text-xs text-gray-600">{notice}</p>
      <p className="mt-auto text-[11px] text-gray-500">Datos de ejemplo. Los cambios de esta vista son temporales.</p>
    </AdminListLayout>
  );
}
