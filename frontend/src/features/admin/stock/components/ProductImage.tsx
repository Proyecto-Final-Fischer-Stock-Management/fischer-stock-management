import { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { GetProductImage } from "../services/productsApi";

export default function ProductImage({ code, name }: { code: number; name: string }) {
  const { token } = useAuth();
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!token) return;
    let active = true;
    let imageUrl = "";
    GetProductImage(code, token).then((blob) => {
      if (!active) return;
      imageUrl = URL.createObjectURL(blob);
      setImage(imageUrl);
    }).catch(() => { /* Si no hay foto, dejamos el texto alternativo. */ });
    return () => { active = false; if (imageUrl) URL.revokeObjectURL(imageUrl); };
  }, [code, token]);

  return image ? <img src={image} alt={name} className="h-full w-full object-contain" /> : <span className="text-center text-[10px] text-gray-500">Sin foto</span>;
}