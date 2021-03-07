export interface CreateOrderDTO {
    user_id: number;
    product_id: number;
    status_id: number;
    purchased_price: number;
    redundant: boolean;
}

export interface CreateProductDTO {
    name: string;
    price: number;
    currency: string;
    url: string;
    contact: string;
}

export interface CreateOrderStatusDTO {
    status: string;
}

export interface SetOrderStatusDTO {
    id: number;
    newStatus: string;
}