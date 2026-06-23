import { ButtonLink } from "../../../../components/ui/Button"

export default function CatalogPage() {
    return (
        <div className="object-contain w-30 h-20 pt-3 pl-4">
        <img src="../../../public/Logo Fischer  sin fondo.png"></img>
        </div>
        <ButtonLink to="repositor/page" variant="secondary" className="w-64">
                  Ver catálogo
        </ButtonLink>
    )
}
