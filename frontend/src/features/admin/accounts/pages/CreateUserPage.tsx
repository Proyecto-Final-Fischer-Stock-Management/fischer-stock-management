import AdminListLayout from "../../components/AdminListLayout";
import UserForm from "../components/UserForm";

export default function CreateUserPage() {
  return (
    <AdminListLayout title="Crear usuario" backTo="/admin/accounts">
      <UserForm />
    </AdminListLayout>
  );
}