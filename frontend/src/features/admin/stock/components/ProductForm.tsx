import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonLink } from "../../../../components/ui/Button";
import Modal from "../../../../components/ui/Modal";
import { useAuth } from "../../../../hooks/useAuth";
import type { Product } from "../../../../types/product";
import { CreateProduct, UpdateProduct } from "../services/productsApi";
import ProductImage from "./ProductImage";

const inputClass = "mt-1 w-full rounded-sm border border-gray-300 bg-white px-3 py-2 text-xs focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500";
const otherCodes = [
  { name: "sodimacSku", label: "SKU de Sodimac", numeric: false },
  { name: "carrefourEan", label: "EAN de Carrefour", numeric: true },
  { name: "anonimaCodInt", label: "Código interno de La Anónima", numeric: true },
  { name: "hipertehuelcheCode", label: "Código de Hipertehuelche", numeric: false },
] as const;

export default function ProductForm({ product }: { product?: Product }) {
  const editing = Boolean(product);
  const { token } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: product?.name ?? "",
    fischerCode: product ? String(product.fischer_code) : "",
    easySap: product?.easy_sap ?? "",
    sodimacSku: product?.sodimac_sku ?? "",
    carrefourEan: product ? String(product.carrefour_ean) : "",
    anonimaCodInt: product ? String(product.anonima_codint) : "",
    hipertehuelcheCode: product?.hipertehuelche_code ?? "",
  });
  const [picture, setPicture] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [event.target.name]: event.target.value });
    setError("");
  }

  function handlePicture(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) {
      setError("Elegí una imagen JPG, PNG o WebP de hasta 5 MB.");
      event.target.value = "";
      setPicture(null);
      setPreview("");
      return;
    }
    setError("");
    setPicture(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving || !token) return;
    setError("");
    if (Object.values(values).some((value) => !value.trim())) {
      setError("Completá el nombre y todos los códigos.");
      return;
    }
    if (!editing && !picture) {
      setError("Seleccioná una foto del producto.");
      return;
    }
    // FormData permite mandar los campos de texto junto con la foto.
    const data = new FormData();
    Object.entries(values).forEach(([name, value]) => data.append(name, value.trim()));
    if (picture) data.append("productPicture", picture);

    setSaving(true);
    try {
      if (editing) await UpdateProduct(data, token);
      else await CreateProduct(data, token);
      setSuccess(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "No se pudo guardar el producto.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="rounded-sm border border-gray-300 bg-white px-4 py-5 shadow-xs">
        <fieldset disabled={saving || success} className="flex min-w-0 flex-col gap-4">
          <legend className="mb-4 text-xs">Información del producto</legend>
          <label className="block text-xs">Nombre del producto
            <input name="name" value={values.name} onChange={handleChange} required placeholder="Ej: Tarugo" className={inputClass} />
          </label>
          <label className="block text-xs">Código de Fischer
            <input aria-label="Código de Fischer" name="fischerCode" type="number" min={1} max={2147483647} step={1} value={values.fischerCode} onChange={handleChange} readOnly={editing} required placeholder="Ej: 616302" className={`${inputClass} read-only:bg-gray-100`} />
            {editing && <span className="mt-1 block text-[10px] text-gray-500">El código identifica al producto y se conserva al modificarlo.</span>}
          </label>
          <label className="block text-xs">SAP de Easy
            <input name="easySap" value={values.easySap} onChange={handleChange} required placeholder="Ej: 0123456" className={inputClass} />
          </label>
          <div className="border-t border-gray-200 pt-3">
            <p className="mb-3 text-xs">Otros códigos de cadenas</p>
            <div className="flex flex-col gap-4">
              {otherCodes.map((field) => (
                <label key={field.name} className="block text-xs">{field.label}
                  <input name={field.name} type={field.numeric ? "number" : "text"} min={field.numeric ? 1 : undefined} max={field.numeric ? 2147483647 : undefined} step={field.numeric ? 1 : undefined} value={values[field.name]} onChange={handleChange} required className={inputClass} />
                </label>
              ))}
            </div>
          </div>
          <fieldset disabled className="flex min-w-0 flex-col gap-3 rounded-sm border border-gray-200 p-3">
            <legend className="px-1 text-xs">Ubicación del producto</legend>
            <label className="block text-xs">En qué sucursales se vende
              <select className={`${inputClass} bg-gray-50 text-gray-500`}><option>Asignar desde stock</option></select>
            </label>
            <div className="text-xs">Sector del producto</div>
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-500"><button type="button" className="rounded-sm border border-gray-300 px-2 py-2">Ferretería</button><button type="button" className="rounded-sm border border-gray-300 px-2 py-2">Pinturería</button></div>
            <p className="text-[11px] text-gray-500">La asignación de sucursal y sector queda pendiente de la gestión de stock.</p>
          </fieldset>
          <label className="block text-xs">Foto del producto
            <input name="productPicture" type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePicture} required={!editing} className="mt-2 block w-full rounded-sm border border-gray-300 px-2 py-3 text-[11px] file:mr-2 file:rounded-sm file:border-0 file:bg-gray-100 file:px-2 file:py-1" />
            <span className="mt-1 block text-[10px] text-gray-500">JPG, PNG o WebP. Máximo 5 MB.{editing && " Si no elegís otra foto, se conserva la actual."}</span>
          </label>
          {(preview || product) && <div className="flex h-28 items-center justify-center rounded-sm border border-gray-200 p-2">
            {preview ? <img src={preview} alt="Vista previa de la foto seleccionada" className="h-full w-full object-contain" /> : product && <ProductImage code={product.fischer_code} name={product.name} />}
          </div>}
          {error && <p role="alert" className="text-xs text-red-700">{error}</p>}
          <Button type="submit" fullWidth className="mt-2 min-h-11 justify-between rounded-sm bg-[#E60000] text-xs font-semibold">
            <span className="flex-1">{saving ? "Guardando…" : editing ? "Modificar producto" : "Agregar producto"}</span><span aria-hidden="true">→</span>
          </Button>
        </fieldset>
        <ButtonLink to="/admin/stock" fullWidth className="mt-4 min-h-11 justify-between rounded-sm bg-[#E60000] text-xs font-semibold"><span aria-hidden="true">←</span><span className="flex-1 text-center">Volver a stock</span></ButtonLink>
      </form>
      {success && (
        <Modal title={editing ? "Producto modificado" : "Producto creado"} onClose={() => navigate("/admin/stock")}>
          <p className="mb-5">Los cambios se han guardado correctamente.</p>
          <Button fullWidth onClick={() => navigate("/admin/stock")} className="rounded-sm text-xs font-semibold">Aceptar</Button>
        </Modal>
      )}
    </>
  );
}