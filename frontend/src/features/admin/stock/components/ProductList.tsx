import { RowActions } from "../../components/AdminListControls";
import type { DemoProduct } from "../../data/demoData";

type ProductListProps = {
  products: DemoProduct[];
  onDelete: (product: DemoProduct) => void;
};

export default function ProductList({ products, onDelete }: ProductListProps) {
  return (
    <ul aria-label="Productos" className="flex flex-col gap-3">
      {products.map((product) => (
        <li key={product.id} className="flex min-h-20 items-center gap-3 rounded-sm border border-gray-300 bg-white p-3 shadow-xs">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-gray-300 bg-white p-1">
            <img src={product.image} alt={product.name} className="h-full w-full object-contain" loading="lazy" />
          </div>
          <div className="min-w-0 flex-1 text-xs">
            <p className="break-words font-medium">{product.name}</p>
            <p className="mt-1 break-all">Código: {product.fischerCode}</p>
          </div>
          <RowActions editPath={`/admin/stock/${product.id}/edit`} name={product.name} onDelete={() => onDelete(product)} />
        </li>
      ))}
    </ul>
  );
}
