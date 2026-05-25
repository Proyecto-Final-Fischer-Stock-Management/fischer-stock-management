export default function HelpBtn() {
    const handleClick = () => {
        alert("Mal ahí");
    }
        const handleClick2 = () => {
        alert("No.");
    }
    return (
        <div className="flex flex-col gap-2 items-start">
            <button onClick={handleClick}>
            <div className="text-blue-600">
            ¿Olvidaste tu contraseña?
            </div>
        </button> 
        <button onClick={handleClick2}>
            <div className="text-blue-600">
            Ayuda con el log-in
            </div>
        </button> 
       </div>
    )
}