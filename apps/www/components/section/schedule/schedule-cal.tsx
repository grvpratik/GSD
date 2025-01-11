"use client";
import React from "react";
import { Calendar } from "www/components/ui/calendar";
import TaskList from "./task-list";
export type Task = {
	id: string;
	text: string;
	completed: boolean;
	category: string; // New field
  date: Date; // New field
  };
const ScheduleCalendar = () => {
	const [date, setDate] = React.useState<Date | undefined>(new Date());
	const [tasks, setTasks] = React.useState<Task[]>([
		{ 
			id: '1', 
			text: 'bring garbage out', 
			completed: false,
			category: 'home',
			date: new Date()
		  },    { 
			id: '3', 
			text: 'bring garbage out', 
			completed: false,
			category: 'home',
			date: new Date()
		  },    { 
			id: '4', 
			text: 'bring garbage out', 
			completed: false,
			category: 'home',
			date: new Date()
		  },    { 
			id: '5', 
			text: 'bring garbage out', 
			completed: false,
			category: 'home',
			date: new Date()
		  },    { 
			id: '6', 
			text: 'bring garbage out', 
			completed: false,
			category: 'home',
			date: new Date()
		  },
	  ]);
	
	  const handleTasksReorder = (newTasks: Task[]) => {
		setTasks(newTasks);
	  };
	
	  const addTask = (text: string,category:string) => {
		if (!date) return;
		setTasks([...tasks, { 
		  id: Date.now().toString(), 
		  text, 
		  completed: false,
		  category,
		  date: date
		}]);
		  };
	
	  const deleteTask = (taskId: string) => {
		setTasks(tasks.filter((task:Task)=> task.id !== taskId));
	  };
	// Filter tasks for selected date
	const selectedDateTasks = tasks.filter(task => 
		date && task.date.toDateString() === date.toDateString()
	  );
	
	  // Get incomplete tasks from previous dates
	  const incompleteTasks = tasks.filter(task => 
		!task.completed && task.date < new Date() && 
		task.date.toDateString() !== date?.toDateString()
	  );
	
	return (
		<>
      <main className="grid grid-cols-3 items-center text-center gap-2">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="overflow-hidden w-full *:rounded-xl rounded-xl"
        />
        <TaskList 
          tasks={selectedDateTasks}
          onTasksReorder={handleTasksReorder}
          onAddTask={addTask}
          onDeleteTask={deleteTask}
        />
        <div className="overflow-auto">
          <h2>Overdue Tasks</h2>
          {incompleteTasks.map(task => (
            <div key={task.id} className="p-2 border rounded mb-2">
              <div>{task.text}</div>
              <div className="text-sm text-gray-500">
                {task.category} - {task.date.toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </main>
		</>
	);
};

export default ScheduleCalendar;
