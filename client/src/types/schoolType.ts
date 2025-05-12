export type SchoolType = {
  _id: string;
  school_name: string;
  description: string;
  address: string;
  contact_email: string;
  contact_phone: string;
  is_active: boolean;
  website_url: string;
  logo_url: string;
  school_img: File | null;
};
