export interface OrderCustomerPayload {
  name: string;
  email: string;
  phone: string;
  dni: number;          // entero, no string
}

export interface OrderAddressPayload {
  street: string;
  city: string;
  province: string;
  postal_code: string;
}

export interface OrderItemPayload {
  variant_id: number;   // NO product_id
  quantity: number;
}

export interface OrderPayload {
  customer: OrderCustomerPayload;
  address: OrderAddressPayload;
  items: OrderItemPayload[];
}

// Lo que devuelve OrderResource tras crear el pedido (para la confirmación)
export interface OrderResponseItem {
  product: string | null;
  sku: string | null;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface OrderResponse {
  id: number;
  status: string;       // statusLabel(), ya viene legible
  subtotal: number;
  discount: number;
  total: number;
  created_at: string;   // ISO8601
  items?: OrderResponseItem[];
}