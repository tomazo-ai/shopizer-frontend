import axios, { AxiosInstance, AxiosError } from 'axios';
import {
  Product,
  ProductListResponse,
  Category,
  CategoryListResponse,
  Cart,
  CartItem,
  Order,
  Customer,
  Address,
  ShippingSummary,
  SearchResult,
  AuthTokens,
} from '@/types/shopizer';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.56.1:8080';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout (for slower networks)
});

// Request interceptor to add auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('shopizer_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('shopizer_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ====================
// Product APIs
// ====================

export const getProducts = async (params?: {
  page?: number;
  count?: number;
  category?: number;
  available?: boolean;
  name?: string;
}): Promise<ProductListResponse> => {
  const response = await apiClient.get('/api/v1/products', { params });
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await apiClient.get(`/api/v1/product/${id}`);
  return response.data;
};

export const getProductByFriendlyUrl = async (friendlyUrl: string): Promise<Product> => {
  const response = await apiClient.get(`/api/v2/product/friendly/${friendlyUrl}`);
  return response.data;
};

export const getProductBySku = async (sku: string): Promise<Product> => {
  const response = await apiClient.get(`/api/v2/product/${sku}`);
  return response.data;
};

export const getProductsByCategory = async (
  categoryFriendlyUrl: string,
  params?: { page?: number; count?: number }
): Promise<ProductListResponse> => {
  const response = await apiClient.get(`/api/v2/products/category/${categoryFriendlyUrl}`, {
    params,
  });
  return response.data;
};

// ====================
// Category APIs
// ====================

export const getCategories = async (params?: {
  page?: number;
  count?: number;
  visible?: boolean;
}): Promise<CategoryListResponse> => {
  const response = await apiClient.get('/api/v1/category', { params });
  return response.data;
};

export const getCategoryByFriendlyUrl = async (friendlyUrl: string): Promise<Category> => {
  const response = await apiClient.get(`/api/v1/category/${friendlyUrl}`);
  return response.data;
};

// ====================
// Search APIs
// ====================

export const searchProducts = async (query: string, params?: { count?: number; start?: number }): Promise<SearchResult[]> => {
  const response = await apiClient.post('/api/v1/search', {
    query,
    count: params?.count || 20,
    start: params?.start || 0,
  });
  return response.data;
};

export const searchAutocomplete = async (query: string): Promise<string[]> => {
  const response = await apiClient.post('/api/v1/search/autocomplete', {
    query,
    count: 10,
    start: 0,
  });
  return response.data.values || [];
};

// ====================
// Cart APIs
// ====================

// Create cart with first item - POST /api/v1/cart
export const createCart = async (item: {
  product: string;
  quantity: number;
  attributes?: Array<{ code: string; value: string }>;
}): Promise<Cart> => {
  const response = await apiClient.post('/api/v1/cart', item);
  return response.data;
};

// Get cart by code - GET /api/v1/cart/{code}
export const getCart = async (cartCode: string): Promise<Cart> => {
  const response = await apiClient.get(`/api/v1/cart/${cartCode}`);
  return response.data;
};

// Add to existing cart - PUT /api/v1/cart/{code}
export const addToCart = async (
  cartCode: string,
  item: {
    product: string;
    quantity: number;
    attributes?: Array<{ code: string; value: string }>;
  }
): Promise<Cart> => {
  const response = await apiClient.put(`/api/v1/cart/${cartCode}`, item);
  return response.data;
};

// Update cart item - PUT /api/v1/cart/{code}
// Note: The API expects the PRODUCT SKU, not the cart item id
export const updateCartItem = async (
  cartCode: string,
  productSku: string,
  quantity: number
): Promise<Cart> => {
  const response = await apiClient.put(`/api/v1/cart/${cartCode}`, {
    product: productSku,
    quantity,
  });
  return response.data;
};

// Remove cart item - DELETE /api/v1/cart/{code}/product/{itemId}
export const removeCartItem = async (cartCode: string, itemId: number): Promise<Cart> => {
  const response = await apiClient.delete(`/api/v1/cart/${cartCode}/product/${itemId}`);
  return response.data;
};

// ====================
// Checkout APIs
// ====================

export const getShippingQuotes = async (cartCode: string, address: Address): Promise<ShippingSummary> => {
  const response = await apiClient.get('/api/v1/checkout/shippingQuotes', {
    params: {
      cart: cartCode,
      ...address,
    },
  });
  return response.data;
};

export const checkout = async (checkoutData: {
  cart?: string;
  customer?: Partial<Customer>;
  shipping?: Address;
  billing?: Address;
  payment?: {
    paymentModule: string;
    amount: string;
    paymentToken?: string;
  };
  shippingQuote?: number;
  customerAgreement?: boolean;
}): Promise<Order> => {
  const response = await apiClient.post('/api/v1/checkout', checkoutData);
  return response.data;
};

// ====================
// Auth APIs
// ====================

export const login = async (username: string, password: string): Promise<AuthTokens> => {
  const response = await apiClient.post('/api/v1/auth/token', {
    username,
    password,
  });
  const { token } = response.data;
  if (token) {
    localStorage.setItem('shopizer_token', token);
  }
  return response.data;
};

export const register = async (customer: Partial<Customer> & { password: string; repeatPassword: string }): Promise<Customer> => {
  const response = await apiClient.post('/api/v1/customer/register', customer);
  return response.data;
};

export const getCurrentUser = async (): Promise<Customer> => {
  const response = await apiClient.get('/api/v1/customer/profile');
  return response.data;
};

export const logout = (): void => {
  localStorage.removeItem('shopizer_token');
};

// ====================
// Order APIs
// ====================

export const getOrders = async (params?: { page?: number; count?: number }): Promise<Order[]> => {
  const response = await apiClient.get('/api/v1/private/orders', { params });
  return response.data.orders || [];
};

export const getOrder = async (orderId: number): Promise<Order> => {
  const response = await apiClient.get(`/api/v1/private/orders/${orderId}`);
  return response.data;
};

export default apiClient;