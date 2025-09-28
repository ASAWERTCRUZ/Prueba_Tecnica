import PostCard from "./PostCard";

function PostList({ posts }) {
  if (!posts.length) return <p>No hay publicaciones.</p>;

  return (
    <div className="post-list-grid">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
