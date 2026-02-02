import { FinancialsProps } from "./financials";

export type ProductAttribute = {
    key: string;
    key_label: string;
    value_label: string;
}

export type LocationProps = {
    city: string;
    zipcode: string;
    department: string;
    region: string;
    lat: number;
    lng: number;
}

export type ProductProps = {
    subject: string;
    body: string;
    url: string;
    price_euros: number;
    images_url: string[]
    attributes_cleaned: ProductAttribute[];
    location: LocationProps;
    analysis: string;
    financials: FinancialsProps []
}