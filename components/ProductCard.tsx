
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group relative flex flex-col">
      <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-white text-black p-3 rounded-full hover:bg-black hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-500"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
          <button className="bg-white text-black p-3 rounded-full hover:bg-black hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-500 delay-75">
            <i className="fa-solid fa-heart"></i>
          </button>
        </div>
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-black">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="mt-4 flex flex-col">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-semibold text-gray-900 group-hover:underline">
            {product.name}
          </h3>
          <p className="text-sm font-bold text-gray-900">${product.price}</p>
        </div>
        
        {/* Enhanced Reviews Section */}
        <div className="mt-2 border-t border-gray-100 pt-2">
          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-400 text-[10px]">
              {[...Array(5)].map((_, i) => (
                <i key={i} className={`fa-solid fa-star ${i >= Math.floor(product.rating) ? 'text-gray-200' : ''}`}></i>
              ))}
            </div>
            <span className="text-[11px] font-bold text-gray-900">{product.rating}</span>
            <span className="text-[10px] text-gray-400 font-medium">({product.reviews} reviews)</span>
          </div>
          
          <div className="mt-1 hidden group-hover:block transition-all duration-300">
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span className="text-[10px] text-gray-500 italic">"Highly recommended quality"</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
