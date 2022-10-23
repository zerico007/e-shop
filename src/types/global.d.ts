interface Product {
  id: string;
  name: string;
  price: number;
  productImage: string;
  videoURL: string;
  available: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
  id: string;
}

interface Cart {
  Total: string;
  items: CartItem[];
  user: string;
}
