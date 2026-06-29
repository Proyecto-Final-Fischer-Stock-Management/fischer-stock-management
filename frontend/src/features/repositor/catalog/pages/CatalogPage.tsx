import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";

type CatalogProduct = {
  id: string;
  name: string;
  code: string;
  boxes: number;
  imageSrc: string;
};

const products: CatalogProduct[] = [
  {
    id: "1",
    name: "Tarugo",
    code: "Fhgkjxndnwaqvdd",
    boxes: 2,
    imageSrc: "/Logo Fischer  sin fondo.png",
  },
  {
    id: "2",
    name: "Tarugo",
    code: "Fhgkjxndnwaqvdd",
    boxes: 3,
    imageSrc: "/Logo Fischer  sin fondo.png",
  },
  {
    id: "3",
    name: "Tarugo",
    code: "Fhgkjxndnwaqvdd",
    boxes: 5,
    imageSrc: "/Logo Fischer  sin fondo.png",
  },
  {
    id: "4",
    name: "Tarugo",
    code: "Fhgkjxndnwaqvdd",
    boxes: 5,
    imageSrc: "/Logo Fischer  sin fondo.png",
  },
  {
    id: "5",
    name: "Tarugo",
    code: "Fhgkjxndnwaqvdd",
    boxes: 1,
    imageSrc: "/Logo Fischer  sin fondo.png",
  },
];

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-gray-200 px-4 py-6">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] w-full max-w-sm flex-col bg-[#F4F4F4]">
        <div className="bg-white px-4 pt-5 pb-3">
          <img
            className="h-16 w-28 object-contain"
            src="/Logo Fischer  sin fondo.png"
            alt="Fischer"
          />
        </div>

        <div className="flex items-center border-y border-gray-200 bg-white px-1 py-2">
          <Link
            to="/admin"
            aria-label="Volver"
            className="flex h-8 w-10 items-center justify-center"
          >
            <img className="h-4 w-4" src="/ep_arrow-left-bold.png" alt="" />
          </Link>
          <div className="text-sm">Catálogo de producto</div>
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-hidden px-4 py-4">
          <div className="relative">
            <span className="pointer-events-none absolute top-1/2 left-3 h-3 w-3 -translate-y-1/2">
            <img className="w-4 h-4" src="/lupa.png" alt="Lupa"/>
            </span>
            <Input
              fullWidth
              className="bg-white pl-9 text-left text-xs"
              placeholder="Buscar por código de Fischer"
            />
          </div>

          <Button variant="primary" fullWidth>
            Escanear QR / Código
          </Button>

          <div className="text-sm font-medium">Productos</div>

          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1">
            {products.map((product) => (
              <button
                key={product.id}
                type="button"
                className="flex w-full items-center gap-3 border border-gray-300 bg-white p-2 text-left shadow-sm"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-gray-200 bg-white">
                  <img
                    src={product.imageSrc}
                    alt={product.name}
                    className="max-h-12 max-w-12 object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1 text-sm">
                  <div className="flex items-center gap-2">
                    <span>{product.name}</span>
                    <span className="bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                      {product.boxes} Cajas
                    </span>
                  </div>
                  <div className="mt-2 truncate">Código: {product.code}</div>
                </div>

                <span className="px-1 text-xl leading-none">›</span>
              </button>
            ))}
          </div>

          <Button variant="primary" fullWidth>
            Ver carrito <span className="ml-auto">›</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
