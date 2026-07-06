export default function CheckInPage() {
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
                </div>
             </div>
        </div>
    )
    }