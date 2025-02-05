import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Task } from '@/types/task';

interface TaskFormProps {
  onSubmit: (data: Partial<Task>) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, setValue, watch } = useForm<Partial<Task>>();
  const dueDate = watch('due_date');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          placeholder="Task title"
          {...register('title', { required: true })}
          className="w-full"
        />
      </div>
      <div>
        <Textarea
          placeholder="Task description"
          {...register('description')}
          className="w-full"
        />
      </div>
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dueDate ? format(new Date(dueDate), 'PPP') : <span>Pick a due date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dueDate ? new Date(dueDate) : undefined}
              onSelect={(date) => setValue('due_date', date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button type="submit" className="w-full">Add Task</Button>
    </form>
  );
};

export default TaskForm;