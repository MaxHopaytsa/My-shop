import React from 'react'

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 py-4">
      <div className="container mx-auto text-center">
        <p className="text-gray-600">
          &copy; {currentYear} Max Hop. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer