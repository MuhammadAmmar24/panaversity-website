export interface Profile {
    phone?: string;
    id?: string;
    full_name?: string;
    email?: string;
    student?: {
      address?: string;
      city?: string;
      country?: string;
      postal_code?: string;
      is_active?: boolean;
    };
  }
  
  export interface AddressInfo {
    address: string;
    city: string;
    country: string;
    postalCode: string;
  }
  
  export interface Errors {
    address: string;
    city: string;
    country: string;
    postalCode: string;
  }