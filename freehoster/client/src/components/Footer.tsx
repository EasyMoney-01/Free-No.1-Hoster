import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <span className="text-lg font-bold text-indigo-600">FreeHoster</span>
          </div>
          <div className="mt-4 md:mt-0 md:order-1">
            <p className="text-center text-sm text-gray-500">
              &copy; 2023 FreeHoster. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;