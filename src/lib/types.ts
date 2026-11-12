export interface OrderCustomer {
  fullName: string;
  email?: string;
  phone: string;
  address?: string;
  city: string;
  province: string;
  postalCode?: string;
  deliveryNotes?: string;
  paymentMethod?: string;
}

export interface OrderItem {
  id?: string;
  product: { name: string; price: number };
  size: number;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  customer: OrderCustomer;
  status: string;
  paymentStatus?: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
}
