import { useEffect, useState } from "react";
import { Button, ButtonLink } from "../../../../components/ui/Button";
import Modal from "../../../../components/ui/Modal";
import { useAuth } from "../../../../hooks/useAuth";
import type { Account } from "../../../../types/user";
import AdminListLayout from "../../components/AdminListLayout";
import { FilterButtons, SearchField, UserIcon } from "../../components/AdminListControls";
import UserList from "../components/UserList";
import { DeleteUser, GetUsers } from "../services/usersApi";

const roles = ["Administrador", "Repositor"] as const;
function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es").trim();
}

export default function AccountsPage() {
  const { user, token } = useAuth();
  const [users, setUsers] = useState<Account[]>([]);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<(typeof roles)[number]>("Administrador");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [retry, setRetry] = useState(0);
  const [selectedUser, setSelectedUser] = useState<Account | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!user?.id || !token) return;
    let active = true;
    GetUsers(user.id, token).then((users) => { if (active) setUsers(users); })
      .catch((error) => { if (active) setLoadError(error instanceof Error ? error.message : "No se pudieron cargar las cuentas."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [user?.id, token, retry]);

  const query = normalize(search);
  const visibleUsers = users.filter((user) => {
    const matchesName = normalize(user.complete_name).includes(query);
    const matchesRole = selectedRole === "Administrador" ? user.role === "Administrator" : user.role === "Stockman";
    return matchesName && matchesRole;
  });

  async function confirmDelete() {
    if (!selectedUser || !token || deleting) return;
    setDeleting(true);
    setDeleteError("");
    try {
      await DeleteUser(selectedUser.id, token);
      // Quitamos la fila solamente si el backend confirmó la eliminación.
      setUsers(users.filter((user) => user.id !== selectedUser.id));
      setNotice(`Se eliminó la cuenta de ${selectedUser.complete_name}.`);
      setSelectedUser(null);
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : "No se pudo eliminar el usuario.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <AdminListLayout title="Cuentas de usuarios">
      <div className="flex flex-col gap-3">
        <SearchField label="Buscar cuenta por nombre o apellido" value={search} onChange={setSearch} />
        <ButtonLink to="/admin/accounts/create" fullWidth className="min-h-11 gap-3 rounded-sm text-xs font-semibold"><UserIcon add />Crear usuario</ButtonLink>
      </div>
      <section aria-label="Filtros de usuarios" className="flex flex-col gap-3">
        <p className="text-xs">Filtrar por:</p>
        <FilterButtons label="Rol del usuario" options={roles} selected={selectedRole} onSelect={setSelectedRole} />
      </section>
      {loading ? <p role="status" className="text-xs">Cargando cuentas…</p> : loadError ? (
        <div role="alert" className="text-xs text-red-700"><p>{loadError}</p><Button className="mt-3" onClick={() => { setLoadError(""); setLoading(true); setRetry(retry + 1); }}>Reintentar</Button></div>
      ) : <>
        <p className="text-xs" role="status">Total de cuentas: <span className="text-red-600">{users.length}</span><span className="ml-2 text-gray-500">Mostrando: {visibleUsers.length}</span></p>
        {visibleUsers.length ? <UserList users={visibleUsers} onDelete={(user) => { setDeleteError(""); setSelectedUser(user); }} />
          : <p role="status" className="rounded-sm border border-gray-300 bg-white px-4 py-6 text-center text-xs text-gray-500">No se encontraron cuentas con los filtros seleccionados.</p>}
      </>}
      <p role="status" className="text-xs text-gray-600">{notice}</p>
      {selectedUser && (
        <Modal title="¿Eliminar usuario?" danger busy={deleting} onClose={() => setSelectedUser(null)}>
          <p className="mb-5 break-words">¿Deseás eliminar la cuenta de “{selectedUser.complete_name}”?</p>
          {deleteError && <p role="alert" className="mb-3 text-red-700">{deleteError}</p>}
          <Button fullWidth disabled={deleting} onClick={confirmDelete} className="rounded-sm text-xs font-semibold">{deleting ? "Eliminando…" : "Eliminar"}</Button>
          <Button autoFocus fullWidth variant="secondary" disabled={deleting} onClick={() => setSelectedUser(null)} className="mt-3 rounded-sm border-red-500 text-xs font-semibold text-red-600">Cancelar</Button>
        </Modal>
      )}
    </AdminListLayout>
  );
}