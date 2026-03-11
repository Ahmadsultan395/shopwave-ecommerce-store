// /lib/validations.ts
import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
})

export const signupSchema = z
  .object({
    full_name: z
      .string()
      .min(2, 'Full name must be at least 2 characters')
      .max(50, 'Full name must be less than 50 characters')
      .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export const productSchema = z.object({
  name: z
    .string()
    .min(2, 'Product name must be at least 2 characters')
    .max(100, 'Product name must be less than 100 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  price: z
    .number({ invalid_type_error: 'Price must be a number' })
    .positive('Price must be greater than 0')
    .max(99999, 'Price cannot exceed $99,999'),
  image: z
    .string()
    .url('Please enter a valid image URL')
    .min(1, 'Image URL is required'),
  category_id: z.string().min(1, 'Please select a category'),
  stock: z
    .number({ invalid_type_error: 'Stock must be a number' })
    .int('Stock must be a whole number')
    .min(0, 'Stock cannot be negative')
    .max(99999, 'Stock cannot exceed 99,999'),
})

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, 'Category name must be at least 2 characters')
    .max(50, 'Category name must be less than 50 characters')
    .regex(/^[a-zA-Z0-9\s&-]+$/, 'Category name contains invalid characters'),
})

export const checkoutSchema = z.object({
  full_name: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100),
  email: z.string().email('Please enter a valid email address'),
  address: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(200),
  city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(100),
  postal_code: z
    .string()
    .min(4, 'Please enter a valid postal code')
    .max(10),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15)
    .regex(/^[+\d\s()-]+$/, 'Please enter a valid phone number'),
})

export type LoginSchema = z.infer<typeof loginSchema>
export type SignupSchema = z.infer<typeof signupSchema>
export type ProductSchema = z.infer<typeof productSchema>
export type CategorySchema = z.infer<typeof categorySchema>
export type CheckoutSchema = z.infer<typeof checkoutSchema>
