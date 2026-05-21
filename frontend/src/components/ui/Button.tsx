export default function Button() {
    const handleClick = () => {
        alert("Hiciste click!!");
    }
    return (
       <button onClick={handleClick} className="bg-blue-300">
        Button
       </button> 
    )
    
}