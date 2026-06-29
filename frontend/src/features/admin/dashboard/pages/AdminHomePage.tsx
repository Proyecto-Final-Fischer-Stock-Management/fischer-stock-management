import { Link, useNavigate } from "react-router-dom";
import { ButtonImage } from "../../../../components/ui/Button";
import ChInput from "../../../../components/ui/CheckInput";

export default function AdminHomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-200 px-4 py-6">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] w-full max-w-sm flex-col bg-[#F4F4F4]">
        <div className="bg-white px-4 pt-5 pb-3">
          <img
            className="h-16 w-28 object-contain"
            src="/Logo Fischer  sin fondo.png"
            alt="Fischer"/>
        </div>
        <div className="flex items-center border-y border-gray-200 bg-white px-1 py-2">
          <Link
            to="/admin"
            aria-label="Volver"
            className="flex h-8 w-10 items-center justify-center"
          >
          </Link>
          <div className="text-sm">Pantalla principal - repositor</div>
        </div>

        <div className="px-4 py-4">
        <div className="mt-2 flex flex-col gap-2">
          <div className="text-lg">¡Hola, Isabella!</div>
          <div className="text-sm">Último check-in</div>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <ChInput text="Sucursal:" contenido="Blablabla" imagen="/ubicacion.png" />
          <ChInput text="Cadena:" contenido="Blablabla" imagen="/ubicacion.png" />
          <ChInput text="Sector:" contenido="Blablabla" imagen="/ubicacion.png" />
        </div>

        <div className="mt-4 text-sm">Accesos rápidos</div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <ButtonImage
            imageSrc="/Group 29.png"
            altText="Buscar productos"
            onClick={() => navigate("/admin/catalog")}
          />
          <ButtonImage 
           imageSrc="/Group 28.png" 
           altText="Checkout"
           onClick={() => navigate("/repositor/check-in")}
           />
        </div>
        </div>
      </div>
    </div>
  );
}
