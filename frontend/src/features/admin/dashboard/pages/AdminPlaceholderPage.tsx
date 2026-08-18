import { Link } from "react-router-dom";

type AdminPlaceholderPageProps = {
  title: string;
};

export default function AdminPlaceholderPage({ title }: AdminPlaceholderPageProps) {
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
            aria-label="Volver a pantalla principal"
            className="flex h-8 w-10 items-center justify-center"
          >
            <img className="h-4 w-4" src="/ep_arrow-left-bold.png" alt="" />
          </Link>
          <div className="text-sm">{title}</div>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 text-center text-sm text-gray-500">
          Pantalla pendiente de contenido.
        </div>
      </div>
    </div>
  );
}
