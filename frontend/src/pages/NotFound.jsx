import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-7xl font-bold text-error mb-4">404</h1>
      <p className="text-xl mb-6">Page not found</p>

      <Link to="/" className="btn btn-primary">
        Go back Home
      </Link>
    </div>
  );
};

export default NotFound;
