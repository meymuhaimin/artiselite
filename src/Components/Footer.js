import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-100 py-4 px-4 flex justify-center items-center fixed bottom-0 left-0 w-full">
        <p className="text-center">&copy; {new Date().getFullYear()} Arteselite. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
