export type CatalogProduct = {
  id: string;
  name: string;
  code: string;
  category: string;
  boxes: number;
  units: number;
  imageSrc: string;
};

export const catalogProducts: CatalogProduct[] = [
  {
    id: "1",
    name: "Tarugo",
    code: "EA019281AJDN",
    category: "Ferreteria",
    boxes: 2,
    units: 10,
    imageSrc: "/TARUGO.png",
  },
  {
    id: "2",
    name: "Tarugo",
    code: "Fhgkjxndnwaqvdd",
    category: "Ferreteria",
    boxes: 3,
    units: 10,
    imageSrc: "/TARUGO.png",
  },
  {
    id: "3",
    name: "Tarugo",
    code: "Fhgkjxndnwaqvdd",
    category: "Ferreteria",
    boxes: 5,
    units: 10,
    imageSrc: "/TARUGO.png",
  },
  {
    id: "4",
    name: "Tarugo",
    code: "Fhgkjxndnwaqvdd",
    category: "Ferreteria",
    boxes: 5,
    units: 10,
    imageSrc: "/TARUGO.png",
  },
  {
    id: "5",
    name: "Tarugo",
    code: "Fhgkjxndnwaqvdd",
    category: "Ferreteria",
    boxes: 1,
    units: 10,
    imageSrc: "/TARUGO.png",
  },
];
