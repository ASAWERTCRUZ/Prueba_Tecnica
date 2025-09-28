const BASE_URL = "https://jsonplaceholder.typicode.com";

// Posts
export async function fetchPosts() {
  const res = await fetch(`${BASE_URL}/posts`);
  if (!res.ok) throw new Error("Error al obtener posts");
  return res.json();
}

export async function fetchPostById(postId) {
  const res = await fetch(`${BASE_URL}/posts/${postId}`);
  if (!res.ok) throw new Error("Error al obtener post");
  return res.json();
}

// Comments
export async function fetchCommentsByPost(postId) {
  const res = await fetch(`${BASE_URL}/comments?postId=${postId}`);
  if (!res.ok) throw new Error("Error al obtener comentarios");
  return res.json();
}

// Users
export async function fetchUsers() {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return res.json();
}