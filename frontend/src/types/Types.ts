
export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    imageUrl: string;
    quantity:number
}

export interface User{
    id:number;
    name:string;
    email:string;
    password:string;
    phone: string;
    adresses:[];
    PurchasedProducts:[];
    role:string
}

export interface Address{
    _id:string
    address:string
}
