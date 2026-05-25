import HelpBtn from "../../../components/ui/Button.tsx";
import Button from "../../../components/ui/Button.tsx";
import MyInput from "../../../components/ui/Input.tsx";
import LogBtn from "../../../components/ui/LogBtn.tsx";

export default function LoginPage() {
  return (
    <div className="bg-[#F4F4F4]">
      <div className="text-xs pt-10 pb-8 text-center">
        Bienvenido Repositor
        <div className="flex justify-center pb-1">
          <img className="pt-8 w-25 h-25 object-contain" src="..\..\..\..\public\FOTO USUARIO.png"></img>
        </div>
      </div>
      <div className="text-center text-[10px]">
      <div className="text-left pl-11 pb-3">Ingrese email o usuario</div>
      <div className="pb-3"><MyInput></MyInput></div>
      <div className="text-left pl-11 pb-3">Ingrese contraseña</div>
      <div className="pb-2"><MyInput></MyInput></div>
      <div className="text-left pl-11 pb-5"><HelpBtn></HelpBtn></div>
      <div>
      <LogBtn></LogBtn>
      </div>
      </div>
    </div>
  );
}
