import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {

  return (
    <nav className="bg-gray-800 text-white fixed top-0 left-0 w-full flex items-center justify-between px-4 py-2">
      <Link to="/" className="flex items-center text-xl font-bold">
        Artiselite
        <i className="fab fa-typo3"></i>
      </Link>

      <ul className="md:flex md:items-center md:space-x-4">
        <li className="py-2 md:py-0">
          <Link to="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
        </li>
        <li className="py-2 md:py-0">
          <Link to="/about" className="text-gray-300 hover:text-white">
            About
          </Link>
        </li>
      </ul>
      <div className="flex md:w-1/3">  
        <input type="text" className="flex-grow px-4 py-2 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" placeholder="Search..." />
      </div>
    </nav>
  );
}

export default Navbar;
