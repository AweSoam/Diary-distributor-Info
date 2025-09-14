import type { ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  variant: string;
  price: number;
  icon: ReactNode;
}

export interface Customer {
  id: string;
  name: string;
  priceOverrides?: { [productId: string]: number };
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number; // Unit price at the time of order
}

export interface Bill {
  id: string;
  customer: Customer;
  items: OrderItem[];
  total: number;
  date: Date;
  paidAmount: number;
}