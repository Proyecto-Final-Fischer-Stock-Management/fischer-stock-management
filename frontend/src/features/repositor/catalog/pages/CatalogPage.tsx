import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";

const products = ["Producto 1", "Producto 2", "Producto 3", "Producto 4", "Producto 5"];

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-gray-200 px-4 py-6">
      <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
        <img
          className="h-16 w-24 object-contain"
          src="/Logo Fischer  sin fondo.png"
          alt="Fischer"
        />

        <div className="flex items-center bg-white">
          <Link
            to="/admin"
            aria-label="Volver"
            className="flex h-8 w-10 items-center justify-center"
          >
            <img
              className="h-5 w-5"
              src="/ep_arrow-left-bold.png"
              alt=""
            />
          </Link>
          <div className="pl-3 text-sm">Catálogo - repositor</div>
        </div>

        <Input
          fullWidth
          className="bg-white"
          placeholder="Buscar por código"
        />

        <Button variant="primary" fullWidth>
          Escanear QR / código
        </Button>

        <div className="bg-white p-4 text-sm shadow-sm">
          <div className="mb-3 font-medium">Productos</div>
          <div className="flex flex-col gap-2">
            {products.map((product) => (
              <div key={product}>{product}</div>
            ))}
          </div>
        </div>

        <Button variant="secondary" fullWidth>
          Ver carrito
        </Button>
      </div>
    </div>
  );
}
