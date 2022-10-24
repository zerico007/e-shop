interface Product {
  id: string;
  name: string;
  price: number;
  productImage: string;
  videoURL: string;
  available: boolean;
}

interface CartProduct extends Omit<Product, "id"> {
  _id: string;
}

interface CartItem {
  product: CartProduct;
  quantity: number;
  id: string;
}

interface Cart {
  Total: string;
  items: CartItem[];
  user: string;
  message?: string;
}

declare module "vue-select";
declare module "@meforma/vue-toaster";
