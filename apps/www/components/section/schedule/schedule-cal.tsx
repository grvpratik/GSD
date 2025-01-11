"use client";
import React from "react";
import { Calendar } from "www/components/ui/calendar";
import TaskList from "./task-list";
export type Task = {
	id: string;
	text: string;
	completed: boolean;
  };
const ScheduleCalendar = () => {
	const [date, setDate] = React.useState<Date | undefined>(new Date());
	const [tasks, setTasks] = React.useState<Task[]>([
		{ id: '1', text: 'bring garbage out', completed: false },
		{ id: '2', text: 'groceries', completed: false },
		{ id: '3', text: 'plant salad', completed: false },
		{ id: '4', text: 'mow lawn', completed: false },
		{ id: '5', text: 'tax return', completed: false },
		{ id: '6', text: 'plant tomatoes', completed: false },
	  ]);
	
	  const handleTasksReorder = (newTasks: Task[]) => {
		setTasks(newTasks);
	  };
	
	  const addTask = (text: string) => {
		setTasks([...tasks, { id: Date.now().toString(), text, completed: false }]);
	  };
	
	  const deleteTask = (taskId: string) => {
		setTasks(tasks.filter((task:Task)=> task.id !== taskId));
	  };
	
	return (
		<>
			<main className=" grid grid-cols-3  items-center text-center gap-2">
				<Calendar
					mode="single"
					selected={date}
					onSelect={setDate}
					className=" overflow-hidden w-full *:rounded-xl  rounded-xl"
				/>
              <TaskList 
                tasks={tasks} 
                onTasksReorder={handleTasksReorder}
                onAddTask={addTask}
                onDeleteTask={deleteTask}
              />
				<div>incomplete</div>
			</main>
		</>
	);
};

export default ScheduleCalendar;
