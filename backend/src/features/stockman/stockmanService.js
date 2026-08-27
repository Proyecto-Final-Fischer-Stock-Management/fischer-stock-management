import { GetByPlace } from "./stockmanRepository.js";

export async function SGettingManyProcess(sectorId) {
  const stock = await GetByPlace(sectorId);

  return stock.map((item) => ({
    productId: item.product_id,
    sectorId: item.sector_id,
    actualStock: item.actual_stock,
    minimunStock: item.minimun_stock,

    getProduct: {
      fischerCode: item.get_product.fischer_code,
      name: item.get_product.name,
      easySap: item.get_product.easy_sap,
      stockout: item.get_product.stockout,

      productPicture: item.get_product.product_picture
        ? item.get_product.product_picture.toString("base64")
        : null,

      productPictureType: item.get_product.product_picture_type,
    },
    getPlace: {
      sector: item.get_sector.sector,
      bossEmail: item.get_sector.sector_boss_email,
    },
  }));
}
