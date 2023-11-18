export type Order = {
    id : number;
    code_order: string;
    id_payment: number;
    id_cart_details: number;
    status_order: string;
    payment: {
        id: number,
        code_payment: string,
        date_payment: string,
        status_payment: string,
        total_payment: number,
        method_payment: string,
        id_cart: number,
        },
    cart_details: {
        id: number,
        id_cart: number,
        id_product: number,
        quantity: number,
        
    }
}