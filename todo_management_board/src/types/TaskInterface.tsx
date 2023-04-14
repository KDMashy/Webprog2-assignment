export interface Task {
  id: number;
  title?: string;
  description: string;
  status: string;
  type: string;
  due_date?: string;
  updated_at: string;
  created_at: string;
}
