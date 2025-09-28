import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPostById, fetchCommentsByPost } from "../api/api";
import "../styles/DetailPosrt.css";

function DetailPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [postData, commentsData] = await Promise.all([
          fetchPostById(id),
          fetchCommentsByPost(id),
        ]);
        setPost(postData);
        setComments(commentsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (loading) return (
    <div className="detail-container">
      <p>Cargando detalle...</p>
    </div>
  );
  if (error) return (
    <div className="detail-container">
      <p>Error: {error}</p>
    </div>
  );
  if (!post) return (
    <div className="detail-container">
      <p>No se encontró la publicación.</p>
    </div>
  );

  return (
    <div className="detail-container">
      <h1>Detalle de Publicación</h1>

      <div className="post-detail-card">
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>

      <div className="comments-section">
        <h3>Comentarios ({comments.length})</h3>
        {comments.length > 0 ? (
          <ul className="comments-list">
            {comments.map((c) => (
              <li key={c.id}>
                <strong>{c.name}</strong> ({c.email}): {c.body}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay comentarios.</p>
        )}
      </div>

      <Link to="/pagina-principal" className="back-link">
        ⬅ Volver
      </Link>
    </div>
  );
}

export default DetailPost;