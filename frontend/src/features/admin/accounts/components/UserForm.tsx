import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonLink } from "../../../../components/ui/Button";
import Modal from "../../../../components/ui/Modal";
import { useAuth } from "../../../../hooks/useAuth";
import type { Account, AccountRole, UserFormData } from "../../../../types/user";
import { CreateUser, UpdateUser } from "../services/usersApi";

const inputClass = "mt-1 w-full rounded-sm border border-gray-300 bg-white px-3 py-2 text-xs focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500";

function PasswordField({ label, name, value, onChange, required, editing }: {
  label: string; name: string; value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required: boolean; editing: boolean;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <label className="block text-xs">
      {label}
      <span className="relative block">
        <input name={name} type={visible ? "text" : "password"} value={value} onChange={onChange} required={required} minLength={6} maxLength={72} autoComplete="new-password" placeholder={editing ? "Dejar vacía para conservar la actual" : "Mínimo 6 caracteres"} className={`${inputClass} pr-10`} />
        <button type="button" aria-label={`${visible ? "Ocultar" : "Mostrar"} ${label.toLowerCase()}`} aria-pressed={visible} onClick={() => setVisible(!visible)} className="absolute right-1 bottom-0 flex h-9 w-9 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-red-600">
          <img src={visible ? "/ojo cerrado.png" : "/ojo.png"} alt="" className="h-3 w-4 object-contain" />
        </button>
      </span>
    </label>
  );
}

export default function UserForm({ account }: { account?: Account }) {
  const editing = Boolean(account);
  const { token } = useAuth();
  const navigate = useNavigate();
  // El backend guarda un solo nombre completo; al enviar unimos los dos campos.
  const nameParts = account?.complete_name.trim().split(/\s+/) ?? [];
  const [values, setValues] = useState({
    firstName: nameParts[0] ?? "",
    lastName: nameParts.slice(1).join(" "),
    email: account?.email ?? "",
    role: account?.role ?? "",
    password: "",
    confirmPassword: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setValues({ ...values, [event.target.name]: event.target.value });
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving || !token) return;
    setError("");
    if (!values.firstName.trim() || !values.lastName.trim()) {
      setError("Completá el nombre y el apellido.");
      return;
    }
    if (values.password !== values.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (new TextEncoder().encode(values.password).length > 72) {
      setError("La contraseña es demasiado larga. Usá menos caracteres.");
      return;
    }
    // 1. Preparamos exactamente los campos que recibe el backend.
    const data: UserFormData = {
      completeName: `${values.firstName.trim()} ${values.lastName.trim()}`,
      email: values.email.trim(),
      role: values.role as AccountRole,
    };
    if (values.password) data.password = values.password;

    setSaving(true);
    try {
      // 2. Esperamos la respuesta antes de mostrar el mensaje de éxito.
      if (account) await UpdateUser(account.id, data, token);
      else await CreateUser(data, token);
      setValues({ ...values, password: "", confirmPassword: "" });
      setSuccess(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "No se pudo guardar el usuario.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="rounded-sm border border-gray-300 bg-white px-4 py-5 shadow-xs">
        <fieldset disabled={saving || success} className="flex min-w-0 flex-col gap-4">
          <legend className="mb-4 text-xs">Datos personales</legend>
          <label className="block text-xs">Nombre
            <input name="firstName" value={values.firstName} onChange={handleChange} required autoComplete="given-name" placeholder="Ej: Juana María" className={inputClass} />
          </label>
          <label className="block text-xs">Apellido
            <input name="lastName" value={values.lastName} onChange={handleChange} required autoComplete="family-name" placeholder="Ej: Perez" className={inputClass} />
          </label>
          <label className="block text-xs">Email
            <input name="email" type="email" value={values.email} onChange={handleChange} required autoComplete="email" placeholder="Ej: juanaperez@fischer.com" className={inputClass} />
          </label>
          <label className="block text-xs">Rol
            <select aria-label="Rol" name="role" value={values.role} onChange={handleChange} required className={inputClass}>
              <option value="">Seleccionar un rol</option>
              <option value="Administrator">Administrador</option>
              <option value="Stockman">Repositor</option>
            </select>
          </label>
          <PasswordField label={editing ? "Nueva contraseña" : "Contraseña"} name="password" value={values.password} onChange={handleChange} required={!editing} editing={editing} />
          <PasswordField label="Confirmar contraseña" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} required={!editing || Boolean(values.password)} editing={editing} />
          {error && <p role="alert" className="text-xs text-red-700">{error}</p>}
          <Button type="submit" fullWidth className="mt-2 min-h-11 justify-between rounded-sm bg-[#E60000] text-xs font-semibold">
            <span className="flex-1">{saving ? "Guardando…" : editing ? "Modificar usuario" : "Crear usuario"}</span><span aria-hidden="true">→</span>
          </Button>
        </fieldset>
        <ButtonLink to="/admin/accounts" fullWidth className="mt-4 min-h-11 justify-between rounded-sm bg-[#E60000] text-xs font-semibold"><span aria-hidden="true">←</span><span className="flex-1 text-center">Volver atrás</span></ButtonLink>
      </form>
      {success && (
        <Modal title={editing ? "Usuario modificado" : "Usuario creado"} onClose={() => navigate("/admin/accounts")}>
          <p className="mb-5">Los cambios se han guardado correctamente.</p>
          <Button fullWidth onClick={() => navigate("/admin/accounts")} className="rounded-sm text-xs font-semibold">Aceptar</Button>
        </Modal>
      )}
    </>
  );
}