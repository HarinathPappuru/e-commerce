
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Minimalist Wool Overcoat',
    price: 299,
    category: 'Women',
    description: 'A timeless silhouette crafted from premium Italian wool blend. Features a relaxed fit and notched lapels.',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    colors: ['Beige', 'Black', 'Charcoal']
  },
  {
    id: '2',
    name: 'Raw Denim Jacket',
    price: 145,
    category: 'Men',
    description: 'Classic rugged appeal with modern tailoring. 14oz selvedge denim that gets better with every wear.',
    image: 'https://images.unsplash.com/photo-1576905341935-4ef2441761b3?q=80&w=800&auto=format&fit=crop',
    rating: 4.6,
    reviews: 89,
    inStock: true,
    colors: ['Indigo', 'Faded Blue']
  },
  {
    id: '3',
    name: 'Silk Evening Gown',
    price: 450,
    category: 'Women',
    description: 'Elegant floor-length gown made from 100% mulberry silk. Perfectly drapes for a red-carpet ready look.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviews: 56,
    inStock: true,
    colors: ['Emerald', 'Ruby', 'Midnight']
  },
  {
    id: '4',
    name: 'Leather Chelsea Boots',
    price: 210,
    category: 'Accessories',
    description: 'Handcrafted full-grain leather boots with elastic side panels and durable rubber soles.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    reviews: 210,
    inStock: true,
    colors: ['Tan', 'Black']
  },
  {
    id: '5',
    name: 'Linen Summer Shirt',
    price: 85,
    category: 'Men',
    description: 'Breathable European linen shirt, garment-dyed for a soft feel. Essential for warm weather.',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop',
    rating: 4.5,
    reviews: 142,
    inStock: true,
    colors: ['White', 'Navy', 'Olive']
  },
  {
    id: '6',
    name: 'Cashmere Ribbed Scarf',
    price: 120,
    category: 'Accessories',
    description: 'Ultra-soft pure cashmere scarf with a modern ribbed texture. Keeps you warm with zero itch.',
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviews: 43,
    inStock: true,
    colors: ['Gray', 'Cream', 'Camel']
  }
];

export const CATEGORIES = ['All', 'Men', 'Women', 'Accessories'];
