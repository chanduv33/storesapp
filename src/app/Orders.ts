export interface Orders {
    id: number;
    status: string;
    paymentType: string;
    productId: number;
    quantity: number;
    amount: number;
    isCartItem: boolean;
}
