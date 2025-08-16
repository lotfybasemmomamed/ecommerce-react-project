import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-800">
      <h1 className="text-9xl font-extrabold text-gray-300">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold mt-4">Page Not Found</h2>
      <p className="text-gray-500 mt-2 mb-6 text-center px-4">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
