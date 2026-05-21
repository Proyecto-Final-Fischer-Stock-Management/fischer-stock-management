import Button from "../../../components/ui/Button.tsx";
import MyInput from "../../../components/ui/Input.tsx";

export default function LoginPage() {
  return (
    <div >
      <div className="text-4xl text-center">
        Welcome
        <div className="text-lg pb-10">
          Create Account
        </div>
        <div className="flex justify-center pb-10">
          <img src="..\..\..\..\public\Imagen usuario.png"></img>
        </div>
      </div>
      <div className="text-center">
      <Button></Button>
      <MyInput></MyInput>
      </div>
    </div>
  );
}
