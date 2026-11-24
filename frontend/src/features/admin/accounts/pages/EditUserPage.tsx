import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../../../components/ui/Button";
import { useAuth } from "../../../../hooks/useAuth";
import type { Account } from "../../../../types/user";
import AdminListLayout from "../../components/AdminListLayout";
import UserForm from "../components/UserForm";
import { GetUser } from "../services/usersApi";

export default function EditUserPage() {
  const { userId } = useParams();
  const { token } = useAuth();
  const [account, setAccount] = useState<Account | null>(null);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    if (!userId || !token) return;
    let active = true;
    GetUser(userId, token).then((user) => { if (active) setAccount(user); })
      .catch((error) => { if (active) setError(error instanceof Error ? error.message : "No se pudo cargar el usuario."); });
    return () => { active = false; };
  }, [userId, token, retry]);

  return (
    <AdminListLayout title="Modificar cuenta" backTo="/admin/accounts">
      {error ? <div role="alert" className="text-sm text-red-700"><p>{error}</p><Button onClick={() => { setError(""); setRetry(retry + 1); }} className="mt-3">Reintentar</Button></div>
        : account && account.id === Number(userId) ? <UserForm key={account.id} account={account} /> : <p role="status" className="text-sm">Cargando usuario…</p>}
    </AdminListLayout>
  );
}