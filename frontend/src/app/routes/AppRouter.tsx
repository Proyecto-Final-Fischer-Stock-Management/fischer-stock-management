import { Navigate, Route, Routes } from "react-router-dom";
import CreateProductPage from "../../features/admin/stock/pages/CreateProductPage";
import EditProductPage from "../../features/admin/stock/pages/EditProductPage";
import CreateUserPage from "../../features/admin/accounts/pages/CreateUserPage";
import EditUserPage from "../../features/admin/accounts/pages/EditUserPage";
import AdminHomePage from "../../features/admin/dashboard/pages/AdminHomePage";
import LoginPage from "../../features/auth/pages/LoginPage";
import CatalogPage from "../../features/repositor/catalog/pages/CatalogPage";
import CheckInPage from "../../features/repositor/checkin/pages/CheckInPage";
import OrderPage from "../../features/repositor/order/pages/OrderPage";
import ProductFormPage from "../../features/repositor/product-form/pages/ProductFormPage";
import RepositorHomePage from "../../features/repositor/home/pages/RepositorHomePage";
import { ProtectedRoute } from "./ProtectedRoute";
import AccountsPage from "../../features/admin/accounts/pages/AccountsPage";
import StockPage from "../../features/admin/stock/pages/StockPage";

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
        <Route path="/admin/accounts" element={<AccountsPage />} />
        <Route path="/admin/stock" element={<StockPage />} />
        <Route
          path="/admin/stock/create"
          element={<CreateProductPage />}
        />
        <Route
          path="/admin/stock/:productId/edit"
          element={<EditProductPage />}
        />
        <Route
          path="/admin/accounts/create"
          element={<CreateUserPage />}
        />
        <Route
          path="/admin/accounts/:userId/edit"
          element={<EditUserPage />}
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
