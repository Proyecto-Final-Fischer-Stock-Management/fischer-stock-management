export default function Button() {
    const handleClick = () => {
        alert("Hiciste click!!");
    }
    return (
       <button onClick={handleClick}>
        Button
       </button> 
    )
    
}