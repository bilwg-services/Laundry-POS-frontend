export interface LaundryServiceModel {
    id: number;
    name: string;
    price: number;
    custom_price?: number;
    percentage: number;
    price_changed: string | null;
    price_type: string;
    icon: string;
    cgst: number;
    sgst: number;
    tax_enabled: boolean;
    hsn: string;
    group_name: string;
    sub_category: string;
    category: string;
    price_list_id: string;
    created_at: string;
    updated_at: string;
    organization_id: number;
  }