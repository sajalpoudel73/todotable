import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';
import { Task } from '@/types/task';

interface TaskTableProps {
  tasks: Task[];
  onSort: (field: string) => void;
  onStatusChange: (taskId: number, status: string) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onSort, onStatusChange }) => {
  const getStatusBadge = (status: string) => {
    const statusClasses = {
      todo: 'status-todo',
      'in-progress': 'status-in-progress',
      completed: 'status-completed'
    };

    return (
      <Badge 
        className={`status-badge ${statusClasses[status as keyof typeof statusClasses]}`}
        onClick={() => {
          const newStatus = status === 'todo' ? 'in-progress' : 
                          status === 'in-progress' ? 'completed' : 'todo';
          onStatusChange(tasks[0].id, newStatus);
        }}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Table className="task-table">
      <TableHeader>
        <TableRow>
          <TableHead onClick={() => onSort('status')} className="cursor-pointer">
            Status <ArrowUpDown className="inline h-4 w-4" />
          </TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead onClick={() => onSort('created_at')} className="cursor-pointer">
            Created <ArrowUpDown className="inline h-4 w-4" />
          </TableHead>
          <TableHead onClick={() => onSort('due_date')} className="cursor-pointer">
            Due Date <ArrowUpDown className="inline h-4 w-4" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id} className="task-row">
            <TableCell>{getStatusBadge(task.status)}</TableCell>
            <TableCell className="font-medium">{task.title}</TableCell>
            <TableCell>{task.description}</TableCell>
            <TableCell>{format(new Date(task.created_at), 'MMM dd, yyyy')}</TableCell>
            <TableCell>{format(new Date(task.due_date), 'MMM dd, yyyy')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TaskTable;