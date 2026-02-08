// Shopizer E-commerce API Types
// Based on Swagger spec from http://192.168.56.1:8080/v2/api-docs

export interface ProductDescription {
  id: number;
  language: string;
  name: string;
  description?: string;
  friendlyUrl?: string;
  keyWords?: string;
  highlights?: string;
  metaDescription?: string;
  title?: string;
  priceAppender?: string;
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  description?: ProductDescription;
  price: number;
  finalPrice?: string;
  originalPrice?: string;
  available: boolean;
  visible: boolean;
  quantity: number;
  images?: ProductImage[];
  attributes?: ProductAttribute[];
  variants?: ProductVariant[];
  categories?: Category[];
  manufacturer?: Manufacturer;
  rating?: number;
  ratingCount?: number;
  friendlyUrl?: string;
  canBePurchased?: boolean;
  discounted?: boolean;
  productSpecifications?: ProductSpecifications;
}

export interface ProductImage {
  id: number;
  name: string;
  path: string;
  url?: string;
}

export interface ProductAttribute {
  id: number;
  name: string;
  code: string;
  type: string;
  optionValues?: AttributeValue[];
}

export interface AttributeValue {
  id: number;
  code: string;
  name: string;
  defaultValue?: boolean;
  sortOrder?: number;
}

export interface ProductVariant {
  id: number;
  sku: string;
  code?: string;
  available: boolean;
  visible: boolean;
  defaultSelection?: boolean;
  images?: ProductImage[];
  inventory?: Inventory[];
  variation?: Variation;
  variationValue?: Variation;
}

export interface Variation {
  id: number;
  code: string;
  option?: ProductOption;
  optionValue?: ProductOptionValue;
}

export interface ProductOption {
  id: number;
  code: string;
  name: string;
  type: string;
  optionValues?: ProductOptionValue[];
}

export interface ProductOptionValue {
  id: number;
  code: string;
  name: string;
  defaultValue?: boolean;
  sortOrder?: number;
  image?: string;
}

export interface Inventory {
  id: number;
  sku: string;
  quantity: number;
  available: boolean;
  price?: string;
  region?: string;
  store?: string;
}

export interface Category {
  id: number;
  code: string;
  name?: string;
  description?: string;
  friendlyUrl?: string;
  visible: boolean;
  featured?: boolean;
  children?: Category[];
  parent?: Category;
  productCount?: number;
  depth?: number;
  sortOrder?: number;
}

export interface Manufacturer {
  id: number;
  code: string;
  name?: string;
  description?: string;
  order?: number;
}

export interface ProductSpecifications {
  height?: number;
  width?: number;
  length?: number;
  weight?: number;
  manufacturer?: string;
  model?: string;
  dimensionUnitOfMeasure?: 'cm' | 'cu' | 'ft' | 'in' | 'm';
  weightUnitOfMeasure?: 'g' | 'kg' | 'l' | 'lb' | 'T';
}

export interface Cart {
  id: number;
  code: string;
  customer?: number;
  quantity: number;
  subtotal: number;
  total: number;
  displaySubTotal?: string;
  displayTotal?: string;
  products: CartItem[];
  totals?: OrderTotal[];
  promoCode?: string;
}

export interface CartItem {
  id: number;
  sku: string;
  productName?: string;
  quantity: number;
  price: number;
  finalPrice?: string;
  originalPrice?: string;
  subTotal: number;
  displaySubTotal?: string;
  image?: ProductImage;
  images?: ProductImage[];
  variant?: ProductVariant;
  attributes?: CartItemAttribute[];
  available?: boolean;
}

export interface CartItemAttribute {
  id: number;
  option?: {
    id: number;
    code: string;
    name: string;
  };
  optionValue?: {
    id: number;
    code: string;
    name: string;
    price?: string;
  };
}

export interface OrderTotal {
  code: string;
  title: string;
  text: string;
  value: number;
  order: number;
  module?: string;
  discounted?: boolean;
}

export interface Order {
  id: number;
  orderStatus: 'ORDERED' | 'PROCESSED' | 'DELIVERED' | 'REFUNDED' | 'CANCELED';
  customer?: Customer;
  billing?: Address;
  delivery?: Address;
  products: OrderProduct[];
  subtotal?: number;
  total: number;
  shipping?: number;
  tax?: number;
  totals?: OrderTotal[];
  datePurchased?: string;
  paymentModule?: string;
  shippingModule?: string;
  currency?: string;
}

export interface OrderProduct {
  id: number;
  productName: string;
  sku: string;
  orderedQuantity: number;
  price: string;
  subTotal: string;
  image?: string;
  product?: Product;
  attributes?: OrderProductAttribute[];
}

export interface OrderProductAttribute {
  id: number;
  attributeName: string;
  attributeValue: string;
  attributePrice: string;
}

export interface Customer {
  id: number;
  userName?: string;
  emailAddress: string;
  firstName?: string;
  lastName?: string;
  gender?: 'M' | 'F';
  language?: string;
  billing?: Address;
  delivery?: Address;
  storeCode?: string;
  provider?: string;
}

export interface Address {
  id?: number;
  firstName?: string;
  lastName?: string;
  company?: string;
  address: string;
  city: string;
  stateProvince?: string;
  zone?: string;
  country: string;
  countryCode?: string;
  postalCode: string;
  phone?: string;
  billingAddress?: boolean;
  latitude?: string;
  longitude?: string;
}

export interface AuthTokens {
  token: string;
  id?: number;
}

export interface SearchResult {
  id: number;
  name: string;
  description?: string;
  image?: string;
  brand?: string;
  category?: string;
  link: string;
  addToCart?: boolean;
  language?: string;
  store?: string;
}

export interface ShippingOption {
  optionId: string;
  optionCode: string;
  optionName: string;
  description?: string;
  optionPrice: number;
  optionPriceText?: string;
  optionShippingDate?: string;
  optionDeliveryDate?: string;
  estimatedNumberOfDays?: string;
  shippingModuleCode?: string;
  note?: string;
}

export interface ShippingSummary {
  shipping: number;
  shippingText: string;
  handling?: number;
  handlingText?: string;
  freeShipping?: boolean;
  taxOnShipping?: boolean;
  shippingOptions: ShippingOption[];
  selectedShippingOption?: ShippingOption;
  delivery?: Address;
}

export interface ProductListResponse {
  products: Product[];
  number: number;
  recordsFiltered: number;
  recordsTotal: number;
  totalPages: number;
}

export interface CategoryListResponse {
  categories: Category[];
  number: number;
  recordsFiltered: number;
  recordsTotal: number;
  totalPages: number;
}