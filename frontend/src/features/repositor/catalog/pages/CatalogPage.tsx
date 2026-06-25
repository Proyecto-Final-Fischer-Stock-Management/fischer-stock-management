import { Link } from "react-router-dom";
import { ButtonImage, Button } from "../../../../components/ui/Button";
import ChInput from "../../../../components/ui/CheckInput";
import Input from "../../../../components/ui/Input";

export default function CatalogPage() {
    return (
        <div className="min-h-screen px-4 py-8 bg-gray-200 text-center">
        <div className="object-contain w-30 h-20 pt-3 pl-4">
        <img src="../../../public/Logo Fischer  sin fondo.png"></img>
        </div>
        <div> 
            <div className="flex flex-row bg-white">
                
             <Link
          to="/admin"
          aria-label="Volver"
          className="flex h-8 w-10 items-center justify-center"
        >
          <img className="h-5 w-5" src="/ep_arrow-left-bold.png" alt="volver a la pantala principal" />
        </Link>
        <div className="pl-3">Pantalla principal - repositor</div>
      </div>
      <div>
      <Input className="bg-white">
      </Input>
      </div>
      <div className=" bg-white mt-3 mx-115">
      <ChInput
      text= "Lupa"
      contenido= "Buscar por código" ></ChInput>
      </div>
      <div className="pt-4">
      <Button
          variant="primary"
          className="w-64"
        >
          Escanear QR / código
        </Button>
        </div>
        <div className="pr-300 pt-2">
            Productos
            Producto1
            Producto2
            Producto3
            Producto4
            Producto5
        </div>
        <Button
        variant="secondary"
        className="w-64"
        >
            Ver carrito
        </Button>
        </div>
        </div>
    )
}