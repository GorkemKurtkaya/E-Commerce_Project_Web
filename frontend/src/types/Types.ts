export interface Product {
    _id: string;
    title: string;
    category: string;
    price: number;
    imageUri: string;
    quantity: number;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    addresses: Address[];  // Address türünde bir diziyi ifade eder
    purchasedProducts: Order[];  // Order türünde bir diziyi ifade eder
    role: string;
  }
  
  export interface Address {
    _id: string;
    address: string;
  }
  
  export interface OrderProduct {
    productId: string;
    quantity: number;
    amount: number;
  }
  
  export interface Order {
    _id: string;
    userId: string;
    products: OrderProduct[];  // Siparişlerde yer alan ürünlerin detayları
    amount: number;
    address: string;
    createdAt: string;
  }
  