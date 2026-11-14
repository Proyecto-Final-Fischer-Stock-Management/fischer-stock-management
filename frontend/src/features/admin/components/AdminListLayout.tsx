import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type AdminListLayoutProps = {
  title: string;
  children: ReactNode;
};

export default function AdminListLayout({ title, children }: AdminListLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-200 sm:px-4 sm:py-6">
      <div className="mx-auto flex min-h-screen w-full max-w-sm flex-col bg-[#F4F4F4] sm:min-h-[calc(100vh-48px)]">
        <header className="bg-[#E60000] px-5 pt-10 pb-5">
          <img className="h-6 w-18 object-contain" src="/fischerLog.png" alt="Fischer" />
        </header>
        <nav aria-label="Navegación de administración" className="flex items-center border-y border-gray-200 bg-white px-1 py-1">
          <Link
            to="/admin"
            aria-label="Volver a pantalla principal"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-red-600"
          >
            <img className="h-4 w-4" src="/ep_arrow-left-bold.png" alt="" />
          </Link>
          <h1 className="pr-3 text-xs font-normal">{title} - Admin</h1>
        </nav>
        <main className="flex flex-1 flex-col gap-5 px-4 pt-6 pb-8">{children}</main>
      </div>
    </div>
  );
}
