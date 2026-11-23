import type { StockProduct } from "../catalog/services/catalogApi";

export type ProductReport = {
  shelfStock: number | null;
  hasStockBreak: "yes" | "no" | null;
  observations: string;
};

export type CartItem = {
  productId: string;
  name: string;
  code: string;
  boxes: number;
  addedAt: string;
  product: StockProduct;
  report: ProductReport;
};

const CART_STORAGE_KEY = "fischer-stock-cart-v2";

export function loadCart(): CartItem[] {
  const rawCart = window.localStorage.getItem(CART_STORAGE_KEY);

  if (!rawCart) {
    return [];
  }

  try {
    const parsedCart = JSON.parse(rawCart);
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function clearCart() {
  window.localStorage.removeItem(CART_STORAGE_KEY);
}

export function addProductToCart(
  product: StockProduct,
  boxes: number,
  report: ProductReport,
) {
  const cart = loadCart();

  const existingItem = cart.find(
    (item) => item.productId === String(product.productId),
  );

  const addedAt = new Date().toISOString();

  if (existingItem) {
    existingItem.boxes += boxes;
    existingItem.addedAt = addedAt;
    existingItem.product = product;
    existingItem.report = report;

    saveCart(cart);
    return cart;
  }

  const nextCart: CartItem[] = [
    ...cart,
    {
      productId: String(product.productId),
      name: product.getProduct.name,
      code: String(product.getProduct.fischerCode),
      boxes,
      addedAt,
      product,
      report,
    },
  ];

  saveCart(nextCart);
  return nextCart;
}

export function updateProductReport(productId: string, report: ProductReport) {
  const cart = loadCart();

  const existingItem = cart.find((item) => item.productId === productId);

  if (!existingItem) {
    return cart;
  }

  existingItem.report = report;
  existingItem.addedAt = new Date().toISOString();

  saveCart(cart);
  return cart;
}

export function updateProductInCart(
  product: StockProduct,
  previouslyAddedBoxes: number,
  newBoxes: number,
  report: ProductReport,
) {
  const cart = loadCart();

  const existingItem = cart.find(
    (item) => item.productId === String(product.productId),
  );

  if (!existingItem) {
    return addProductToCart(product, newBoxes, report);
  }

  existingItem.boxes = Math.max(
    0,
    existingItem.boxes - previouslyAddedBoxes + newBoxes,
  );

  existingItem.product = product;
  existingItem.report = report;
  existingItem.addedAt = new Date().toISOString();

  saveCart(cart);
  return cart;
}

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4306";

export async function GetProductImage(
  fischerCode: number,
  token: string,
): Promise<Blob> {
  const response = await fetch(
    `${API_BASE_URL}/stockman/catalog/product/${fischerCode}/image`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("No se pudo obtener la imagen del producto");
  }

  const imageBlob = await response.blob();

  return imageBlob;
}
