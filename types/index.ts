// /types/index.ts

export type UserRole = 'user' | 'admin' | 'editor'

export interface Profile {
  id: string
  email: string
  role: UserRole
  full_name?: string
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  created_at: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category_id: string
  category?: Category
  stock: number
  created_at: string
}

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled'

export interface Order {
  id: string
  user_id: string
  status: OrderStatus
  total_price: number
  created_at: string
  profiles?: Pick<Profile, 'email' | 'full_name'>
  order_items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  products?: Pick<Product, 'name' | 'image'>
}

// Cart types (client-side only)
export interface CartItem {
  product: Product
  quantity: number
}

export interface CartState {
  items: CartItem[]
  total: number
  count: number
}

// Form types
export interface LoginFormData {
  email: string
  password: string
}

export interface SignupFormData {
  email: string
  password: string
  confirmPassword: string
  full_name: string
}

export interface ProductFormData {
  name: string
  description: string
  price: number
  image: string
  category_id: string
  stock: number
}

export interface CategoryFormData {
  name: string
}

export interface CheckoutFormData {
  full_name: string
  email: string
  address: string
  city: string
  postal_code: string
  phone: string
}
