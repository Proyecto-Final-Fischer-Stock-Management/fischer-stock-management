import { RowActions, UserIcon } from "../../components/AdminListControls";
import type { DemoAccount } from "../../data/demoData";

type UserListProps = {
  users: DemoAccount[];
  onDelete: (user: DemoAccount) => void;
};

export default function UserList({ users, onDelete }: UserListProps) {
  return (
    <ul aria-label="Cuentas de usuarios" className="flex flex-col gap-3">
      {users.map((user) => (
        <li key={user.id} className="flex min-h-16 items-center gap-3 rounded-sm border border-gray-300 bg-white px-3 py-2 shadow-xs">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-300 text-black">
            <UserIcon />
          </div>
          <div className="min-w-0 flex-1 text-xs">
            <p className="break-words font-medium">{user.name}</p>
            <p className="break-all text-[11px]">{user.email}</p>
          </div>
          <RowActions editPath={`/admin/accounts/${user.id}/edit`} name={user.name} onDelete={() => onDelete(user)} />
        </li>
      ))}
    </ul>
  );
}
