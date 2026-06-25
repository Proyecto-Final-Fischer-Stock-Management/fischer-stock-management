import { Link } from "react-router-dom";
import ChInput from "../../../../components/ui/CheckInput";
import { ButtonImage, ButtonLink } from "../../../../components/ui/Button";

export default function AdminHomePage() {
  return (
    <div className="min-h-screen px-4 py-8 bg-gray-200">
      <div>
      <Link
        to="/admin"
        aria-label="Ir a pantalla principal"
        className="block h-20 w-30 object-contain pt-3 pl-4"
      >
        <img src="/Logo Fischer  sin fondo.png" alt="" />
      </Link>
      <div className="">
      <div className="flex flex-row bg-white">
        <Link
          to="/admin"
          aria-label="Volver"
          className="flex h-8 w-10 items-center justify-center"
        >
          <img className="h-5 w-5" src="/ep_arrow-left-bold.png" alt="" />
        </Link>
        <div className="pl-3">Pantalla principal - repositor</div>
      </div>

      <div className="flex flex-col">
        <div className="pt-4 pl-4 text-lg">¡Hola, Isabella!</div>
        <div className="pt-3 pl-4 text-sm">Ultimo check-in</div>
      </div>
      <div className="">
      <div className="pt-3 pl-10">
        <ChInput text="Sucursal:" contenido="Blablabla" imagen="/ubicacion.png" />
        <ChInput text="Cadena:" contenido="Blablabla" imagen="/ubicacion.png" />
        <ChInput text="Sector:" contenido="Blablabla" imagen="/ubicacion.png" />
      </div>
      </div>

      <div className="pt-3 pl-4 text-sm">Accesos rápidos</div>
      <div className="pt-3 pl-4">
        <div className="flex flex-row pt-2">
          <div className="w-30 h-30">
          <ButtonImage
          imageSrc="../../../public/Group 28.png"
          altText="Buscar productos"
          />
          </div>
          <div className="w-30 h-30">
          <ButtonImage
          imageSrc="../../../public/Group 29.png"
          altText="Checkout"
          />
          </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}
