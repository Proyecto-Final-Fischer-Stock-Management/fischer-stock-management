import { useState } from "react";
import { Button } from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    login(
    {
      id: "1",
      firstName: "Isabella",
      lastName: "Demo",
      email: user,
      role: "admin",
    },
    "token-provisorio",
  );

  navigate("/admin");
};

  return (
    <div className="min-h-screen px-4 py-8 bg-[#F4F4F4]">
      <div className="pt-6 pb-10 text-center text-base ">
        Bienvenido Repositor
        <div className="flex justify-center">
          <img
            className="h-35 w-35 object-contain pt-8"
            src="/FOTO USUARIO.png"
            alt=""
          />
        </div>
      </div>
      <div className="text-center text-sm">
        <div className="pb-5">
          <label className="mb-3 block text-center">
            Ingrese email o usuario
          </label>
          <Input
            value={user}
            onChange={(event) => setUser(event.target.value)}
            placeholder="Email o usuario"
          />
        </div>

        <div className="pb-5">
          <label className="mb-3 block text-center">
            Ingrese contraseña
          </label>
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Contraseña"
          />
        </div>
       <div className="flex justify-center">
        <div className="flex flex-col items-start gap-2 pb-">
          <Button variant="link" size="sm" onClick={() => alert("Mal ahí")}>
            ¿Olvidaste tu contraseña?
          </Button>
          <Button variant="link" size="sm" onClick={() => alert("No.")}>
            Ayuda con el log-in
          </Button>
        </div>
        </div> 

        <Button
          variant="secondary"
          className="w-64"
          disabled={!user || !password}
          onClick={handleLogin}
        >
          Log-in
        </Button>
      </div>
    </div>
  );
}
