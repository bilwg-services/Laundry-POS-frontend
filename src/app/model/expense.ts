export interface Expense {
  expense_id?: number;         // Optional for creation, required for updates
  expense_name: string;        // Name of the expense (e.g., "Food Expense")
  expense_type?: string;        // Type of expense (e.g., "Rational")
  description?: string;         // Description (e.g., "Lunch")
  amount: string;              // Amount as a string (e.g., "450.00")
  user_id?: number | null;             // ID of the user associated with the expense
  status?: string;              // Status of the expense (e.g., "paid")
  organization_id: number;     // ID of the organization
  category?: string;            // Category of the expense (e.g., "daily")
  expense_date?: string;       // Optional date field, typically a string or Date object
  created_at?: string;         // Timestamp when the expense was created (optional)
  updated_at?: string;         // Timestamp when the expense was last updated (optional)
}
