import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TaskTable from '@/components/TaskTable';
import TaskForm from '@/components/TaskForm';
import { Task } from '@/types/task';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sortField, setSortField] = useState<string>('due_date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const { toast } = useToast();

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleStatusChange = (taskId: number, newStatus: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus as Task['status'] } : task
    ));
    toast({
      title: "Task Updated",
      description: `Task status changed to ${newStatus}`,
    });
  };

  const handleAddTask = (data: Partial<Task>) => {
    const newTask: Task = {
      id: tasks.length + 1,
      title: data.title || '',
      description: data.description || '',
      status: 'todo',
      created_at: new Date().toISOString(),
      due_date: data.due_date || new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
    toast({
      title: "Task Added",
      description: "New task has been created successfully",
    });
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const compareValue = (aVal: any, bVal: any) => {
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    };

    return compareValue(a[sortField as keyof Task], b[sortField as keyof Task]);
  });

  const activeTasks = sortedTasks.filter(task => task.status !== 'completed');
  const completedTasks = sortedTasks.filter(task => task.status === 'completed');

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskForm onSubmit={handleAddTask} />
        </CardContent>
      </Card>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active Tasks</TabsTrigger>
          <TabsTrigger value="completed">Completed Tasks</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskTable 
                tasks={activeTasks}
                onSort={handleSort}
                onStatusChange={handleStatusChange}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskTable 
                tasks={completedTasks}
                onSort={handleSort}
                onStatusChange={handleStatusChange}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;