import HelpBtn from "../../../components/ui/Button.tsx";
import MyInput from "../../../components/ui/Input.tsx";
import LogBtn from "../../../components/ui/LogBtn.tsx";

export default function LoginPage() {
  return (
    <div className="bg-[#F4F4F4]">
      <div className="text-base pt-15 pb-10 text-center">
        Bienvenido Repositor
        <div className="flex justify-center pb-3">
          <img
            className="pt-8 w-35 h-35 object-contain"
            src="..\..\..\..\public\FOTO USUARIO.png"
          ></img>
        </div>
      </div>
      <div className="">
        <div className="text-center text-sm">
          <div className="text-left pl-16 pb-3">Ingrese email o usuario</div>
          <div className="pb-5">
            <MyInput></MyInput>
          </div>
          <div className="text-left pl-16 pb-3">Ingrese contraseña</div>
          <div className="pb-5">
            <MyInput></MyInput>
          </div>
          <div className="text-left pl-16 pb-12">
            <HelpBtn></HelpBtn>
          </div>
          <div>
            <LogBtn></LogBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
