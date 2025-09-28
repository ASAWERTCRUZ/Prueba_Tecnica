// src/components/PostCard.jsx
import { Link } from "react-router-dom";
import '../styles/PostCard.css'

function PostCard({ post }) {
  const { id, title, body, userName, userEmail } = post;
  
  const avatarUrl = 'https://unavatar.io/gravatar/${userEmail}';

  return (
    <div className="post-card-container">
      
      <div className="post-author-info">
        <img 
          src={avatarUrl} 
          alt={`Avatar de ${userName}`} 
          className="author-avatar"
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src = "https://unavatar.io/gravatar/default"; 
          }}
        />
        <p className="author-name">Autor: <strong>{userName}</strong></p>
      </div>

      <h2 className="post-title">{title}</h2>
      <p className="post-body">{body.substring(0, 150)}...</p>
      
      <Link to={`/pagina-principal/detail/${id}`} className="details-link">
        Ver detalles
      </Link>
    </div>
  );
}
export default PostCard;