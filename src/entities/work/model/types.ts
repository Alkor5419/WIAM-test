export interface WorkData {
    workplace: string;
    address: string;
}

export interface ProductCategory {
    id: string;
    category: { name: string; slug: string; url: string };
}
