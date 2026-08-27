import { Navigate, Route, Routes } from "react-router-dom";
import AdminPlaceholderPage from "../../features/admin/dashboard/pages/AdminPlaceholderPage";
import AdminHomePage from "../../features/admin/dashboard/pages/AdminHomePage";
import LoginPage from "../../features/auth/pages/LoginPage";
import CatalogPage from "../../features/repositor/catalog/pages/CatalogPage";
import CheckInPage from "../../features/repositor/checkin/pages/CheckInPage";
import OrderPage from "../../features/repositor/order/pages/OrderPage";
import ProductFormPage from "../../features/repositor/product-form/pages/ProductFormPage";
import RepositorHomePage from "../../features/repositor/home/pages/RepositorHomePage";
import { ProtectedRoute } from "./ProtectedRoute";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/admin/catalog" element={<CatalogPage />} />
        <Route path="/admin/catalog/:productId" element={<ProductFormPage />} />
        <Route path="/admin/order" element={<OrderPage />} />
        <Route
          path="/admin/stock"
          element={<AdminPlaceholderPage title="Añadir stock" />}
        />
        <Route
          path="/admin/stock/create"
          element={<AdminPlaceholderPage title="Añadir stock" />}
        />
        <Route
          path="/admin/stock/:productId/edit"
          element={<AdminPlaceholderPage title="Editar stock" />}
        />
        <Route
          path="/admin/accounts"
          element={<AdminPlaceholderPage title="Crear cuenta" />}
        />
        <Route
          path="/admin/accounts/create"
          element={<AdminPlaceholderPage title="Crear cuenta" />}
        />
        <Route
          path="/admin/accounts/:userId/edit"
          element={<AdminPlaceholderPage title="Editar cuenta" />}
        />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["repositor"]} />}>
        <Route path="/repositor/check-in" element={<CheckInPage />} />
        <Route path="/repositor" element={<RepositorHomePage />} />
        <Route path="/repositor/catalog" element={<CatalogPage />} />
        <Route
          path="/repositor/catalog/:productId"
          element={<ProductFormPage />}
        />
        <Route path="/repositor/form" element={<ProductFormPage />} />
        <Route path="/repositor/order" element={<OrderPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
