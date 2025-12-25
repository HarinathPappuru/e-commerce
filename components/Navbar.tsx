
import React from 'react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onStylistClick: () => void;
  onVeoClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, onStylistClick, onVeoClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-8">
            <a href="#" className="font-serif text-3xl font-black tracking-tighter">VOGUE<span className="text-gray-400">AI</span></a>
            <div className="hidden md:flex space-x-6 text-sm font-medium uppercase tracking-widest text-gray-500">
              <a href="#" className="hover:text-black transition-colors">Shop</a>
              <a href="#" className="hover:text-black transition-colors">Collections</a>
              <a href="#" className="hover:text-black transition-colors">Lookbook</a>
            </div>
          </div>
          
          <div className="flex items-center space-x-5">
            <button 
              onClick={onVeoClick}
              className="flex items-center space-x-2 border-2 border-black text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all transform hover:scale-105"
            >
              <i className="fa-solid fa-video"></i>
              <span className="hidden sm:inline">Cinematic</span>
            </button>

            <button 
              onClick={onStylistClick}
              className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all transform hover:scale-105"
            >
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              <span className="hidden sm:inline">AI Stylist</span>
            </button>
            
            <button className="text-gray-600 hover:text-black transition-colors">
              <i className="fa-solid fa-magnifying-glass text-xl"></i>
            </button>
            
            <button 
              onClick={onCartClick}
              className="relative text-gray-600 hover:text-black transition-colors"
            >
              <i className="fa-solid fa-bag-shopping text-xl"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
