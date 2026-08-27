import type { StockProduct } from "../catalog/services/catalogApi";

export type CartItem = {
  productId: string;
  name: string;
  code: string;
  boxes: number;
  imageSrc: string;
  addedAt: string;
};

const CART_STORAGE_KEY = "fischer-stock-cart";

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

export function addProductToCart(product: StockProduct, boxes: number) {
  const cart = loadCart();
  const existingItem = cart.find(
    (item) => item.productId === String(product.productId),
  );
  const addedAt = new Date().toISOString();

  if (existingItem) {
    existingItem.boxes += boxes;
    existingItem.addedAt = addedAt;
    saveCart(cart);
    return cart;
  }

  const nextCart = [
    ...cart,
    {
      productId: String(product.productId),
      name: product.getProduct.name,
      code: String(product.getProduct.fischerCode),
      boxes,
      imageSrc: product.getProduct.productPicture,
      addedAt,
    },
  ];

  saveCart(nextCart);
  return nextCart;
}
