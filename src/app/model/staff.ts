import { User } from "./user"

export interface Staff {
    rel_id: number
    organization_id: number
    user_id: number
    role: string
    status: string
    created_at: string
    updated_at: string
    user: User | null
  }