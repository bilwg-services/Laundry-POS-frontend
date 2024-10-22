// src/app/models/user.model.ts
export interface User {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_image: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}
