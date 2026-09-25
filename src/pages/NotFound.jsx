import React from 'react';
import { Link } from 'react-router-dom';
import { Footprints } from 'lucide-react';
import Navbar from '../components/navbar';

const NotFound = ({
  title = 'Page not found',
  message = "Looks like you've wandered off the beaten path.",
  withNav = true,
}) => (
  <>
    {withNav && <Navbar />}
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 font-roboto-slab">
      <Footprints className="w-20 h-20 text-[#6e36aa] mb-6" />
      <h1 className="text-4xl font-bold text-[#eb432f] mb-3">{title}</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md">{message}</p>
      <div className="flex gap-4">
        <Link to="/" className="bg-[#eb432f] hover:bg-[#d13a2b] text-white font-bold px-6 py-3 rounded-md transition-colors">
          Go home
        </Link>
        <Link to="/search" className="bg-[#6e36aa] hover:bg-[#5b2b8f] text-white font-bold px-6 py-3 rounded-md transition-colors">
          Browse shoes
        </Link>
      </div>
    </div>
  </>
);

export default NotFound;
