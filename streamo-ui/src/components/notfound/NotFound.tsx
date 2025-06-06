import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-white px-4">
      <div className="max-w-md w-full bg-[#1E293B] p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-5xl font-bold text-purple-400 mb-4">404</h1>
        <p className="text-xl font-semibold mb-2">Page Not Found</p>
        <p className="text-gray-400 mb-6">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound;
