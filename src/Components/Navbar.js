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
            TopNews
          </Link>
        </li>
        <li className="py-2 md:py-0">
          <Link to="/advanceSearch" className="text-gray-300 hover:text-white">
            Advance Search
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
