import { useLocation } from "react-router-dom";
import { ButtonLink } from "../../../../components/ui/Button";

export default function CheckInPage() {
    const { pathname } = useLocation();
    const isRepositorRoute = pathname.startsWith("/repositor");
    const orderPath = isRepositorRoute ? "/repositor/order" : "/admin/order";
    return (
        <div className="min-h-screen bg-gray-200 px-4 py-6">
            <div className="mx-auto flex min-h-[calc(100vh-48px)] w-full max-w-sm flex-col bg-[#F4F4F4] px-4 py-8">
                <div className="text-center ">
                    <div className="text-2xl mt-4">
                        Check In
                    </div>
                    <div className="text-sm mt-3">
                        Selecciona dónde vas a trabajar
                    </div>
                    <div className="flex items-center px-1 py-2 mt-3">
                    <img
                    className="h-6 w-6 flex"
                    src="/lista.png"
                    />
                    <div className="ml-3 text-sm">
                        Información de la visita
                    </div>
                    </div>
                    <ButtonLink to={orderPath} variant="primary" fullWidth>
                        Iniciar visita <span className="ml-auto">›</span>
                    </ButtonLink>
                </div>
             </div>
        </div>
    )
    }