import type { UserRole } from "../../../types/auth";

// Datos temporales para las pantallas visuales, sin conexión con la base de datos.
export type DemoAccount = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
};

export const demoAccounts: DemoAccount[] = [
  { id: 1, name: "Juan Perez", email: "juanperez@fischer.com", role: "admin" },
  { id: 2, name: "Román Diutsh", email: "romodiut@fischer.com", role: "repositor" },
  { id: 3, name: "Armando Paredes", email: "nomoparedes@fischer.com", role: "admin" },
  { id: 4, name: "Rosa Chinigua", email: "yosarmo@fischer.com", role: "repositor" },
  { id: 5, name: "Yamil Rosenari", email: "yamirose@fischer.com", role: "repositor" },
];

export type DemoProduct = {
  id: string;
  name: string;
  fischerCode: string;
  image: string;
};

export const demoProducts: DemoProduct[] = [
  { id: "7346283712891", name: "Tuerca", fischerCode: "7346283712891", image: "/tuerca.jpg" },
  { id: "3217362517512", name: "Tarugo", fischerCode: "3217362517512", image: "/TARUGO.png" },
  { id: "6328713512891", name: "Martillo", fischerCode: "6328713512891", image: "/martillo.jpg" },
  { id: "9384789126123", name: "Destornillador", fischerCode: "9384789126123", image: "/destornillador.webp" },
  { id: "3261736251751", name: "Barniz", fischerCode: "3261736251751", image: "/Barniz.webp" },
  { id: "8237461926501", name: "Candado", fischerCode: "8237461926501", image: "/candado.png" },
];

export function normalizeSearch(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es").trim();
}
