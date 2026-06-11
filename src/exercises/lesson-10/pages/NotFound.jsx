import { Link, useLocation } from 'react-router-dom';

export default function NotFound() {
  const pathname = useLocation();

  return (
    <section>
      <h2>404: Not Found</h2>
      <p>
        No match found for: <code>{pathname.pathname}</code>
      </p>

      <Link to="/">Go Home</Link>
    </section>
  );
}
