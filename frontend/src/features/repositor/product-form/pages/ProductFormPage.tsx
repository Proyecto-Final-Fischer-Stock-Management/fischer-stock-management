import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, ButtonLink } from "../../../../components/ui/Button";
import { useAuth } from "../../../../hooks/useAuth.ts";
import Input from "../../../../components/ui/Input";
import { addProductToCart } from "../../order/cartStorage";

export default function ProductFormPage() {
  const { productId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [hasStockBreak, setHasStockBreak] = useState<"yes" | "no" | null>(null);
  const [orderBoxes, setOrderBoxes] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const [wasAddedToCart, setWasAddedToCart] = useState(false);
  const isRepositorRoute = pathname.startsWith("/repositor");
  const catalogPath = isRepositorRoute ? "/repositor/catalog" : "/admin/catalog";
  const orderPath = isRepositorRoute ? "/repositor/order" : "/admin/order";
  const { token } = useAuth();
  const product = 
  const boxesToOrder = Number.parseInt(orderBoxes, 10);

  function getBoxesToOrder() {
    return Number.isNaN(boxesToOrder) || boxesToOrder < 1 ? product.boxes : boxesToOrder;
  }

  function handleSubmitReport() {
    if (!wasAddedToCart) {
      addProductToCart(product, getBoxesToOrder());
    }

    navigate(orderPath);
  }

  function handleAddToCart() {
    addProductToCart(product, getBoxesToOrder());
    setCartMessage("Producto sumado al carrito.");
    setWasAddedToCart(true);
  }

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
            to={catalogPath}
            aria-label="Volver al catálogo"
            className="flex h-8 w-10 items-center justify-center"
          >
            <img className="h-4 w-4" src="/ep_arrow-left-bold.png" alt="" />
          </Link>
          <div className="text-sm">Formulario de relevamiento</div>
        </div>

        <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4 text-sm">
          <section>
            <h2 className="mb-3 font-medium">Información del producto</h2>
            <div className="flex gap-3 border border-gray-300 bg-white p-3 shadow-sm">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white">
                <img
                  src={product.imageSrc}
                  alt={product.name}
                  className="max-h-16 max-w-16 object-contain"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-medium">{product.name}</div>
                  <div className="flex h-7 w-20 shrink-0 items-center justify-between border border-gray-300 bg-white px-2 text-xs">
                    <span>{product.units}</span>
                    <span className="text-[10px] text-gray-500">Unid.</span>
                  </div>
                </div>
                <div className="mt-3 leading-tight">
                  <div>Código: {product.code}</div>
                  <div>Categoría: {product.category}</div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 font-medium">Datos de relevamiento</h2>
            <div className="border border-gray-300 bg-white p-3 shadow-sm">
              <label className="block">
                <span className="mb-2 block">Stock actual en góndola</span>
                <div className="flex">
                  <Input
                    className="min-w-0 flex-1 border-r-0 text-left"
                    placeholder="Ingrese stock actual"
                  />
                  <div className="flex w-16 items-center justify-center border border-gray-300 bg-gray-50 text-xs">
                    Cajas
                  </div>
                </div>
              </label>

              <div className="mt-3">
                <div className="mb-2">¿Hay quiebre de stock?</div>
                <div className="grid grid-cols-2 border border-gray-300">
                  <button
                    type="button"
                    onClick={() => setHasStockBreak("yes")}
                    className={[
                      "h-8 border-r border-gray-300 text-sm",
                      hasStockBreak === "yes" ? "bg-blue-600 text-white" : "bg-white",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    Sí
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasStockBreak("no")}
                    className={[
                      "h-8 text-sm",
                      hasStockBreak === "no" ? "bg-blue-600 text-white" : "bg-white",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    No
                  </button>
                </div>
              </div>

              <label className="mt-3 block">
                <span className="mb-2 block">Cantidad a pedir (Mínimo)</span>
                <div className="flex">
                  <Input
                    className="min-w-0 flex-1 border-r-0 text-left"
                    placeholder="Ingrese cantidad"
                    min={1}
                    type="number"
                    value={orderBoxes}
                    onChange={(event) => {
                      setOrderBoxes(event.target.value);
                      setCartMessage("");
                      setWasAddedToCart(false);
                    }}
                  />
                  <div className="flex w-16 items-center justify-center border border-gray-300 bg-gray-50 text-xs">
                    Cajas
                  </div>
                </div>
              </label>

              <label className="mt-3 block">
                <span className="mb-2 block">Sugerencias / observaciones</span>
                <textarea className="h-12 w-full resize-none border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </label>

              <Button
                variant="secondary"
                fullWidth
                className="mt-5"
                onClick={handleAddToCart}
              >
                <span className="mr-auto">Sumar al carrito</span>
                <span>›</span>
              </Button>
              {cartMessage ? (
                <div className="mt-2 text-xs text-blue-700">{cartMessage}</div>
              ) : null}

              <Button
                variant="primary"
                fullWidth
                className="mt-3"
                onClick={handleSubmitReport}
              >
                Enviar formulario <span className="ml-auto">›</span>
              </Button>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <ButtonLink to={catalogPath} variant="secondary" fullWidth>
                  <span className="mr-auto">‹</span> Catálogo
                </ButtonLink>
                <ButtonLink to={orderPath} variant="secondary" fullWidth>
                  Ver Carrito <span className="ml-auto">›</span>
                </ButtonLink>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
