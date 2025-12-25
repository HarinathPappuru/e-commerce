
import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-serif font-black">Shopping Bag</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                <i className="fa-solid fa-bag-shopping text-6xl opacity-20"></i>
                <p className="text-lg font-medium">Your bag is empty</p>
                <button 
                  onClick={onClose}
                  className="bg-black text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex space-x-4 group">
                  <div className="w-24 h-32 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-sm font-bold text-gray-900">{item.name}</h4>
                        <p className="text-sm font-bold">${item.price}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 capitalize">{item.category}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border rounded-full px-3 py-1 space-x-4">
                        <button onClick={() => onUpdateQuantity(item.id, -1)} disabled={item.quantity <= 1} className="text-gray-400 hover:text-black transition-colors disabled:opacity-30">
                          <i className="fa-solid fa-minus text-[10px]"></i>
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="text-gray-400 hover:text-black transition-colors">
                          <i className="fa-solid fa-plus text-[10px]"></i>
                        </button>
                      </div>
                      <button onClick={() => onRemove(item.id)} className="text-xs text-red-500 font-semibold hover:underline">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t bg-gray-50">
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span>Calculated at next step</span>
                </div>
                <div className="flex justify-between text-lg font-black pt-2 border-t mt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors shadow-xl shadow-black/10">
                Secure Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
