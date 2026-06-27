import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { useAuth } from "../../../hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated, user: authUser } = useAuth();
  const [emailOrUser, setEmailOrUser] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated && authUser?.role === "admin") {
      navigate("/admin", { replace: true });
    }
  }, [authUser?.role, isAuthenticated, navigate]);

  const handleLogin = () => {
    login(
      {
        id: "1",
        firstName: "Isabella",
        lastName: "Demo",
        email: emailOrUser,
        role: "admin",
      },
      "token-provisorio",
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] px-4 py-8">
      <div className="mx-auto flex w-full max-w-sm flex-col gap-5 text-sm">
        <div className="text-center text-base">Bienvenido Repositor</div>

        <img
          className="mx-auto h-35 w-35 object-contain"
          src="/FOTO USUARIO.png"
          alt=""
        />

        <label>
          <span className="mb-2 block">Ingrese email o usuario</span>
          <Input
            fullWidth
            value={emailOrUser}
            onChange={(event) => setEmailOrUser(event.target.value)}
            placeholder="Email o usuario"
          />
        </label>

        <label>
          <span className="mb-2 block">Ingrese contraseña</span>
          <Input
            fullWidth
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Contraseña"
          />
        </label>

        <div className="flex flex-col items-start gap-2">
          <Button variant="link" size="sm" onClick={() => alert("Mal ahí")}>
            ¿Olvidaste tu contraseña?
          </Button>
          <Button variant="link" size="sm" onClick={() => alert("No.")}>
            Ayuda con el log-in
          </Button>
        </div>

        <Button
          variant="secondary"
          fullWidth
          disabled={!emailOrUser || !password}
          onClick={handleLogin}
        >
          Log-in
        </Button>
      </div>
    </div>
  );
}
