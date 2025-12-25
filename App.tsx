
import React, { useState, useMemo } from 'react';
import { Product, CartItem } from './types';
import { PRODUCTS, CATEGORIES } from './constants';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import AIStylist from './components/AIStylist';
import VeoStudio from './components/VeoStudio';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isStylistOpen, setIsStylistOpen] = useState(false);
  const [isVeoOpen, setIsVeoOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedColor: product.colors[0], selectedSize: 'M' }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)} 
        onStylistClick={() => setIsStylistOpen(true)}
        onVeoClick={() => setIsVeoOpen(true)}
      />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[85vh] w-full flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop" 
              alt="Fashion Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
            <div className="max-w-2xl">
              <span className="block text-xs font-bold uppercase tracking-[0.4em] mb-4 text-gray-300">New Era of Fashion</span>
              <h1 className="text-6xl md:text-8xl font-serif font-black leading-[0.9] mb-8">
                REDESIGN <br />
                YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">IDENTITY</span>
              </h1>
              <div className="flex space-x-4">
                <button className="bg-white text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors">
                  Shop Men
                </button>
                <button className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all">
                  Shop Women
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Cinematic Studio CTA */}
        <section className="bg-white py-12 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button 
              onClick={() => setIsVeoOpen(true)}
              className="w-full bg-gray-50 border border-dashed border-gray-300 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between group hover:bg-gray-100 transition-all"
            >
              <div className="flex items-center space-x-6 mb-6 md:mb-0">
                <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                  <i className="fa-solid fa-film text-2xl"></i>
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-black uppercase tracking-tight">VOGUE AI Cinematic Studio</h3>
                  <p className="text-sm text-gray-500">Animate your fashion inspiration using state-of-the-art Veo generation.</p>
                </div>
              </div>
              <span className="bg-black text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest">Open Studio</span>
            </button>
          </div>
        </section>

        {/* Featured Selection */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-6 md:space-y-0">
            <div>
              <h2 className="text-4xl font-serif font-black mb-4">Curated Essentials</h2>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                      selectedCategory === cat 
                        ? 'bg-black text-white' 
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <a href="#" className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">
              View All Products
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>

        {/* AI Stylist Banner */}
        <section className="bg-gray-950 py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop" 
              className="w-full h-full object-cover" 
              alt="Stylist"
            />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-xl text-white">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full mb-8">
                <i className="fa-solid fa-sparkles text-xs"></i>
                <span className="text-[10px] font-black uppercase tracking-widest">Next-Gen Styling</span>
              </div>
              <h2 className="text-5xl font-serif font-black mb-6 leading-tight">Your Personal <br /> Fashion Concierge.</h2>
              <p className="text-gray-400 mb-10 text-lg leading-relaxed">
                Experience personalized styling recommendations powered by advanced AI. 
                Whether it's an evening gala or casual weekend brunch, our virtual stylist 
                curates the perfect ensemble just for you.
              </p>
              <button 
                onClick={() => setIsStylistOpen(true)}
                className="bg-white text-black px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:scale-105 transition-transform"
              >
                Meet Your AI Stylist
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
              <div className="col-span-2">
                <a href="#" className="font-serif text-3xl font-black tracking-tighter mb-8 block">VOGUE<span className="text-gray-400">AI</span></a>
                <p className="text-gray-500 text-sm max-w-xs mb-8 leading-relaxed">
                  Redefining modern elegance through sustainable luxury and artificial intelligence. Join the fashion revolution.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-black transition-colors"><i className="fa-brands fa-instagram text-xl"></i></a>
                  <a href="#" className="text-gray-400 hover:text-black transition-colors"><i className="fa-brands fa-tiktok text-xl"></i></a>
                  <a href="#" className="text-gray-400 hover:text-black transition-colors"><i className="fa-brands fa-pinterest text-xl"></i></a>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Explore</h4>
                <ul className="space-y-4 text-sm text-gray-500">
                  <li><a href="#" className="hover:text-black">New Arrivals</a></li>
                  <li><a href="#" className="hover:text-black">Best Sellers</a></li>
                  <li><a href="#" className="hover:text-black">Collections</a></li>
                  <li><a href="#" className="hover:text-black">Gift Cards</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Service</h4>
                <ul className="space-y-4 text-sm text-gray-500">
                  <li><a href="#" className="hover:text-black">Shipping</a></li>
                  <li><a href="#" className="hover:text-black">Returns</a></li>
                  <li><a href="#" className="hover:text-black">Size Guide</a></li>
                  <li><a href="#" className="hover:text-black">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Newsletter</h4>
                <p className="text-xs text-gray-400 mb-4">Get exclusive access to pre-launches and trends.</p>
                <div className="flex border-b border-black pb-2">
                  <input type="email" placeholder="Email Address" className="bg-transparent border-none text-xs focus:ring-0 w-full outline-none" />
                  <button className="text-black font-bold text-xs uppercase">Join</button>
                </div>
              </div>
            </div>
            <div className="mt-20 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              <p>&copy; 2024 VOGUE AI. All rights reserved.</p>
              <div className="flex space-x-8 mt-4 md:mt-0">
                <a href="#" className="hover:text-black">Privacy Policy</a>
                <a href="#" className="hover:text-black">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Overlays */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />
      <AIStylist 
        isOpen={isStylistOpen} 
        onClose={() => setIsStylistOpen(false)} 
      />
      <VeoStudio 
        isOpen={isVeoOpen}
        onClose={() => setIsVeoOpen(false)}
      />
    </div>
  );
};

export default App;
