import { useNavigate } from "react-router-dom";
import "./ListItem.css";
import { FaRegHeart,FaHeart } from "react-icons/fa";

const ListItem=({item,deleteFavorite,addFavorite,isFavorite})=>{

const navigate=useNavigate();
return (
    <li key={item.id} className="list-card">
    {isFavorite(item.id) ? (
      <FaHeart
        className="favorite"
        onClick={() => deleteFavorite(item)}
      />
    ) : (
      <FaRegHeart
        className="favorite"
        onClick={() => addFavorite(item)}
      />
    )}
    <img src={item.images[0]} alt={`${item.name}`} /> 
    <p>
      <b>{item.name}:</b> {item.breed}
      <br />
      Location: {item.city} {item.state}
      <br />
      <button
        className="list-btn"
        onClick={() => navigate(`/detail/${item.id}`)}
      >
        Check me out!
      </button>
    </p>
  </li>
)
}
export default ListItem;