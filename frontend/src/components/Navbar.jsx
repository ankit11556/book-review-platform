import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wide hover:scale-105 transition-transform duration-300">
            📚 Book Review Platform
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center text-lg font-medium">
            <Link to="/" className="hover:text-yellow-300 transition-colors duration-300">Home</Link>
            <Link to="/add-book" className="hover:text-yellow-300 transition-colors duration-300">Add Book</Link>
            <Link to="/profile" className="hover:text-yellow-300 transition-colors duration-300">Profile</Link>
            <Link to="/login" className="hover:text-yellow-300 transition-colors duration-300">Login</Link>
            <Link to="/signup" className="hover:text-yellow-300 transition-colors duration-300">Signup</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-700 text-white px-4 py-4 space-y-3">
          <Link to="/" onClick={toggleMenu} className="block hover:text-yellow-300 transition-colors">Home</Link>
          <Link to="/add-book" onClick={toggleMenu} className="block hover:text-yellow-300 transition-colors">Add Book</Link>
          <Link to="/profile" onClick={toggleMenu} className="block hover:text-yellow-300 transition-colors">Profile</Link>
          <Link to="/login" onClick={toggleMenu} className="block hover:text-yellow-300 transition-colors">Login</Link>
          <Link to="/signup" onClick={toggleMenu} className="block hover:text-yellow-300 transition-colors">Signup</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
