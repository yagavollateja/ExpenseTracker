import {useNavigate} from "react-router-dom";
const Back = ({ className = "" })=>{
    const navigate = useNavigate();
    const moveToStart =()=>{
        navigate("/");
    }
    return(
        <button className={`btn b-none  ${className}`}  onClick={moveToStart}><i className="fa-solid fa-arrow-left"></i></button>
    )
}
export default Back;