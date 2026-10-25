import { useState } from "react";
import { ButtonLink } from "../../../../components/ui/Button";
import AdminListLayout from "../../components/AdminListLayout";
import { FilterButtons, SearchField, UserIcon } from "../../components/AdminListControls";
import { demoAccounts, normalizeSearch, type DemoAccount } from "../../data/demoData";
import UserList from "../components/UserList";

const roles = ["Administrador", "Repositor"] as const;

export default function AccountsPage() {
  const [users, setUsers] = useState(demoAccounts);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<(typeof roles)[number]>("Administrador");
  const [notice, setNotice] = useState("");
  const query = normalizeSearch(search);
  const visibleUsers = users.filter((user) => normalizeSearch(user.name).includes(query));

  function deleteUser(user: DemoAccount) {
    if (!window.confirm(`¿Eliminar la cuenta de ejemplo de ${user.name}?`)) return;
    setUsers((current) => current.filter((item) => item.id !== user.id));
    setNotice(`Se eliminó la cuenta de ejemplo de ${user.name} de esta vista.`);
  }

  return (
    <AdminListLayout title="Cuentas de usuarios">
      <div className="flex flex-col gap-3">
        <SearchField label="Buscar cuenta por nombre o apellido" value={search} onChange={setSearch} />
        <ButtonLink to="/admin/accounts/create" fullWidth className="min-h-11 gap-3 rounded-sm text-xs font-semibold">
          <UserIcon add />
          Crear usuario
        </ButtonLink>
      </div>
      <section aria-label="Filtros de usuarios" className="flex flex-col gap-3">
        <p className="text-xs">Filtrar por:</p>
        <FilterButtons label="Rol del usuario" options={roles} selected={selectedRole} onSelect={setSelectedRole} />
      </section>
      <p className="text-xs" role="status">
        Total de cuentas: <span className="text-red-600">{users.length}</span>
        {query && <span className="ml-2 text-gray-500">Resultados: {visibleUsers.length}</span>}
      </p>
      <div>
        {visibleUsers.length > 0 ? (
          <UserList users={visibleUsers} onDelete={deleteUser} />
        ) : (
          <p className="rounded-sm border border-gray-300 bg-white px-4 py-6 text-center text-xs text-gray-500">
            {query ? "No se encontraron cuentas con ese nombre o apellido." : "No hay cuentas para mostrar."}
          </p>
        )}
      </div>
      <p role="status" className="text-xs text-gray-600">{notice}</p>
      <p className="mt-auto text-[11px] text-gray-500">Datos de ejemplo. Los cambios de esta vista son temporales.</p>
    </AdminListLayout>
  );
}
