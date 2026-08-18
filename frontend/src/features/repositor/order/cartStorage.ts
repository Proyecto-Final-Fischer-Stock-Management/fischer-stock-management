import type { CatalogProduct } from "../catalog/data/catalogProducts";

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

export function addProductToCart(product: CatalogProduct, boxes: number) {
  const cart = loadCart();
  const existingItem = cart.find((item) => item.productId === product.id);
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
      productId: product.id,
      name: product.name,
      code: product.code,
      boxes,
      imageSrc: product.imageSrc,
      addedAt,
    },
  ];

  saveCart(nextCart);
  return nextCart;
}
