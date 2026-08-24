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
    name: "Destornillador",
    code: "Fhgkjxndnwaqvdd",
    category: "Ferreteria",
    boxes: 3,
    units: 10,
    imageSrc: "/destornillador.webp",
  },
  {
    id: "3",
    name: "Tuerca",
    code: "Fhgkjxndnwaqvdd",
    category: "Ferreteria",
    boxes: 5,
    units: 10,
    imageSrc: "/tuerca.jpg",
  },
  {
    id: "4",
    name: "Barniz para madera",
    code: "Fhgkjxndnwaqvdd",
    category: "Pintura",
    boxes: 5,
    units: 10,
    imageSrc: "/Barniz.webp",
  },
  {
    id: "5",
    name: "Martillo",
    code: "Fhgkjxndnwaqvdd",
    category: "Ferreteria",
    boxes: 1,
    units: 10,
    imageSrc: "/martillo.jpg",
  },
];
