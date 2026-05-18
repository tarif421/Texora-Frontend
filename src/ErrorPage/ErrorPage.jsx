import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-4">

      {/* ✅ Big 404 */}
      <h1 className="text-8xl font-extrabold text-indigo-600">
        404
      </h1>

      {/* ✅ Message */}
      <h2 className="text-2xl md:text-3xl font-bold mt-4 text-center">
        Oops! Page Not Found
      </h2>

      <p className="text-gray-500 mt-2 text-center max-w-md">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>

      {/* ✅ Buttons */}
      <div className="flex gap-4 mt-6">

        <Link to="/">
          <button className="btn btn-primary text-white">
            Go Home
          </button>
        </Link>

        <Link to="/dashboard">
          <button className="btn btn-outline">
            Dashboard
          </button>
        </Link>

      </div>

      {/* ✅ Illustration (optional) */}
      <div className="mt-10 text-6xl">
        
      </div>

    </div>
  );
};

export default ErrorPage;
