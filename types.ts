
export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Men' | 'Women' | 'Accessories';
  description: string;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  colors: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface StylingMessage {
  role: 'user' | 'model';
  text: string;
}
