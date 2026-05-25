export default function LogBtn() {
    const handleClick = () => {
        alert("Login yey");
    }
    return (
        <div>
            <button onClick={handleClick} className="bg-white text-center w-54 px-4 py-2 border border-gray-300 shadow-sm">
            <div>
            Log-in
            </div>
        </button> 
       </div>
    )
}