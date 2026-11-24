export type AccountRole = "Administrator" | "Stockman";

export type Account = {
  id: number;
  complete_name: string;
  email: string;
  role: AccountRole;
};

export type UserFormData = {
  completeName: string;
  email: string;
  role: AccountRole;
  password?: string;
};