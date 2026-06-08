import ChInput from "../../../../components/ui/CheckInput.tsx";

export default function AdminHomePage() {
  return (
    <div className="min-w-screen min-h-screen bg-gray-200">
      <div className="object-contain w-30 h-20 pt-3 pl-4">
        <img src="../../../public/Logo Fischer  sin fondo.png"></img>
      </div>

      <div className="flex flex-row bg-white">
        <div className="pl-4 pt-1 w-8 h-5">
          <img src="../../../public/ep_arrow-left-bold.png"></img>
        </div>
        <div className="pl-3">Pantalla principal - repositor</div>
      </div>

      <div className="flex flex-col">
        <div className="text-lg pt-4 pl-4">¡Hola, Isabella!</div>
        <div className="text-sm pt-3 pl-4"> Ultimo check-in</div>
      </div>
      <div className="pl-10">
        <ChInput
          text="hola"
          contenido="Blablabla"
          imagen="../../../public/ubicacion.png"
        ></ChInput>
      </div>
    </div>
  );
}
