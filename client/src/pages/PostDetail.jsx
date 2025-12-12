import { useState, useEffect, useContext} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, deletePost } from '../services/api';
import  { AuthContext } from '../context/authContext';
import './PostDetail.css';
import toast from 'react-hot-toast';
import { format, formatDistanceToNow } from 'date-fns';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await getPostById(id);
        setPost(data);
        setError(null);
      } catch (err) {
        setError('Failed to load post. It may not exist or the server is down.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const formatDate = (dateString) => {
    return format(new Date(dateString), "PPP p");
  };

  const formatRelativeTime = (dateString) => {
    return formatDistanceToNow(new Date(dateString), {addSuffix: true});
  };

  const handleEdit = () => {
    navigate(`/posts/${id}/edit`);
  };

const handleDelete = () => {
  console.log("handleDelete clicked, id =", id);
  setShowConfirm(true);
};

const confirmDelete = async () => {
  try {
    console.log("Deleting post with id:", id);
    await deletePost(id);
    setShowConfirm(false);

    toast.success('Post deleted');
    navigate('/');
  } catch (err) {
    console.error("Failed to delete post", err);
    setShowConfirm(false);

    toast.error("Failed to delete post.");
  }
};

const cancelDelete = () => {
  setShowConfirm(false);
};


   // Check if current user owns the post
  const canModify = user && post && user.id === post.user._id;


  if (loading) {
    return <div className="container loading">Loading post...</div>;
  }

  if (error) {
    return (
      <div className="container error">
        <p>{error}</p>
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Home
        </button>
      </div>
    );
  }

  if (!post) {
    return <div className="container error">Post not found.</div>;
  }

  return (
    <div className="container">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Posts
      </button>
      <article className="post-detail">
        <h1>{post.title}</h1>
        <div className="post-detail-meta">
          <span className="post-detail-author">By {post.user?.name || 'Unknown'}</span>
          <span className="post-detail-date">{formatDate(post.createDate)} • {formatRelativeTime(post.createDate)}</span>
        </div>
        <div className="post-detail-body">
          {post.body.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      {canModify && (
          <div className="post-actions">
             <button onClick={handleEdit} className="edit-button">
               Edit Post
             </button>
             <button onClick={handleDelete} className="delete-button">
               Delete Post
             </button>
           </div>
)}
{showConfirm && (
  <div className="confirm-overlay">
    <div className="confirm-box">
      <p>Are you sure you want to delete this post?</p>
      <div className="confirm-actions">
        <button onClick={confirmDelete} className="confirm-delete">
          Yes, delete
        </button>
        <button onClick={cancelDelete} className="confirm-cancel">
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

        </article>
      </div>

  );
};

export default PostDetail;