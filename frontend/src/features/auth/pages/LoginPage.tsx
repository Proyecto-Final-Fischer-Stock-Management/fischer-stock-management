import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { useAuth } from "../../../hooks/useAuth";
import { loginRequest } from "../services/authApi";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated, user: authUser } = useAuth();
  const [emailOrUser, setEmailOrUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && authUser?.role === "admin") {
      navigate("/admin", { replace: true });
    }
  }, [authUser?.role, isAuthenticated, navigate]);

  const handleLogin = async () => {
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const session = await loginRequest({
        email: emailOrUser,
        password,
      });

      login(session.user, session.token);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "No se pudo iniciar sesion",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 px-4 py-6">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] w-full max-w-sm flex-col bg-[#F4F4F4] px-4 py-8">
        <div className="shrink-0 text-center text-base">
          Bienvenido Repositor
        </div>

        <img
          className="mx-auto mt-8 h-35 w-35 shrink-0 object-contain"
          src="/FOTO USUARIO.png"
          alt=""
        />

        <div className="mt-8 border border-gray-300 bg-white px-4 py-5 text-sm shadow-sm">
          <label className="block">
            <span className="mb-3 block">Ingrese email o usuario</span>
            <div className="relative">
              <img
                className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 object-contain"
                src="/persona anon.png"
                alt=""
              />
              <Input
                fullWidth
                value={emailOrUser}
                onChange={(event) => {
                  setEmailOrUser(event.target.value);
                  setErrorMessage("");
                }}
                placeholder="Usuario@fischer.com"
                className="pl-10 text-left"
              />
            </div>
          </label>

          <label className="mt-4 block">
            <span className="mb-3 block">Ingrese contraseña</span>
            <div className="relative">
              <img
                className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 object-contain"
                src="/candado.png"
                alt=""
              />
              <Input
                fullWidth
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setErrorMessage("");
                }}
                placeholder="Contraseña"
                className="pr-10 pl-10 text-left"
              />
              <button
                type="button"
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
                onClick={() => setShowPassword((currentValue) => !currentValue)}
                className="absolute top-1/2 right-3 flex h-6 w-6 -translate-y-1/2 items-center justify-center"
              >
                <img
                  className="h-4 w-4 object-contain"
                  src={showPassword ? "/ojo.png" : "/ojo cerrado.png"}
                  alt=""
                />
              </button>
            </div>
          </label>

          {errorMessage ? (
            <div className="mt-4 border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {errorMessage}
            </div>
          ) : null}

          <div className="mt-4 flex flex-col items-start gap-2">
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
          fullWidth
          className="mt-4"
          disabled={!emailOrUser || !password || isSubmitting}
          onClick={handleLogin}
        >
          {isSubmitting ? "Ingresando..." : "Log in"}
        </Button>
      </div>
    </div>
  );
}
