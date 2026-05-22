import { useState } from 'react';
import { getSinglePost } from './api';
import './Lesson07Styles.css';

export default function FetchOnClick() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    setError('');

    try {
      const data = await getSinglePost(1);
      setPost(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="root">
      <h1 className="heading">Fetch single post on click</h1>

      <button type="button" onClick={handleClick}>
        Get post
      </button>

      <div className="content">
        {loading && <p>Loading post...</p>}
        {error && <p>Error: {error}</p>}

        {post && (
          <div className="post">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        )}

        {!post && !loading && !error && <p>Click the button to fetch a post</p>}
      </div>
    </div>
  );
}
