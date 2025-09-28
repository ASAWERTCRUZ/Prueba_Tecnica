// src/pages/Home.jsx
import { useEffect, useState, useMemo } from "react";
import { fetchPosts, fetchUsers } from "../api/api";
import PostList from "../components/PostList";
import SearchBar from "../components/SearchBar";
import FilterUser from "../components/FillterUser";
import Pagination from "../components/Pagination";
import "../styles/Home.css";

function Home() {


  const [posts, setPosts] = useState([]); // Almacena posts
  const [users, setUsers] = useState([]); // Almacena usuarios


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // búsqueda y filtro
  const [search, setSearch] = useState("");
  const [userFilter, setUserFilter] = useState("");

  // paginación
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        // Carga posts y users
        const [postsData, usersData] = await Promise.all([
          fetchPosts(),
          fetchUsers(),
        ]);
        setPosts(postsData);
        setUsers(usersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  
  const postsWithUserInfo = useMemo(() => {
    // 1. Filtrado
    const filtered = posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase());
      const matchesUser = userFilter ? post.userId === Number(userFilter) : true;
      return matchesSearch && matchesUser;
    });

    // Añadir info del usuario
    return filtered.map(post => {

      const user = users.find(u => u.id === post.userId) || { name: 'Desconocido', email: 'default@example.com' };
      return {
        ...post,
        userName: user.name,
        userEmail: user.email
      };
    });
  }, [posts, users, search, userFilter]); 

  // Paginación
  const totalPages = Math.ceil(postsWithUserInfo.length / PAGE_SIZE);
  const paginatedPosts = postsWithUserInfo.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );
  
  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    } else if (page > 1 && totalPages === 0) {
      setPage(1);
    }
  }, [totalPages, page]);


  if (loading) return <p>Cargando publicaciones...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="home-container">
      <h1>Página Principal</h1>

      <div className="filters-container">
        {/* Barra de búsqueda */}
        <SearchBar value={search} onChange={setSearch} />

        {/* Filtro por usuario */}
        <FilterUser users={users} value={userFilter} onChange={setUserFilter} />
      </div>

      {/* Lista de publicaciones*/}
      <PostList posts={paginatedPosts} />

      {/* Paginación */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(p - 1, 1))}
        onNext={() => setPage((p) => Math.min(p + 1, totalPages))}
      />
    </div>
  );
}

export default Home;