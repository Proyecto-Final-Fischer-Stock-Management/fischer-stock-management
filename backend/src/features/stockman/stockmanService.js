export async function PGettingManyProcess(sector_id) {
  const result = await GetByPlace(sector_id);
  return result;
}
