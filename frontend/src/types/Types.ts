
export interface Product {
    id: number;
    name: string;
    category: string;
    price: string;
    imageUrl: string;
}

export interface User{
    id:number;
    name:string;
    email:string;
    password:string;
    phone: string;
    adresses:[];
    PurchasedProducts:[];
}
