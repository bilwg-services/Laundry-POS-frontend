export interface Expense {
  expense_id: number;
  expense_name: string;
  expense_type?: string;
  description?: string;
  amount: string;
  user_id?: number | null;
  status?: string;
  organization_id: number;
  category?: string;
  expense_date?: string;
  created_at?: string;
  updated_at?: string;
}
