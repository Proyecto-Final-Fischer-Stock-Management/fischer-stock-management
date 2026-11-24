export type ProductSummary = {
  fischer_code: number;
  name: string;
};

export type Product = ProductSummary & {
  easy_sap: string;
  sodimac_sku: string;
  carrefour_ean: number;
  anonima_codint: number;
  hipertehuelche_code: string;
};