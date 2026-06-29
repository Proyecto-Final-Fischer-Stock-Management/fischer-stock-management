import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import AdminHomePage from "../../features/admin/dashboard/pages/AdminHomePage";
import LoginPage from "../../features/auth/pages/LoginPage";
import CatalogPage from "../../features/repositor/catalog/pages/CatalogPage";
import CheckInPage from "../../features/repositor/checkin/pages/CheckInPage";

function EmptyPage() {
  return null;
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route /*element={<ProtectedRoute allowedRoles={["admin"]} />}*/>
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/admin/catalog" element={<CatalogPage />} />
        <Route path="/admin/stock" element={<EmptyPage />} />
        <Route path="/admin/stock/create" element={<EmptyPage />} />
        <Route path="/admin/stock/:productId/edit" element={<EmptyPage />} />
        <Route path="/admin/accounts" element={<EmptyPage />} />
        <Route path="/admin/accounts/create" element={<EmptyPage />} />
        <Route path="/admin/accounts/:userId/edit" element={<EmptyPage />} />
      </Route>

      <Route /*element={<ProtectedRoute allowedRoles={["repositor"]} />}*/>
        <Route path="/repositor/check-in" element={<CheckInPage />} />
        <Route path="/repositor" element={<EmptyPage />} />
        <Route path="/repositor/catalog" element={<CatalogPage />} />
        <Route path="/repositor/order" element={<EmptyPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
