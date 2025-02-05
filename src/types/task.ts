export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  created_at: string;
  due_date: string;
}