
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
export default function Header() {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className="p-4 bg-white dark:bg-gray-800 shadow-md flex justify-between items-center md:px-16">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">MyApp</h1>
      <nav className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-gray-700 dark:text-gray-200">
              Hello, {user.name || user.email}
            </span>
            <button
              onClick={logout}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-600 dark:text-blue-400">Login</Link>
            <Link to="/register" className="text-blue-600 dark:text-blue-400">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
